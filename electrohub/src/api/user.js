/**
 * user.js
 * كل الـ endpoints دي محتاجة تسجيل دخول (JWT).
 *
 * Endpoints:
 *  GET /users/me            -> getMyProfile
 *  GET /users/me/dashboard  -> getMyDashboard (profile + آخر 5 أوردرات + wishlist + stats في طلب واحد)
 *  GET /users               -> getAllUsers (Admin only)
 */

import api from "./axios";

/**
 * جلب بروفايل المستخدم الحالي
 */
export async function getMyProfile() {
  const { data } = await api.get("/users/me");
  return data.data;
}

/**
 * جلب بيانات الداشبورد كاملة (profile + recentOrders + wishlist + stats)
 * في طلب واحد بس - نفس اللي UserDashboard بتاعك محتاجه.
 * @returns {Promise<{ profile: object, recentOrders: Array, wishlist: Array, stats: { totalOrders: number, wishlistCount: number } }>}
 */
export async function getMyDashboard() {
  const { data } = await api.get("/users/me/dashboard");
  return data.data;
}

/**
 * جلب كل المستخدمين (Admin only)
 */
export async function getAllUsers() {
  const { data } = await api.get("/users");
  return data.data;
}
