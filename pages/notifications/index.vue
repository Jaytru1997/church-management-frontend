<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Page Header -->
    <div class="container-responsive py-8">
      <div class="glass-card p-8 mb-8 fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold gradient-text mb-2">Notifications</h1>
            <p class="text-white/80 text-lg">
              Send and manage church-wide communications.
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="exportNotifications" class="btn-ghost">
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export
            </button>
            <NuxtLink to="/notifications/send" class="btn-primary">
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Send Notification
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="stats-card bounce-in">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Unread</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.unreadCount || 0 }}
              </p>
            </div>
            <div class="icon-container">
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
                  d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Sent Today</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.sentToday || 0 }}
              </p>
            </div>
            <div class="icon-container">
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">This Week</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.sentThisWeek || 0 }}
              </p>
            </div>
            <div class="icon-container">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Total Sent</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.totalSent || 0 }}
              </p>
            </div>
            <div class="icon-container">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Tabs -->
      <div class="glass-card p-6 mb-8 slide-up">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                activeTab === tab.key
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-white/60 hover:text-white hover:bg-white/10',
              ]"
            >
              {{ tab.label }}
              <span
                v-if="tab.count"
                class="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs"
              >
                {{ tab.count }}
              </span>
            </button>
          </div>

          <div class="flex items-center space-x-4">
            <select
              v-model="filters.type"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Types</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="announcement">Announcement</option>
            </select>

            <select
              v-model="filters.priority"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <!-- Bulk Actions for Sent Tab -->
        <div
          v-if="activeTab === 'sent' && selectedNotifications.length > 0"
          class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg"
        >
          <span class="text-sm text-white/60"
            >{{ selectedNotifications.length }} selected</span
          >
          <button @click="bulkArchive" class="btn-ghost text-sm">
            Archive
          </button>
          <button @click="bulkDelete" class="btn-ghost text-sm">Delete</button>
          <button
            @click="clearSelection"
            class="text-white/60 hover:text-white text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="space-y-4">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="loading-spinner w-12 h-12"></div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="filteredNotifications.length === 0"
          class="text-center py-12"
        >
          <div class="icon-container w-16 h-16 mx-auto mb-4">
            <svg
              class="w-8 h-8 text-white/60"
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
          <h3 class="text-xl font-semibold text-white mb-2">
            No Notifications
          </h3>
          <p class="text-white/60 mb-6">
            {{
              activeTab === "sent"
                ? "No notifications have been sent yet."
                : "No notifications in this category."
            }}
          </p>
          <NuxtLink
            v-if="activeTab === 'sent'"
            to="/notifications/send"
            class="btn-primary"
          >
            Send Your First Notification
          </NuxtLink>
        </div>

        <!-- Notification Items -->
        <div v-else class="space-y-4">
          <div
            v-for="notification in paginatedNotifications"
            :key="notification._id"
            :class="[
              'glass-card p-6 hover:glass-card-hover transition-all cursor-pointer',
              !notification.read && activeTab === 'received'
                ? 'border-l-4 border-l-purple-400'
                : '',
            ]"
            @click="handleNotificationClick(notification)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-semibold text-white truncate">
                    {{ notification.title }}
                  </h3>
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getTypeColor(notification.type),
                    ]"
                  >
                    {{ capitalize(notification.type) }}
                  </span>
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getPriorityColor(notification.priority),
                    ]"
                  >
                    {{ capitalize(notification.priority) }}
                  </span>
                  <span
                    v-if="!notification.read && activeTab === 'received'"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400"
                  >
                    New
                  </span>
                </div>

                <p class="text-white/70 mb-3">
                  {{ notification.message }}
                </p>

                <div
                  class="flex items-center justify-between text-sm text-white/60"
                >
                  <span>{{ formatDate(notification.sentAt) }}</span>
                  <div class="flex items-center space-x-4">
                    <span>{{ getRecipientText(notification) }}</span>
                    <div class="flex items-center space-x-2">
                      <button
                        v-if="activeTab === 'received'"
                        @click.stop="markAsRead(notification._id)"
                        class="text-white/60 hover:text-white"
                      >
                        {{ notification.read ? "Mark Unread" : "Mark Read" }}
                      </button>
                      <button
                        v-if="activeTab === 'sent'"
                        @click.stop="archiveNotification(notification._id)"
                        class="text-white/60 hover:text-white"
                      >
                        Archive
                      </button>
                      <button
                        @click.stop="deleteNotification(notification._id)"
                        class="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Selection Checkbox for Sent Tab -->
              <div v-if="activeTab === 'sent'" class="ml-4">
                <input
                  :value="notification._id"
                  v-model="selectedNotifications"
                  type="checkbox"
                  class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex items-center justify-between mt-8 pt-6 border-t border-white/10"
        >
          <div class="flex items-center space-x-2">
            <span class="text-sm text-white/60">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
              {{ Math.min(currentPage * itemsPerPage, totalItems) }} of
              {{ totalItems }} notifications
            </span>
          </div>

          <div class="flex items-center space-x-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="btn-ghost text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div class="flex items-center space-x-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-1 text-sm rounded-md transition-colors',
                  page === currentPage
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-white/60 hover:text-white hover:bg-white/10',
                ]"
              >
                {{ page }}
              </button>
            </div>

            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="btn-ghost text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useNotificationStore } from "~/stores/notification";
