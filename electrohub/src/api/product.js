/**
 * product.js
 * الـ Resource في الـ Backend اسمه "components" مش "products" (Controller: /components)
 * بس سيبناه هنا باسم product.js زي ما طلبت، وكل الدوال بتنادي على /components فعليًا.
 *
 * Endpoints:
 *  GET    /components                    -> findAll (فلاتر + pagination)
 *  GET    /components/:id                -> findOne
 *  GET    /components/:id/alternatives   -> findAlternatives
 *  POST   /components                    -> create   (Admin only)
 *  PATCH  /components/:id                -> update   (Admin only)
 *  DELETE /components/:id                -> remove   (Admin only)
 */

import api from "./axios";

/**
 * جلب كل المكوّنات (Products) مع فلاتر واختياريّة وpagination
 * @param {{
 *   category?: string,
 *   manufacturer?: string,
 *   packageType?: string,
 *   minPrice?: number,
 *   maxPrice?: number,
 *   search?: string,
 *   page?: number,
 *   limit?: number
 * }} [params]
 * @returns {Promise<{ items: Array, pagination: { total: number, page: number, limit: number, totalPages: number } }>}
 */
export async function getProducts(params = {}) {
  const { data } = await api.get("/components", { params });
  return data.data; // { items, pagination }
}

/**
 * جلب منتج واحد بالـ id
 * @param {string} id - UUID
 */
export async function getProductById(id) {
  const { data } = await api.get(`/components/${id}`);
  return data.data;
}

/**
 * جلب بدائل لمنتج معيّن (نفس الـ category، حد أقصى 5)
 * @param {string} id - UUID
 */
export async function getProductAlternatives(id) {
  const { data } = await api.get(`/components/${id}/alternatives`);
  return data.data;
}

/**
 * إنشاء منتج جديد (Admin only)
 * @param {{
 *   name: string,
 *   description: string,
 *   price: number,
 *   stockQuantity?: number,
 *   category: string,
 *   manufacturer?: string,
 *   packageType?: string,
 *   specs?: Record<string, any>,
 *   datasheetUrl?: string,
 *   imageUrl?: string
 * }} payload
 */
export async function createProduct(payload) {
  const { data } = await api.post("/components", payload);
  return data.data;
}

/**
 * تعديل منتج موجود (Admin only) - كل الحقول اختيارية
 * @param {string} id - UUID
 * @param {object} payload - نفس حقول createProduct بس كلها optional
 */
export async function updateProduct(id, payload) {
  const { data } = await api.patch(`/components/${id}`, payload);
  return data.data;
}

/**
 * حذف منتج (Admin only)
 * @param {string} id - UUID
 */
export async function deleteProduct(id) {
  const { data } = await api.delete(`/components/${id}`);
  return data.data;
}
