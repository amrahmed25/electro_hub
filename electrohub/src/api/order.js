/**
 * order.js
 * Endpoints:
 *  POST  /orders/checkout   -> checkout (بيستخدم الـ Cart الحالي، من غير Body)
 *  GET   /orders            -> getOrders (أوردرات المستخدم الحالي)
 *  GET   /orders/:id        -> getOrderById
 *  PATCH /orders/:id/status -> updateOrderStatus (Admin only)
 * كل الـ endpoints دي محتاجة تسجيل دخول (JWT).
 */

import api from "./axios";

/**
 * إتمام عملية الشراء (Checkout) - بيحوّل الـ Cart الحالي لـ Order
 * @returns {Promise<object>} الأوردر اللي اتعمل
 */
export async function checkout() {
  const { data } = await api.post("/orders/checkout");
  return data.data;
}

/**
 * جلب كل أوردرات المستخدم الحالي
 */
export async function getOrders() {
  const { data } = await api.get("/orders");
  return data.data;
}

/**
 * جلب تفاصيل أوردر معيّن
 * @param {string} id - UUID
 */
export async function getOrderById(id) {
  const { data } = await api.get(`/orders/${id}`);
  return data.data;
}

/**
 * تحديث حالة الأوردر (Admin only)
 * @param {string} id - UUID
 * @param {"pending"|"paid"|"shipped"|"completed"|"cancelled"} status
 */
export async function updateOrderStatus(id, status) {
  const { data } = await api.patch(`/orders/${id}/status`, { status });
  return data.data;
}
