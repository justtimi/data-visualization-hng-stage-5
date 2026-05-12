import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: () => import("../views/DashboardView.vue"),
  },
  {
    path: "/analytics",
    component: () => import("../views/AnalyticsView.vue"),
  },
  {
    path: "/logs",
    component: () => import("../views/LogsView.vue"),
  },
  ],
})

export default router
