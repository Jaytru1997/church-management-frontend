<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Navigation -->
    <nav
      class="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <img
              src="~/assets/images/logo.svg"
              alt="Church Sphere Logo"
              class="w-36 h-auto"
            />
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/auth/login" class="btn-ghost text-sm">
              Sign In
            </NuxtLink>
            <NuxtLink to="/auth/register" class="btn-primary text-sm">
              Get Started
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <div
          class="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute top-40 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style="animation-delay: 1s"
        ></div>
        <div
          class="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style="animation-delay: 2s"
        ></div>
      </div>

      <div
        class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8"
      >
        <div class="text-center fade-in">
          <h1
            class="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6"
          >
            Manage Your Church
            <span class="block gradient-text">Like Never Before</span>
          </h1>
          <p
            class="mt-6 max-w-3xl mx-auto text-xl text-white/80 leading-relaxed"
          >
            Streamline your church operations with our comprehensive management
            system. Handle members, donations, campaigns, and more with ease.
          </p>
          <div
            class="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <NuxtLink
              to="/auth/register"
              class="flex flex-row justify-center items-center btn-primary text-lg px-8 py-4"
            >
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Start Free Trial
            </NuxtLink>
            <a
              href="#features"
              class="flex flex-row justify-center items-center btn-ghost text-lg px-8 py-4"
            >
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                />
              </svg>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center slide-up">
          <h2 class="text-4xl font-extrabold text-white sm:text-5xl mb-6">
            Everything you need to manage your church
          </h2>
          <p class="text-xl text-white/60 max-w-3xl mx-auto">
            Powerful features designed specifically for church administration
            with modern technology
          </p>
        </div>

        <div class="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Member Management -->
          <div class="glass-card p-8 bounce-in" style="animation-delay: 0.1s">
            <div class="icon-container w-16 h-16 mb-6">
              <svg
                class="w-8 h-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Member Management</h3>
            <p class="text-white/70 leading-relaxed">
              Keep track of church members, attendance, and volunteer teams with
              our comprehensive member management system.
            </p>
          </div>

          <!-- Donation Tracking -->
          <div class="glass-card p-8 bounce-in" style="animation-delay: 0.2s">
            <div class="icon-container w-16 h-16 mb-6">
              <svg
                class="w-8 h-8 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Donation Tracking</h3>
            <p class="text-white/70 leading-relaxed">
              Track tithes, offerings, and special donations with integrated
              payment processing and detailed reporting.
            </p>
          </div>

          <!-- Campaign Management -->
          <div class="glass-card p-8 bounce-in" style="animation-delay: 0.3s">
            <div class="icon-container w-16 h-16 mb-6">
              <svg
                class="w-8 h-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">
              Campaign Management
            </h3>
            <p class="text-white/70 leading-relaxed">
              Create and manage fundraising campaigns with progress tracking and
              social media sharing capabilities.
            </p>
          </div>

          <!-- Real-time Notifications -->
          <div class="glass-card p-8 bounce-in" style="animation-delay: 0.4s">
            <div class="icon-container w-16 h-16 mb-6">
              <svg
                class="w-8 h-8 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">
              Real-time Notifications
            </h3>
            <p class="text-white/70 leading-relaxed">
              Stay updated with instant notifications for donations, member
              updates, and important church events.
            </p>
          </div>

          <!-- Multi-Church Support -->
          <div class="glass-card p-8 bounce-in" style="animation-delay: 0.5s">
            <div class="icon-container w-16 h-16 mb-6">
              <svg
                class="w-8 h-8 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">
              Multi-Church Support
            </h3>
            <p class="text-white/70 leading-relaxed">
              Manage multiple churches from a single account with role-based
              access control and church-specific settings.
            </p>
          </div>

          <!-- Analytics & Reporting -->
          <div class="glass-card p-8 bounce-in" style="animation-delay: 0.6s">
            <div class="icon-container w-16 h-16 mb-6">
              <svg
                class="w-8 h-8 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">
              Analytics & Reporting
            </h3>
            <p class="text-white/70 leading-relaxed">
              Get insights into your church operations with comprehensive
              analytics, charts, and detailed reports.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="glass-card p-8 text-center slide-up"
            style="animation-delay: 0.1s"
          >
            <div class="text-4xl font-bold gradient-text mb-2">500+</div>
            <div class="text-white/70">Churches Trust Us</div>
          </div>
          <div
            class="glass-card p-8 text-center slide-up"
            style="animation-delay: 0.2s"
          >
            <div class="text-4xl font-bold gradient-text mb-2">50K+</div>
            <div class="text-white/70">Members Managed</div>
          </div>
          <div
            class="glass-card p-8 text-center slide-up"
            style="animation-delay: 0.3s"
          >
            <div class="text-4xl font-bold gradient-text mb-2">$2M+</div>
            <div class="text-white/70">Donations Processed</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-24 relative">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass-card p-12 text-center slide-up">
          <h2 class="text-4xl font-extrabold text-white mb-6">
            <span class="block">Ready to get started?</span>
            <span class="block gradient-text"
              >Start your free trial today.</span
            >
          </h2>
          <p class="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join hundreds of churches already using our platform to streamline
            their operations and focus on what matters most.
          </p>
          <div
            class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <NuxtLink
              to="/auth/register"
              class="flex flex-row items-center justify-center btn-primary text-lg px-8 py-4"
            >
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Get started
            </NuxtLink>
            <a
              href="#contact"
              class="flex flex-row items-center justify-center btn-ghost text-lg px-8 py-4"
            >
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white/5 backdrop-blur-xl border-t border-white/20">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8 xl:col-span-1">
            <div class="flex items-center">
              <img
                src="~/assets/images/logo.png"
                alt="Church Sphere Logo"
                class="w-36 h-auto"
              />
            </div>
            <p class="text-white/60 text-base leading-relaxed">
              Empowering churches with modern management tools to focus on what
              matters most - serving their communities.
            </p>
          </div>
          <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3
                  class="text-sm font-semibold text-white/80 tracking-wider uppercase mb-4"
                >
                  Solutions
                </h3>
                <ul class="space-y-3">
                  <li>
                    <a
                      href="#"
                      class="text-base text-white/60 hover:text-white transition-colors"
                      >Member Management</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-base text-white/60 hover:text-white transition-colors"
                      >Donation Tracking</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-base text-white/60 hover:text-white transition-colors"
                      >Campaign Management</a
                    >
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3
                  class="text-sm font-semibold text-white/80 tracking-wider uppercase mb-4"
                >
                  Support
                </h3>
                <ul class="space-y-3">
                  <li>
                    <a
                      href="#"
                      class="text-base text-white/60 hover:text-white transition-colors"
                      >Documentation</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-base text-white/60 hover:text-white transition-colors"
                      >Help Center</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-base text-white/60 hover:text-white transition-colors"
                      >Contact Us</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-white/20 pt-8">
          <p class="text-base text-white/60 xl:text-center">
            &copy; 2025 Church Sphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "nuxt/app";

useHead({
  title: "Church Sphere - Streamline Your Church Operations",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive church management system for managing members, donations, campaigns, and more. Start your free trial today.",
    },
  ],
});
</script>
