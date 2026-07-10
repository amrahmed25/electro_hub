/**
 * auth.js
 * Endpoints: POST /auth/signup , POST /auth/login
 * (مفيش Refresh Token في الـ Backend الحالي، فمتضافش دالة refresh - هتتضاف لو اتعملت في الـ backend مستقبلًا)
 */

import api from "./axios";
import { saveToken } from "../utils/token";

/**
 * تسجيل مستخدم جديد
 * @param {{ name: string, email: string, password: string }} payload
 * @returns {Promise<{ token: string, user: { id: string, name: string, email: string, role: string } }>}
 */
export async function signup(payload) {
  const { data } = await api.post("/auth/signup", payload);
  const result = data.data; // { token, user }
  if (result?.token) saveToken(result.token);
  return result;
}

/**
 * تسجيل الدخول
 * @param {{ email: string, password: string }} payload
 * @returns {Promise<{ token: string, user: { id: string, name: string, email: string, role: string } }>}
 */
export async function login(payload) {
  const { data } = await api.post("/auth/login", payload);
  const result = data.data; // { token, user }
  if (result?.token) saveToken(result.token);
  return result;
}
