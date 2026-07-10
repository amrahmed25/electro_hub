/**
 * axios.js
 * Axios instance موحّد لكل الـ ElectroHub API.
 *
 * ملاحظة مهمة عن الـ Base URL:
 * الـ Backend الحالي (NestJS) مش عامل Global Prefix (زي /api)،
 * الـ Routes موجودة مباشرة على الـ root: /auth, /components, /projects, /cart, /orders, /wishlist, /users
 * (شوف main.ts - مفيش app.setGlobalPrefix)
 * يعني الـ Swagger بس هو اللي على /api/docs، أما الـ API نفسه فمافيهوش /api.
 *
 * علشان كده الـ .env المفروض يبقى مثلاً:
 *   VITE_API_URL=http://localhost:3000
 * مش:
 *   VITE_API_URL=http://localhost:3000/api
 * (غيّرها براحتك على حسب رابط الـ Backend بتاعك من غير ما تلمس أي كود تاني)
 */

import axios from "axios";
import { getToken, removeToken } from "../utils/token";
import { parseApiError } from "../utils/apiError";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL && import.meta.env.DEV) {
  // تحذير في الـ console فقط أثناء التطوير، مش هيوقف التطبيق
  // eslint-disable-next-line no-console
  console.warn(
    "[axios] VITE_API_URL غير معرّف في ملف .env — الطلبات هتفشل. مثال: VITE_API_URL=http://localhost:3000"
  );
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== Request Interceptor: إرفاق الـ JWT Token تلقائيًا =====
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===== Response Interceptor: توحيد شكل الأخطاء + التعامل مع 401/403/404/500 =====
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = parseApiError(error);

    if (apiError.statusCode === 401) {
      // التوكن غير صالح/منتهي -> نظّف التوكن المحفوظ.
      // التوجيه لصفحة اللوجن نفسها متروك لكود الـ UI (عبر الحدث ده أو try/catch عادي)
      removeToken();
      window.dispatchEvent(new CustomEvent("electrohub:unauthorized"));
    }

    if (apiError.statusCode === 403) {
      window.dispatchEvent(new CustomEvent("electrohub:forbidden"));
    }

    if (apiError.statusCode === 404) {
      // اتسيبت مقصودة: كل service بيعرف إزاي يتعامل مع الـ 404 بتاعه (مثلاً "المنتج مش موجود")
    }

    if (apiError.statusCode === 500 || apiError.isNetworkError) {
      window.dispatchEvent(new CustomEvent("electrohub:server-error"));
    }

    // بنرجّع الخطأ الموحّد جنب الخطأ الأصلي، عشان أي service/component
    // يقدر يستخدم error.apiError.message مباشرة في الـ UI
    error.apiError = apiError;
    return Promise.reject(error);
  }
);

export default api;
