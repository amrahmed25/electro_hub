/**
 * dashboard.js
 * الـ Backend مفيهوش controller منفصل اسمه "dashboard" - الـ endpoint فعليًا هو:
 *   GET /users/me/dashboard  (موجود في users.controller.ts)
 * الملف ده بس واجهة مريحة إسمها dashboard.js زي ما طلبت، وبيستخدم نفس الدالة
 * من user.js من غير ما نكرر نفس الـ axios call مرتين.
 */

import { getMyDashboard } from "./user";

/**
 * جلب بيانات الداشبورد (profile + آخر 5 أوردرات + wishlist + stats)
 */
export async function getDashboard() {
  return getMyDashboard();
}
