/**
 * token.js
 * إدارة تخزين واسترجاع الـ JWT Token في المتصفح.
 * الـ Backend (ElectroHub API) يرجّع التوكن في:
 *   POST /auth/signup -> { data: { token, user } }
 *   POST /auth/login  -> { data: { token, user } }
 * ويُستخدم بعد ذلك كـ: Authorization: Bearer <token>
 */

const TOKEN_KEY = "electrohub_token";

/**
 * حفظ التوكن في localStorage
 * @param {string} token
 */
export function saveToken(token) {
  if (!token) return;
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * قراءة التوكن الحالي (أو null لو مش موجود)
 * @returns {string | null}
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * حذف التوكن (تسجيل خروج)
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * هل يوجد مستخدم مسجل دخول حاليًا؟
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken();
}