import { useChurchStore } from "~/stores/church";

const notificationStore = useNotificationStore();
const churchStore = useChurchStore();

const loading = computed(() => notificationStore.loading);
const notifications = computed(() => notificationStore.notifications);
const unreadCount = computed(() => notificationStore.unreadCount);
const currentChurch = computed(() => churchStore.currentChurch);

// State
const activeTab = ref("received");
const selectedNotifications = ref<string[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const filters = ref({
  type: "",
  priority: "",
});

// Computed properties
const tabs = computed(() => [
  { key: "received", label: "Received", count: unreadCount.value },
  { key: "sent", label: "Sent" },
]);

const filteredNotifications = computed(() => {
  let items = [...notifications.value];

  // Filter by tab
  if (activeTab.value === "received") {
    // For received notifications, show all (they will be filtered by recipient on backend)
  } else if (activeTab.value === "sent") {
    // For sent notifications, show notifications sent by current user
    // This would need to be filtered on the backend
  }

  // Apply filters
  if (filters.value.type) {
    items = items.filter((n) => n.type === filters.value.type);
  }

  if (filters.value.priority) {
    items = items.filter((n) => n.priority === filters.value.priority);
  }

  return items;
});

const totalItems = computed(() => filteredNotifications.value.length);
const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
);
const paginatedNotifications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredNotifications.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const stats = ref({
  unreadCount: 0,
  sentToday: 0,
  sentThisWeek: 0,
  totalSent: 0,
});

// Methods
const applyFilters = async () => {
  await notificationStore.fetchNotifications({
    type: filters.value.type || undefined,
    priority: filters.value.priority || undefined,
  });
  calculateStats();
};

const calculateStats = () => {
  const allNotifications = notificationStore.notifications;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  stats.value = {
    unreadCount: notificationStore.unreadCount,
    sentToday: allNotifications.filter((n) => new Date(n.sentAt) >= today)
      .length,
    sentThisWeek: allNotifications.filter((n) => new Date(n.sentAt) >= weekAgo)
      .length,
    totalSent: allNotifications.length,
  };
};

const handleNotificationClick = (notification: any) => {
  if (activeTab.value === "received" && !notification.read) {
    markAsRead(notification._id);
  }
  // Could navigate to notification detail or perform action
};

const markAsRead = async (notificationId: string) => {
  try {
    await notificationStore.markAsRead(notificationId);
    calculateStats();
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

const archiveNotification = async (notificationId: string) => {
  if (!confirm("Are you sure you want to archive this notification?")) return;

  try {
    await notificationStore.archiveNotification(notificationId);
    calculateStats();
  } catch (error) {
    console.error("Error archiving notification:", error);
  }
};

const deleteNotification = async (notificationId: string) => {
  if (
    !confirm(
      "Are you sure you want to delete this notification? This action cannot be undone."
    )
  )
    return;

  try {
    await notificationStore.deleteNotification(notificationId);
    calculateStats();
  } catch (error) {
    console.error("Error deleting notification:", error);
  }
};

const bulkArchive = async () => {
  if (selectedNotifications.value.length === 0) return;

  if (
    !confirm(
      `Are you sure you want to archive ${selectedNotifications.value.length} notifications?`
    )
  )
    return;

  try {
    await notificationStore.bulkArchive(selectedNotifications.value);
    selectedNotifications.value = [];
    calculateStats();
  } catch (error) {
    console.error("Error bulk archiving notifications:", error);
  }
};

const bulkDelete = async () => {
  if (selectedNotifications.value.length === 0) return;

  if (
    !confirm(
      `Are you sure you want to delete ${selectedNotifications.value.length} notifications? This action cannot be undone.`
    )
  )
    return;

  try {
    await notificationStore.bulkDelete(selectedNotifications.value);
    selectedNotifications.value = [];
    calculateStats();
  } catch (error) {
    console.error("Error bulk deleting notifications:", error);
  }
};

const clearSelection = () => {
  selectedNotifications.value = [];
};

const exportNotifications = () => {
  // TODO: Implement export functionality
  console.log("Exporting notifications:", notifications.value);
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const getTypeColor = (type: string) => {
  const colors = {
    info: "bg-blue-500/20 text-blue-400",
    success: "bg-emerald-500/20 text-emerald-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    error: "bg-red-500/20 text-red-400",
    announcement: "bg-purple-500/20 text-purple-400",
  };
  return colors[type as keyof typeof colors] || colors.info;
};

const getPriorityColor = (priority: string) => {
  const colors = {
    low: "bg-gray-500/20 text-gray-400",
    medium: "bg-blue-500/20 text-blue-400",
    high: "bg-orange-500/20 text-orange-400",
    urgent: "bg-red-500/20 text-red-400",
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};

const getRecipientText = (notification: any) => {
  switch (notification.recipientType) {
    case "user":
      return "Direct message";
    case "church":
      return "Church-wide";
    case "team":
      return "Team message";
    case "all":
      return "All users";
    default:
      return "Unknown";
  }
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Initialize
onMounted(async () => {
  await applyFilters();
});
</script>
