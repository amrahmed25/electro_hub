import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Loader2,
  AlertTriangle,
  Copy,
  Download,
  RotateCcw,
  Cpu,
  CircuitBoard,
  Radio,
  Battery,
  Cable,
  Zap,
  Gauge,
  Wrench,
  Boxes,
  Check,
  Clock,
  DollarSign,
  Wand2,
} from "lucide-react";
import { generateProjectFromIdea } from "./geminiService";

// ---------------------------------------------------------------------------
// Category -> icon mapping. Falls back to a generic chip icon.
// ---------------------------------------------------------------------------
function iconForCategory(category = "") {
  const c = category.toLowerCase();
  if (c.includes("micro") || c.includes("board") || c.includes("controller")) return Cpu;
  if (c.includes("sensor")) return Gauge;
  if (c.includes("power") || c.includes("battery")) return Battery;
  if (c.includes("wire") || c.includes("cable") || c.includes("jumper")) return Cable;
  if (c.includes("radio") || c.includes("wireless") || c.includes("comm")) return Radio;
  if (c.includes("tool")) return Wrench;
  if (c.includes("actuator") || c.includes("motor") || c.includes("relay")) return Zap;
  if (c.includes("board") || c.includes("breadboard") || c.includes("pcb")) return CircuitBoard;
  return Boxes;
}

const DIFFICULTY_STYLES = {
  beginner: "text-emerald-300 bg-emerald-400/10 border-emerald-400/30",
  intermediate: "text-amber-300 bg-amber-400/10 border-amber-400/30",
  advanced: "text-rose-300 bg-rose-400/10 border-rose-400/30",
};

function difficultyStyle(difficulty = "") {
  const key = difficulty.toLowerCase();
  return DIFFICULTY_STYLES[key] || "text-cyan-300 bg-cyan-400/10 border-cyan-400/30";
}

// ---------------------------------------------------------------------------
// Skeleton card shown while the AI is "thinking"
// ---------------------------------------------------------------------------
function SkeletonCard({ delay = 0 }) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
      style={{ animation: `pulseGlow 1.8s ease-in-out ${delay}s infinite` }}
    >
      <div className="mb-4 h-10 w-10 rounded-xl bg-white/10" />
      <div className="mb-2 h-3.5 w-3/4 rounded bg-white/10" />
      <div className="mb-4 h-2.5 w-1/3 rounded bg-white/10" />
      <div className="h-2 w-full rounded bg-white/5" />
      <div className="mt-2 h-2 w-5/6 rounded bg-white/5" />
    </div>
  );
}

