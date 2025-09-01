<template>
  <nav
    class="bg-slate-900/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50"
  >
    <div class="container-responsive">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/dashboard" class="flex items-center space-x-3">
            <img
              src="~/assets/images/logo.png"
              alt="Church Sphere"
              class="w-8 h-8"
            />
            <span class="text-xl font-bold gradient-text">Church Sphere</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <!-- Dashboard -->
          <NuxtLink
            to="/dashboard"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/dashboard' }"
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Dashboard
          </NuxtLink>

          <!-- Members -->
          <NuxtLink
            to="/members"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path.startsWith('/members') }"
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            Members
          </NuxtLink>

          <!-- Volunteer Teams -->
          <NuxtLink
            to="/volunteer-teams"
            class="nav-link"
            :class="{
              'nav-link-active': $route.path.startsWith('/volunteer-teams'),
            }"
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Teams
          </NuxtLink>

          <!-- Donations -->
          <NuxtLink
            to="/donations"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path.startsWith('/donations') }"
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            Donations
          </NuxtLink>

          <!-- Campaigns -->
          <NuxtLink
            to="/campaigns"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path.startsWith('/campaigns') }"
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
            Campaigns
          </NuxtLink>

          <!-- Expenses (Admin only) -->
          <NuxtLink
            v-if="isAdmin"
            to="/expenses"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path.startsWith('/expenses') }"
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
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Expenses
          </NuxtLink>

          <!-- Financial Records (Admin only) -->
          <NuxtLink
            v-if="isAdmin"
            to="/financial-records"
            class="nav-link"
            :class="{
              'nav-link-active': $route.path.startsWith('/financial-records'),
            }"
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
                d="M9 14l6-6m-6 6l6 6m-6-6h12"
              />
            </svg>
            Financial
          </NuxtLink>

          <!-- Church Settings (Admin only) -->
          <NuxtLink
            v-if="isAdmin"
            to="/church/settings"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path.startsWith('/church') }"
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </NuxtLink>
        </div>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <div class="relative">
            <button
              @click="showNotifications = !showNotifications"
              class="nav-link relative"
            >
              <svg
                class="w-5 h-5"
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
              <span
                v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ unreadCount > 99 ? "99+" : unreadCount }}
              </span>
            </button>

            <!-- Notifications Dropdown -->
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-lg border border-white/10 z-50"
            >
              <div class="p-4 border-b border-white/10">
                <h3 class="text-white font-medium">Notifications</h3>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <div
                  v-if="recentNotifications.length === 0"
                  class="p-4 text-center text-white/60"
                >
                  No notifications
                </div>
                <div
                  v-for="notification in recentNotifications"
                  :key="notification._id"
                  class="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer"
                  @click="markAsRead(notification._id)"
                >
                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                      <div
                        class="w-2 h-2 bg-purple-500 rounded-full mt-2"
                      ></div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-white text-sm font-medium truncate">
                        {{ notification.title }}
                      </p>
                      <p class="text-white/60 text-xs mt-1">
                        {{ notification.message }}
                      </p>
                      <p class="text-white/40 text-xs mt-1">
                        {{ formatDate(notification.sentAt) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-4 border-t border-white/10">
                <NuxtLink
                  to="/notifications"
                  class="text-purple-400 hover:text-purple-300 text-sm"
                >
                  View all notifications
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- User Menu -->
          <div class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 nav-link"
            >
              <div
                class="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center"
              >
                <span class="text-white font-semibold text-sm">
                  {{ user?.name?.[0] || "U" }}
                </span>
              </div>
              <span class="hidden md:block text-white/80">{{
                user?.name
              }}</span>
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- User Menu Dropdown -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-white/10 z-50"
            >
              <div class="p-4 border-b border-white/10">
                <p class="text-white font-medium">{{ user?.name }}</p>
                <p class="text-white/60 text-sm">{{ user?.email }}</p>
              </div>
              <div class="py-2">
                <NuxtLink to="/profile" class="dropdown-item">
                  <svg
                    class="w-4 h-4 mr-3"
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
                  Profile
                </NuxtLink>
                <NuxtLink to="/subscriptions" class="dropdown-item">
                  <svg
                    class="w-4 h-4 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Subscription
                </NuxtLink>
                <button
                  @click="handleLogout"
                  class="dropdown-item w-full text-left"
                >
                  <svg
                    class="w-4 h-4 mr-3"
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
                  Logout
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden nav-link"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!showMobileMenu"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="showMobileMenu" class="md:hidden border-t border-white/10">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink to="/dashboard" class="mobile-nav-link">Dashboard</NuxtLink>
          <NuxtLink to="/members" class="mobile-nav-link">Members</NuxtLink>
          <NuxtLink to="/volunteer-teams" class="mobile-nav-link"
            >Teams</NuxtLink
          >
          <NuxtLink to="/donations" class="mobile-nav-link">Donations</NuxtLink>
          <NuxtLink to="/campaigns" class="mobile-nav-link">Campaigns</NuxtLink>
          <NuxtLink v-if="isAdmin" to="/expenses" class="mobile-nav-link"
            >Expenses</NuxtLink
          >
          <NuxtLink
            v-if="isAdmin"
            to="/financial-records"
            class="mobile-nav-link"
            >Financial</NuxtLink
          >
          <NuxtLink v-if="isAdmin" to="/church/settings" class="mobile-nav-link"
            >Settings</NuxtLink
          >
        </div>
      </div>
    </div>

    <!-- Click outside to close dropdowns -->
    <div
      v-if="showNotifications || showUserMenu"
      @click="
        showNotifications = false;
        showUserMenu = false;
      "
      class="fixed inset-0 z-40"
    ></div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useNotificationStore } from "~/stores/notification";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const router = useRouter();

const user = computed(() => authStore.user);
const isAdmin = computed(() => authStore.isAdmin);
const unreadCount = computed(() => notificationStore.unreadCount);
const recentNotifications = computed(() =>
  notificationStore.notifications.slice(0, 5)
);

// UI state
const showNotifications = ref(false);
const showUserMenu = ref(false);
const showMobileMenu = ref(false);

// Methods
const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const markAsRead = async (notificationId: string) => {
  try {
    await notificationStore.markAsRead(notificationId);
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push("/auth/login");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Initialize notifications
onMounted(async () => {
  try {
    await notificationStore.fetchNotifications({ limit: 10 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
});
</script>

<style scoped>
.nav-link {
  @apply px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center;
}

.nav-link-active {
  @apply text-purple-400 bg-purple-500/10;
}

.mobile-nav-link {
  @apply block px-3 py-2 rounded-md text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200;
}

.dropdown-item {
  @apply flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200;
}
</style>
