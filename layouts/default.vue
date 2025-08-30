<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 transform transition-transform duration-300 ease-in-out"
      :class="{
        '-translate-x-full': !sidebarOpen,
        'translate-x-0': sidebarOpen,
      }"
    >
      <!-- Logo -->
      <div
        class="flex items-center justify-between h-16 px-6 border-b border-white/20"
      >
        <div class="flex items-center">
          <div class="icon-container w-10 h-10 mr-3">
            <svg
              class="w-6 h-6 text-purple-400"
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
          <h1 class="text-xl font-bold gradient-text">ChurchMS</h1>
        </div>
        <button
          @click="sidebarOpen = false"
          class="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="mt-6 px-4 space-y-2">
        <NuxtLink
          to="/dashboard"
          class="sidebar-link"
          :class="{ active: $route.path === '/dashboard' }"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
            />
          </svg>
          Dashboard
        </NuxtLink>

        <NuxtLink
          to="/church/manage"
          class="sidebar-link"
          :class="{ active: $route.path.startsWith('/church') }"
        >
          <svg
            class="w-5 h-5 mr-3"
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
          Church Management
        </NuxtLink>

        <NuxtLink
          to="/church/members"
          class="sidebar-link"
          :class="{ active: $route.path.startsWith('/members') }"
        >
          <svg
            class="w-5 h-5 mr-3"
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
          Members
        </NuxtLink>

        <NuxtLink
          to="/donations"
          class="sidebar-link"
          :class="{ active: $route.path.startsWith('/donations') }"
        >
          <svg
            class="w-5 h-5 mr-3"
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
          Donations
        </NuxtLink>

        <NuxtLink
          to="/campaigns"
          class="sidebar-link"
          :class="{ active: $route.path.startsWith('/campaigns') }"
        >
          <svg
            class="w-5 h-5 mr-3"
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
          Campaigns
        </NuxtLink>

        <NuxtLink
          to="/reports"
          class="sidebar-link"
          :class="{ active: $route.path.startsWith('/reports') }"
        >
          <svg
            class="w-5 h-5 mr-3"
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
          Reports
        </NuxtLink>
      </nav>

      <!-- User Profile -->
      <div
        class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
          >
            <span class="text-white font-semibold text-sm">{{
              userInitials
            }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">
              {{ user?.name || "User" }}
            </p>
            <p class="text-xs text-white/60 capitalize">
              {{ user?.role || "member" }}
            </p>
          </div>
          <button
            @click="handleLogout"
            class="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Logout"
          >
            <svg
              class="w-4 h-4 text-white/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lg:ml-64">
      <!-- Top Navigation -->
      <header
        class="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40"
      >
        <div
          class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
        >
          <!-- Mobile menu button -->
          <button
            @click="sidebarOpen = true"
            class="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <!-- Page Title -->
          <div class="flex-1 lg:flex-none">
            <h1 class="text-xl font-semibold text-white">{{ pageTitle }}</h1>
          </div>

          <!-- Right side actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button
              class="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                class="w-5 h-5 text-white"
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
              <div v-if="unreadNotifications > 0" class="notification-badge">
                {{ unreadNotifications > 9 ? "9+" : unreadNotifications }}
              </div>
            </button>

            <!-- Settings -->
            <button class="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>

    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
    ></div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

const sidebarOpen = ref(false);
const unreadNotifications = ref(3); // This would come from a notification store

// Computed properties
const user = computed(() => authStore.user);

const userInitials = computed(() => {
  if (!user.value?.name) return "U";
  return user.value.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

const pageTitle = computed(() => {
  const route = useRoute();
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/church/manage": "Church Management",
    "/church/members": "Members",
    "/donations": "Donations",
    "/campaigns": "Campaigns",
    "/reports": "Reports",
  };
  return titles[route.path] || "Dashboard";
});

// Methods
const handleLogout = async () => {
  try {
    await authStore.logout();
    await router.push("/auth/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Close sidebar on route change
watch(
  () => useRoute().path,
  () => {
    sidebarOpen.value = false;
  }
);
</script>
