/**
 * cart.js
 * كل الـ endpoints دي محتاجة تسجيل دخول (JWT).
 *
 * Endpoints:
 *  GET    /cart                                -> getCart
 *  POST   /cart/items                           -> addToCart
 *  POST   /cart/items/from-project/:projectId   -> addAllFromProject ("Add All to Cart")
 *  PATCH  /cart/items/:id                       -> updateCartItem
 *  DELETE /cart/items/:id                       -> removeCartItem
 *  DELETE /cart                                 -> clearCart
 *
 * ملاحظة: ده الـ Backend service اللي المفروض CartContext بتاعك عندك في الفرونت
 * يستخدمه بدل أي منطق لوكال ستيت لوحده.
 */

import api from "./axios";

/**
 * جلب الكارت الحالي للمستخدم (items + totalPrice + itemCount)
 */
export async function getCart() {
  const { data } = await api.get("/cart");
  return data.data;
}

/**
 * إضافة منتج للكارت (لو موجود بالفعل، الكميات بتتجمع تلقائيًا في الـ backend)
 * @param {string} componentId - UUID
 * @param {number} quantity
 */
export async function addToCart(componentId, quantity) {
  const { data } = await api.post("/cart/items", { componentId, quantity });
  return data.data;
}

/**
 * "Add All to Cart" - إضافة كل مكوّنات مشروع معيّن للكارت دفعة واحدة
 * @param {string} projectId - UUID
 * @returns {Promise<{ message: string, addedItems: number }>}
 */
export async function addAllFromProject(projectId) {
  const { data } = await api.post(`/cart/items/from-project/${projectId}`);
  return data.data;
}

/**
 * تحديث كمية عنصر في الكارت
 * @param {string} cartItemId - UUID
 * @param {number} quantity
 */
export async function updateCartItem(cartItemId, quantity) {
  const { data } = await api.patch(`/cart/items/${cartItemId}`, { quantity });
  return data.data;
}

/**
 * حذف عنصر معيّن من الكارت
 * @param {string} cartItemId - UUID
 */
export async function removeCartItem(cartItemId) {
  const { data } = await api.delete(`/cart/items/${cartItemId}`);
  return data.data;
}

/**
 * تفريغ الكارت بالكامل
 */
export async function clearCart() {
  const { data } = await api.delete("/cart");
  return data.data;
}