export default function AIProjectGenerator() {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [project, setProject] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  // Load display + body fonts once.
  useEffect(() => {
    const id = "elhub-font-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  async function generate(promptIdea) {
    const trimmed = (promptIdea ?? idea).trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const parsed = await generateProjectFromIdea(trimmed);
      setProject(parsed);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong while generating your project.");
      setStatus("error");
    }
  }

  function handleCopy() {
    if (!project) return;
    const text = project.components
      .map((c) => `${c.quantity}x ${c.name} (${c.category}) — ${c.description}`)
      .join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function handleDownload() {
    if (!project) return;
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(project.projectName || "electrohub-project").replace(/\s+/g, "-").toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function reset() {
    setStatus("idle");
    setProject(null);
    setErrorMsg("");
    setIdea("");
    inputRef.current?.focus();
  }

  const examples = ["Smart Plant Watering System", "Home Automation Hub", "Digital Clock", "Obstacle-Avoiding Robot"];

  return (
    <div className="min-h-screen w-full bg-[#04060c] text-slate-200" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes pulseGlow { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
        @keyframes floatUp { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes drift { 0% { transform: translate(0,0) } 50% { transform: translate(-16px,12px) } 100% { transform: translate(0,0) } }
        @keyframes spinSlow { to { transform: rotate(360deg) } }
        .fade-up { animation: floatUp .55s cubic-bezier(.16,1,.3,1) both; }
        .card-hover { transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, border-color .35s ease; }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(56,189,248,0.4); box-shadow: 0 20px 40px -20px rgba(14,165,233,0.35); }
        .grad-text { background: linear-gradient(90deg,#7dd3fc,#38bdf8,#818cf8); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .orb { position:absolute; border-radius:9999px; filter: blur(90px); opacity:.35; animation: drift 12s ease-in-out infinite; }
      `}</style>

      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="orb h-[420px] w-[420px] bg-blue-600/40 -top-32 -left-24" />
        <div className="orb h-[380px] w-[380px] bg-cyan-500/30 top-1/3 right-0" style={{ animationDelay: "3s" }} />
        <div className="orb h-[300px] w-[300px] bg-indigo-600/25 bottom-0 left-1/3" style={{ animationDelay: "6s" }} />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10">
        {/* Header */}
        <header className="fade-up mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-300">
            <Wand2 className="h-3.5 w-3.5" />
            ELECTROHUB · AI PROJECT GENERATOR
          </div>
          <h1
            className="grad-text mb-4 text-4xl font-extrabold tracking-tight sm:text-6xl"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            AI Project Generator
          </h1>
          <p className="mx-auto max-w-xl text-base text-slate-400 sm:text-lg">
            Describe your electronics project idea and let AI generate all required components.
          </p>
        </header>

        {/* Search area */}
        <div className="fade-up mx-auto mb-6 max-w-3xl" style={{ animationDelay: "80ms" }}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:flex sm:items-center sm:gap-2">
            <input
              ref={inputRef}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && status !== "loading" && generate()}
              placeholder="Describe your project idea... e.g. Smart Plant Watering System"
              className="w-full flex-1 bg-transparent px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none sm:text-base"
            />
            <button
              onClick={() => generate()}
              disabled={status === "loading"}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60 sm:mt-0 sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate Project
                </>
              )}
            </button>
          </div>

          {/* example chips */}
          {status === "idle" && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => {
                    setIdea(ex);
                    generate(ex);
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty state */}
        {status === "idle" && (
          <div className="fade-up mt-16 flex flex-col items-center text-center" style={{ animationDelay: "160ms" }}>
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <CircuitBoard className="h-7 w-7 text-cyan-400" />
            </div>
            <h3 className="mb-1.5 text-lg font-semibold text-slate-200" style={{ fontFamily: "Sora, sans-serif" }}>
              Your components list will appear here
            </h3>
            <p className="max-w-sm text-sm text-slate-500">
              Type an idea above, or tap one of the examples to see the generator in action.
            </p>
          </div>
        )}

        {/* Loading skeletons */}
        {status === "loading" && (
          <div className="fade-up">
            <div className="mb-8 flex flex-col items-center justify-center gap-3 py-4 text-center">
              <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
              <p className="text-sm text-slate-400">AI is generating your electronics project...</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} delay={i * 0.12} />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="fade-up mx-auto mt-6 max-w-xl rounded-2xl border border-rose-400/30 bg-rose-500/[0.06] p-6 text-center backdrop-blur-xl">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-400/10">
              <AlertTriangle className="h-6 w-6 text-rose-300" />
            </div>
            <h3 className="mb-1 text-base font-semibold text-rose-200" style={{ fontFamily: "Sora, sans-serif" }}>
              Generation failed
            </h3>
            <p className="mb-5 text-sm text-slate-400">{errorMsg}</p>
            <button
              onClick={() => generate()}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-5 py-2.5 text-sm font-medium text-rose-200 transition hover:bg-rose-400/20"
            >
              <RotateCcw className="h-4 w-4" /> Try again
            </button>
          </div>
        )}

        {/* Success */}
        {status === "success" && project && (
          <div className="fade-up">
            {/* Project summary card */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/30 backdrop-blur-xl sm:p-8">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <h2
                  className="text-2xl font-bold text-slate-100 sm:text-3xl"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {project.projectName}
                </h2>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${difficultyStyle(project.difficulty)}`}
                >
                  {project.difficulty}
                </span>
              </div>
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                  <DollarSign className="h-4 w-4 text-emerald-300" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">Estimated Cost</div>
                    <div className="text-sm font-semibold text-slate-200">{project.estimatedCost}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                  <Clock className="h-4 w-4 text-cyan-300" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">Estimated Time</div>
                    <div className="text-sm font-semibold text-slate-200">{project.estimatedTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                  <Boxes className="h-4 w-4 text-indigo-300" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">Components</div>
                    <div className="text-sm font-semibold text-slate-200">{project.components.length}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Components grid */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.components.map((c, i) => {
                const Icon = iconForCategory(c.category);
                return (
                  <div
                    key={i}
                    className="card-hover fade-up rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                        ×{c.quantity}
                      </span>
                    </div>
                    <h4 className="mb-1 text-sm font-semibold text-slate-100 sm:text-base">{c.name}</h4>
                    <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wide text-cyan-400/80">
                      {c.category}
                    </p>
                    <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">{c.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy Components"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <Download className="h-4 w-4" /> Download JSON
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
              >
                <RotateCcw className="h-4 w-4" /> Generate Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
