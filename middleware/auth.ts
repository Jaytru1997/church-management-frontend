import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to: any) => {
  const authStore = useAuthStore();

  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    // Redirect to login if not authenticated and trying to access protected route
    if (to.path !== "/auth/login" && to.path !== "/auth/register") {
      return navigateTo("/auth/login");
    }
  } else {
    // Redirect authenticated users away from auth pages
    if (to.path === "/auth/login" || to.path === "/auth/register") {
      return navigateTo("/dashboard");
    }

    // Redirect to dashboard if accessing root
    if (to.path === "/") {
      return navigateTo("/dashboard");
    }
  }
});
