/**
 * project.js
 * الـ Backend فيه Resource اسمه "Projects" (المشاريع التعليمية الجاهزة زي Smart Traffic Light)
 * مختلف عن الـ AI Project Generator اللي عندك في الفرونت (اللي بينادي Gemini مباشرة).
 *
 * Endpoints:
 *  GET    /projects       -> getProjects (فلتر بالـ difficultyLevel + pagination)
 *  GET    /projects/:id   -> getProjectById (بيرجع المكوّنات + التكلفة الإجمالية)
 *  POST   /projects       -> createProject (Admin only)
 *  PATCH  /projects/:id   -> updateProject (Admin only)
 *  DELETE /projects/:id   -> deleteProject (Admin only)
 */

import api from "./axios";

/**
 * جلب كل المشاريع المميّزة
 * @param {{ difficultyLevel?: "beginner"|"intermediate"|"advanced", page?: number, limit?: number }} [params]
 */
export async function getProjects(params = {}) {
  const { data } = await api.get("/projects", { params });
  return data.data;
}

/**
 * جلب تفاصيل مشروع (بيشمل projectComponents + totalCost)
 * @param {string} id - UUID
 */
export async function getProjectById(id) {
  const { data } = await api.get(`/projects/${id}`);
  return data.data;
}

/**
 * إنشاء مشروع جديد مع مكوّناته (Admin only)
 * @param {{
 *   name: string,
 *   description: string,
 *   imageUrl?: string,
 *   youtubeUrl?: string,
 *   tinkercadUrl?: string,
 *   difficultyLevel?: "beginner"|"intermediate"|"advanced",
 *   components?: Array<{ componentId: string, quantityNeeded: number }>
 * }} payload
 */
export async function createProject(payload) {
  const { data } = await api.post("/projects", payload);
  return data.data;
}

/**
 * تعديل مشروع (Admin only) - بعت "components" لو عايز تستبدل كل المكوّنات
 * @param {string} id - UUID
 * @param {object} payload
 */
export async function updateProject(id, payload) {
  const { data } = await api.patch(`/projects/${id}`, payload);
  return data.data;
}

/**
 * حذف مشروع (Admin only)
 * @param {string} id - UUID
 */
export async function deleteProject(id) {
  const { data } = await api.delete(`/projects/${id}`);
  return data.data;
}
