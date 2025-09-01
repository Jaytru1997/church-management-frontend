<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div
        class="text-center flex flex-col gap-2 items-center justify-center mb-8 fade-in"
      >
        <img
          src="~/assets/images/logo.png"
          alt="Church Sphere Logo"
          class="w-36 h-auto"
        />
        <p class="text-white/60">Sign in to your account</p>
      </div>

      <!-- Login Form -->
      <div class="glass-card p-8 slide-up">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="form-label flex items-center">
              <svg
                class="w-4 h-4 mr-2 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              Email address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.email }"
              placeholder="Enter your email"
            />
            <p v-if="errors.email" class="mt-2 text-sm text-red-400">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="form-label flex items-center">
              <svg
                class="w-4 h-4 mr-2 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.password }"
              placeholder="Enter your password"
            />
            <p v-if="errors.password" class="mt-2 text-sm text-red-400">
              {{ errors.password }}
            </p>
          </div>

          <!-- Remember me and Forgot password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/20 rounded bg-white/10"
              />
              <label for="remember-me" class="ml-2 block text-sm text-white/80">
                Remember me
              </label>
            </div>

            <button
              type="button"
              class="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <!-- Error message -->
          <div
            v-if="authError"
            class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 bounce-in"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-400">
                  Authentication failed
                </h3>
                <div class="mt-1 text-sm text-red-300">
                  <p>{{ authError }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <div class="loading-spinner w-5 h-5 mr-3"></div>
                Signing in...
              </span>
              <span v-else class="flex items-center justify-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Sign in
              </span>
            </button>
          </div>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/20"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-slate-900 text-white/60">Or</span>
          </div>
        </div>

        <!-- Register link -->
        <div class="text-center">
          <p class="text-white/60">
            Don't have an account?
            <NuxtLink
              to="/auth/register"
              class="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Create one now
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Demo credentials -->
      <div class="glass-card p-6 mt-6 slide-up" style="animation-delay: 0.2s">
        <h3 class="text-lg font-semibold text-white mb-3 flex items-center">
          <svg
            class="w-5 h-5 mr-2 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0 1 18 0z"
            />
          </svg>
          Demo Credentials
        </h3>
        <div class="space-y-2 text-sm">
          <div
            class="flex items-center justify-between p-2 rounded-lg bg-white/5"
          >
            <span class="text-white/80">Admin:</span>
            <span class="text-purple-400 font-mono">admin@church.com</span>
          </div>
          <div
            class="flex items-center justify-between p-2 rounded-lg bg-white/5"
          >
            <span class="text-white/80">Volunteer:</span>
            <span class="text-purple-400 font-mono">volunteer@church.com</span>
          </div>
          <div
            class="flex items-center justify-between p-2 rounded-lg bg-white/5"
          >
            <span class="text-white/80">Member:</span>
            <span class="text-purple-400 font-mono">member@church.com</span>
          </div>
          <div
            class="text-center mt-3 p-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10"
          >
            <span class="text-white/60">Password for all: </span>
            <span class="text-purple-400 font-mono">password123</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "nuxt/app";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "auth",
});

useHead({
  title: "Sign In - Church Sphere",
});

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const errors = ref<Record<string, string>>({});

const loading = computed(() => authStore.loading);
const authError = computed(() => authStore.error);

const validateForm = () => {
  errors.value = {};

  if (!form.value.email) {
    errors.value.email = "Email is required";
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = "Please enter a valid email address";
  }

  if (!form.value.password) {
    errors.value.password = "Password is required";
  } else if (form.value.password.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
  }

  return Object.keys(errors.value).length === 0;
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    const result = await authStore.login({
      email: form.value.email,
      password: form.value.password,
    });

    if (result.success) {
      // Store remember me preference
      if (form.value.rememberMe && process.client) {
        localStorage.setItem("remember_me", "true");
      }

      // Redirect to dashboard
      await router.push("/dashboard");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

onMounted(() => {
  // Check if remember me was previously set
  if (process.client) {
    const rememberMe = localStorage.getItem("remember_me");
    if (rememberMe === "true") {
      form.value.rememberMe = true;
    }

    // Auto-fill demo credentials for development
    if (process.env.NODE_ENV === "development") {
      form.value.email = "admin@church.com";
      form.value.password = "password123";
    }
  }
});
</script>
