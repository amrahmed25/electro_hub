/**
 * apiError.js
 * تحويل أي خطأ راجع من Axios/الـ Backend إلى شكل موحّد وسهل الاستخدام في الـ UI.
 *
 * شكل الأخطاء في ElectroHub API (NestJS القياسي):
 *   { "message": "Component with id xxx not found", "error": "Not Found", "statusCode": 404 }
 * أو في حالة أخطاء الـ validation (class-validator) ممكن "message" تكون Array:
 *   { "message": ["email must be an email", "password must be longer than..."], "error": "Bad Request", "statusCode": 400 }
 */

/** رسائل افتراضية حسب كود الحالة، تُستخدم لو الـ Backend مبعتش message واضحة */
const DEFAULT_MESSAGES = {
  400: "الطلب غير صحيح، من فضلك تأكد من البيانات المُدخلة",
  401: "يجب تسجيل الدخول أولًا",
  403: "ليس لديك صلاحية للقيام بهذا الإجراء",
  404: "العنصر المطلوب غير موجود",
  409: "يوجد تعارض في البيانات (مثلاً بيانات مكررة)",
  429: "عدد كبير من المحاولات، برجاء المحاولة لاحقًا",
  500: "حدث خطأ في الخادم، برجاء المحاولة لاحقًا",
};

/**
 * @typedef {Object} ApiError
 * @property {number|null} statusCode
 * @property {string} message        - رسالة واحدة جاهزة للعرض للمستخدم
 * @property {string[]} messages     - كل الرسائل (مفيدة في حالة validation errors)
 * @property {string|null} error     - اسم الخطأ الراجع من NestJS (مثال: "Not Found")
 * @property {boolean} isNetworkError - true لو الطلب لم يصل للسيرفر أصلًا
 */

/**
 * تحويل خطأ Axios إلى ApiError موحّد
 * @param {import('axios').AxiosError} err
 * @returns {ApiError}
 */
export function parseApiError(err) {
  // مفيش استجابة من السيرفر أصلًا (مشكلة نت / السيرفر واقع / CORS)
  if (!err?.response) {
    return {
      statusCode: null,
      message: "تعذر الاتصال بالخادم، تأكد من اتصالك بالإنترنت",
      messages: ["تعذر الاتصال بالخادم، تأكد من اتصالك بالإنترنت"],
      error: null,
      isNetworkError: true,
    };
  }

  const { status, data } = err.response;
  const rawMessage = data?.message;

  let messages;
  if (Array.isArray(rawMessage)) {
    messages = rawMessage;
  } else if (typeof rawMessage === "string" && rawMessage.trim()) {
    messages = [rawMessage];
  } else {
    messages = [DEFAULT_MESSAGES[status] || "حدث خطأ غير متوقع"];
  }

  return {
    statusCode: status,
    message: messages[0],
    messages,
    error: data?.error || null,
    isNetworkError: false,
  };
}

export default parseApiError;
