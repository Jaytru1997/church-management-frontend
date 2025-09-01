<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-lg">
      <!-- Logo/Brand Section -->
      <div
        class="text-center flex flex-col gap-2 items-center justify-center mb-8 fade-in"
      >
        <img
          src="~/assets/images/logo.png"
          alt="Church Sphere logo"
          srcset=""
          class="w-36 h-auto"
        />
        <p class="text-white/60">Join the church management system</p>
      </div>

      <!-- Registration Form -->
      <div class="glass-card p-8 slide-up">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- First Name -->
          <div>
            <label for="fullName" class="form-label flex items-center">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              First Name
            </label>
            <input
              id="fullName"
              v-model="form.firstName"
              type="text"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.firstName }"
              placeholder="Enter your first name"
            />
            <p v-if="errors.firstName" class="mt-2 text-sm text-red-400">
              {{ errors.firstName }}
            </p>
          </div>

          <!-- Last Name -->
          <div>
            <label for="lastName" class="form-label flex items-center">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Last Name
            </label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.lastName }"
              placeholder="Enter your last name"
            />
            <p v-if="errors.lastName" class="mt-2 text-sm text-red-400">
              {{ errors.lastName }}
            </p>
          </div>

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
              Email Address
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

          <!-- Phone -->
          <div>
            <label for="phone" class="form-label flex items-center">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Phone Number (Optional)
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="form-input"
              :class="{ 'border-red-400/50': errors.phone }"
              placeholder="Enter your phone number"
            />
            <p v-if="errors.phone" class="mt-2 text-sm text-red-400">
              {{ errors.phone }}
            </p>
          </div>

          <!-- Role -->
          <div>
            <label for="role" class="form-label flex items-center">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Role
            </label>
            <select
              id="role"
              v-model="form.role"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.role }"
            >
              <option value="">Select your role</option>
              <option value="member">Church Member</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Church Administrator</option>
            </select>
            <p v-if="errors.role" class="mt-2 text-sm text-red-400">
              {{ errors.role }}
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
              placeholder="Create a password"
            />
            <p v-if="errors.password" class="mt-2 text-sm text-red-400">
              {{ errors.password }}
            </p>
            <p class="mt-1 text-xs text-white/60">
              Password must be at least 8 characters long
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="form-label flex items-center">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.confirmPassword }"
              placeholder="Confirm your password"
            />
            <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-400">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="form.acceptTerms"
                type="checkbox"
                required
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/20 rounded bg-white/10"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="text-white/80">
                I agree to the
                <a
                  href="#"
                  class="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Terms and Conditions
                </a>
                and
                <a
                  href="#"
                  class="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
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
                  Registration failed
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
                Creating account...
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Create Account
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

        <!-- Login link -->
        <div class="text-center">
          <p class="text-white/60">
            Already have an account?
            <NuxtLink
              to="/auth/login"
              class="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Sign in here
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Success message -->
      <div
        v-if="registrationSuccess"
        class="glass-card p-6 mt-6 slide-up bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0 1 18 0z"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-emerald-400">
              Account created successfully!
            </h3>
            <div class="mt-1 text-sm text-emerald-300">
              <p>You can now sign in with your new account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "nuxt/app";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "auth",
});

useHead({
  title: "Create Account - Church Management System",
});

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const errors = ref<Record<string, string>>({});
const registrationSuccess = ref(false);

const loading = computed(() => authStore.loading);
const authError = computed(() => authStore.error);

const validateForm = () => {
  errors.value = {};

  if (!form.value.firstName) {
    errors.value.firstName = "First name is required";
  } else if (form.value.firstName.length < 2) {
    errors.value.firstName = "First name must be at least 2 characters";
  }

  if (!form.value.lastName) {
    errors.value.lastName = "Last name is required";
  } else if (form.value.lastName.length < 2) {
    errors.value.lastName = "Last name must be at least 2 characters";
  }

  if (!form.value.email) {
    errors.value.email = "Email is required";
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = "Please enter a valid email address";
  }

  if (form.value.phone && !isValidPhone(form.value.phone)) {
    errors.value.phone = "Please enter a valid phone number";
  }

  if (!form.value.role) {
    errors.value.role = "Please select a role";
  }

  if (!form.value.password) {
    errors.value.password = "Password is required";
  } else if (form.value.password.length < 8) {
    errors.value.password = "Password must be at least 8 characters";
  }

  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = "Please confirm your password";
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = "Passwords do not match";
  }

  if (!form.value.acceptTerms) {
    errors.value.acceptTerms = "You must accept the terms and conditions";
  }

  return Object.keys(errors.value).length === 0;
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string) => {
  const internationalPhoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const localPhoneRegex = /^0[789][01]\d{8}$/;
  return (
    internationalPhoneRegex.test(phone.replace(/\s/g, "")) ||
    localPhoneRegex.test(phone.replace(/\s/g, ""))
  );
};

const handleRegister = async () => {
  if (!validateForm()) return;

  try {
    const result = await authStore.register({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      role: form.value.role,
      password: form.value.password,
    });

    if (result.success) {
      registrationSuccess.value = true;
      form.value = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      };

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
};
</script>
