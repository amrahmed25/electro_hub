/**
 * wishlist.js
 * كل الـ endpoints دي محتاجة تسجيل دخول (JWT).
 *
 * Endpoints:
 *  GET    /wishlist      -> getWishlist
 *  POST   /wishlist      -> addToWishlist
 *  DELETE /wishlist/:id  -> removeFromWishlist
 */

import api from "./axios";

/**
 * جلب wishlist المستخدم الحالي مع تفاصيل المنتجات
 */
export async function getWishlist() {
  const { data } = await api.get("/wishlist");
  return data.data;
}

/**
 * إضافة منتج للـ wishlist
 * @param {string} componentId - UUID
 */
export async function addToWishlist(componentId) {
  const { data } = await api.post("/wishlist", { componentId });
  return data.data;
}

/**
 * حذف عنصر من الـ wishlist (id بتاع عنصر الـ wishlist نفسه، مش المنتج)
 * @param {string} wishlistItemId - UUID
 */
export async function removeFromWishlist(wishlistItemId) {
  const { data } = await api.delete(`/wishlist/${wishlistItemId}`);
  return data.data;
}
