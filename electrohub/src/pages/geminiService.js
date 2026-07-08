// geminiService.js
// -----------------------------------------------------------------------------
// Thin wrapper around the Google Gemini REST API (generateContent) used by the
// AI Project Generator page. Keeps all Gemini-specific request/response
// handling in one place so the component stays UI-focused.
// -----------------------------------------------------------------------------

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Builds the prompt sent to Gemini for a given project idea.
 * Mirrors the original OpenAI system prompt/shape so downstream parsing
 * and rendering logic in the component doesn't need to change.
 */
function buildPrompt(trimmedIdea) {
  return `You are an expert electronics engineer. Given a project idea, generate the required electronic components.
Return ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:
{
  "projectName": "",
  "description": "",
  "difficulty": "Beginner | Intermediate | Advanced",
  "estimatedCost": "",
  "estimatedTime": "",
  "components": [
    { "name": "", "quantity": 1, "category": "", "description": "" }
  ]
}
Project idea: "${trimmedIdea}"`;
}

/**
 * Calls Gemini's generateContent endpoint with the given idea and returns
 * the parsed project object (projectName, description, difficulty,
 * estimatedCost, estimatedTime, components[]).
 *
 * Throws an Error with a user-friendly message on any failure (network,
 * HTTP error, missing API key, malformed/blocked response, bad JSON).
 */
export async function generateProjectFromIdea(trimmedIdea) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY. Add it to your .env file.");
  }

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: buildPrompt(trimmedIdea) }],
      },
    ],
    generationConfig: {
      // Ask Gemini to return raw JSON directly, equivalent to OpenAI's
      // response_format: { type: "json_object" }.
      responseMimeType: "application/json",
      temperature: 0.7,
    },
  };

  let response;
  try {
    response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (networkErr) {
    throw new Error("Network error while contacting Gemini. Please check your connection.");
  }

  if (!response.ok) {
    let detail = "";
    try {
      const errBody = await response.json();
      detail = errBody?.error?.message ? `: ${errBody.error.message}` : "";
    } catch {
      // ignore body parse failure, fall back to status only
    }
    throw new Error(`Gemini request failed (${response.status})${detail}`);
  }

  const data = await response.json();

  // Handle prompt/safety blocks or empty candidates gracefully.
  const candidate = data?.candidates?.[0];
  if (!candidate) {
    const blockReason = data?.promptFeedback?.blockReason;
    throw new Error(
      blockReason ? `Gemini blocked the request (${blockReason}).` : "Empty response from Gemini."
    );
  }

  const text = candidate?.content?.parts?.map((p) => p.text).join("") ?? "";
  if (!text) {
    throw new Error("Empty response from Gemini.");
  }

  const cleaned = text.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Gemini returned malformed JSON.");
  }

  if (!parsed.components || !Array.isArray(parsed.components)) {
    throw new Error("Malformed response shape");
  }

  return parsed;
}
