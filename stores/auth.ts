import { defineStore } from "pinia";
import { reactive, computed, toRefs } from "vue";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "volunteer" | "member";
  avatar?: string;
  churches?: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", () => {
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000/api";

  const state = reactive<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  });

  // Getters
  const userRole = computed(() => state.user?.role || "guest");
  const isAdmin = computed(() => state.user?.role === "admin");
  const isVolunteer = computed(() => state.user?.role === "volunteer");
  const isMember = computed(() => state.user?.role === "member");
  const userChurches = computed(() => state.user?.churches || []);

  // Actions
  const login = async (credentials: { email: string; password: string }) => {
    state.loading = true;
    state.error = null;

    try {
      const response = (await $fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        body: credentials,
      })) as { token: string; user: User };

      const { token, user } = response;

      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      // Store token in localStorage
      if (process.client) {
        localStorage.setItem("auth_token", token);
      }

      return { success: true, user };
    } catch (error: any) {
      state.error = error.data?.message || "Login failed";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    phone?: string;
    role: string;
    password: string;
  }) => {
    state.loading = true;
    state.error = null;

    try {
      const response = (await $fetch(`${apiBaseUrl}/auth/register`, {
        method: "POST",
        body: userData,
      })) as { token: string; user: User };

      const { token, user } = response;

      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      if (process.client) {
        localStorage.setItem("auth_token", token);
      }

      return { success: true, user };
    } catch (error: any) {
      state.error = error.data?.message || "Registration failed";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const logout = async () => {
    try {
      if (state.token) {
        await $fetch(`${apiBaseUrl}/auth/logout`, {
          method: "POST",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
    }
  };

  const fetchUser = async () => {
    if (!state.token) return;

    try {
      const response = (await $fetch(`${apiBaseUrl}/auth/me`)) as {
        user: User;
      };
      state.user = response.user;
      state.isAuthenticated = true;
    } catch (error) {
      console.error("Fetch user error:", error);
      clearAuth();
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const response = (await $fetch(`${apiBaseUrl}/auth/profile`, {
        method: "PUT",
        body: profileData,
      })) as { user: User };

      if (state.user) {
        state.user = { ...state.user, ...response.user };
      }

      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Profile update failed";
      throw error;
    }
  };

  const changePassword = async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/auth/change-password`, {
        method: "PUT",
        body: passwordData,
      });

      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Password change failed";
      throw error;
    }
  };

  const clearAuth = () => {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    state.error = null;

    if (process.client) {
      localStorage.removeItem("auth_token");
    }
  };

  const initializeAuth = () => {
    if (process.client) {
      const token = localStorage.getItem("auth_token");
      if (token) {
        state.token = token;
        fetchUser();
      }
    }
  };

  return {
    // State
    ...toRefs(state),

    // Getters
    userRole,
    isAdmin,
    isVolunteer,
    isMember,
    userChurches,

    // Actions
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
    changePassword,
    clearAuth,
    initializeAuth,
  };
});
