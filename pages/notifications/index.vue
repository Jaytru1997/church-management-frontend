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
              Stay updated with church announcements, reminders, and important
              messages.
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="markAllAsRead"
              class="btn-ghost"
              :disabled="unreadCount === 0"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                />
              </svg>
              Mark All Read
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
              <p class="text-white/60 text-sm font-medium mb-1">
                Total Notifications
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.totalNotifications }}
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
                  d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Unread</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.unreadCount }}
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

        <div class="stats-card bounce-in" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">This Week</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.thisWeekCount }}
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Urgent</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.urgentCount }}
              </p>
            </div>
            <div class="icon-container">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="glass-card p-6 mb-8 slide-up">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search notifications..."
                class="form-input pl-10"
              />
              <svg
                class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              v-model="statusFilter"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="archived">Archived</option>
            </select>
            <select
              v-model="typeFilter"
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
          </div>

          <div class="flex items-center space-x-2">
            <button @click="refreshNotifications" class="btn-ghost">
              <svg
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Bulk Actions -->
        <div
          v-if="selectedNotifications.length > 0"
          class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg"
        >
          <span class="text-sm text-white/60"
            >{{ selectedNotifications.length }} selected</span
          >
          <button @click="bulkMarkAsRead" class="btn-ghost text-sm">
            Mark as Read
          </button>
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
        <div
          v-for="notification in filteredNotifications"
          :key="notification.id"
          class="glass-card p-6 hover:glass-card-hover transition-all cursor-pointer"
          @click="handleNotificationClick(notification)"
        >
          <div class="flex items-start space-x-4">
            <!-- Notification Icon -->
            <div class="flex-shrink-0">
              <div
                class="icon-container w-12 h-12"
                :class="getNotificationIconClass(notification)"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="notification.type === 'info'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    v-else-if="notification.type === 'success'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                  />
                  <path
                    v-else-if="notification.type === 'warning'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                  <path
                    v-else-if="notification.type === 'error'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
            </div>

            <!-- Notification Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3
                      class="text-lg font-semibold text-white"
                      :class="{ 'opacity-60': notification.read }"
                    >
                      {{ notification.title }}
                    </h3>
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getPriorityColor(notification.priority),
                      ]"
                    >
                      {{ capitalize(notification.priority) }}
                    </span>
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getTypeColor(notification.type),
                      ]"
                    >
                      {{ capitalize(notification.type) }}
                    </span>
                  </div>

                  <p
                    class="text-white/70 mb-3"
                    :class="{ 'opacity-60': notification.read }"
                  >
                    {{ notification.message }}
                  </p>

                  <div
                    class="flex items-center space-x-4 text-sm text-white/60"
                  >
                    <span>From: {{ notification.senderName }}</span>
                    <span>{{ formatDate(notification.sentAt) }}</span>
                    <span>{{ notification.recipientType }}</span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center space-x-2 ml-4">
                  <div
                    v-if="!notification.read"
                    class="notification-badge"
                  ></div>
                  <button
                    @click.stop="toggleReadStatus(notification)"
                    class="btn-ghost text-sm"
                  >
                    {{ notification.read ? "Mark Unread" : "Mark Read" }}
                  </button>
                  <button
                    @click.stop="archiveNotification(notification)"
                    class="btn-ghost text-sm"
                  >
                    Archive
                  </button>
                  <button
                    @click.stop="deleteNotification(notification)"
                    class="btn-ghost text-sm text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <!-- Action Button (if available) -->
              <div
                v-if="notification.actionUrl && notification.actionText"
                class="mt-4"
              >
                <NuxtLink
                  :to="notification.actionUrl"
                  class="btn-primary text-sm inline-flex items-center"
                >
                  {{ notification.actionText }}
                  <svg
                    class="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredNotifications.length === 0"
          class="glass-card p-12 text-center"
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
            No notifications found
          </h3>
          <p class="text-white/60">
            {{
              searchQuery || statusFilter || typeFilter
                ? "Try adjusting your filters"
                : "You're all caught up!"
            }}
          </p>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="text-center mt-8">
        <button @click="loadMore" class="btn-secondary" :disabled="loading">
          <span v-if="loading" class="flex items-center">
            <div class="loading-spinner w-4 h-4 mr-2"></div>
            Loading...
          </span>
          <span v-else>Load More</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useNotificationStore } from "~/stores/notification";
import { useAuthStore } from "~/stores/auth";

const notificationStore = useNotificationStore();
const authStore = useAuthStore();

const loading = computed(() => notificationStore.loading);
const notifications = computed(() => notificationStore.notifications);
const unreadCount = computed(() => notificationStore.unreadCount);

// State
const searchQuery = ref("");
const statusFilter = ref("");
const typeFilter = ref("");
const selectedNotifications = ref<string[]>([]);
const hasMore = ref(false);

const stats = ref({
  totalNotifications: 0,
  unreadCount: 0,
  thisWeekCount: 0,
  urgentCount: 0,
});

// Mock data for notifications
const mockNotifications = ref([
  {
    id: "1",
    title: "Welcome to Church Management System",
    message:
      "Thank you for joining our church management platform. Get started by exploring the dashboard and managing your church data.",
    type: "info",
    priority: "low",
    senderName: "System",
    sentAt: new Date(),
    read: false,
    archived: false,
    recipientType: "user",
    actionUrl: "/dashboard",
    actionText: "Explore Dashboard",
  },
  {
    id: "2",
    title: "New Member Registration",
    message:
      "Sarah Johnson has joined the church. Please welcome her to the congregation.",
    type: "success",
    priority: "medium",
    senderName: "Membership Team",
    sentAt: new Date(Date.now() - 3600000),
    read: false,
    archived: false,
    recipientType: "church",
  },
  {
    id: "3",
    title: "Expense Approval Required",
    message:
      "A new expense of ₦25,000 for office supplies requires your approval.",
    type: "warning",
    priority: "high",
    senderName: "Finance Team",
    sentAt: new Date(Date.now() - 7200000),
    read: true,
    archived: false,
    recipientType: "admin",
    actionUrl: "/expenses",
    actionText: "Review Expense",
  },
  {
    id: "4",
    title: "Sunday Service Reminder",
    message:
      "Don't forget Sunday service starts at 10:00 AM. We look forward to seeing you there!",
    type: "announcement",
    priority: "medium",
    senderName: "Pastoral Team",
    sentAt: new Date(Date.now() - 86400000),
    read: true,
    archived: false,
    recipientType: "church",
  },
  {
    id: "5",
    title: "Building Fund Campaign Update",
    message:
      "Great news! Our building fund campaign has reached 75% of its target. Thank you for your generous contributions.",
    type: "success",
    priority: "low",
    senderName: "Finance Team",
    sentAt: new Date(Date.now() - 172800000),
    read: true,
    archived: false,
    recipientType: "church",
  },
]);

// Computed
const filteredNotifications = computed(() => {
  let filtered = mockNotifications.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (notification) =>
        notification.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  if (statusFilter.value) {
    if (statusFilter.value === "unread") {
      filtered = filtered.filter((notification) => !notification.read);
    } else if (statusFilter.value === "read") {
      filtered = filtered.filter(
        (notification) => notification.read && !notification.archived
      );
    } else if (statusFilter.value === "archived") {
      filtered = filtered.filter((notification) => notification.archived);
    }
  }

  if (typeFilter.value) {
    filtered = filtered.filter(
      (notification) => notification.type === typeFilter.value
    );
  }

  // Sort by date (newest first)
  filtered.sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );

  return filtered;
});

// Methods
const applyFilters = () => {
  // Filters are applied reactively through computed properties
};

const getNotificationIconClass = (notification: any) => {
  const colors = {
    info: "bg-blue-500/20",
    success: "bg-emerald-500/20",
    warning: "bg-yellow-500/20",
    error: "bg-red-500/20",
    announcement: "bg-purple-500/20",
  };
  return colors[notification.type as keyof typeof colors] || colors.info;
};

const getPriorityColor = (priority: string) => {
  const colors = {
    low: "bg-gray-500/20 text-gray-400",
    medium: "bg-blue-500/20 text-blue-400",
    high: "bg-orange-500/20 text-orange-400",
    urgent: "bg-red-500/20 text-red-400",
  };
  return colors[priority as keyof typeof colors] || colors.low;
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

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const handleNotificationClick = (notification: any) => {
  if (!notification.read) {
    toggleReadStatus(notification);
  }

  // If there's an action URL, navigate there
  if (notification.actionUrl) {
    // In a real app, this would navigate to the action URL
    console.log("Navigate to:", notification.actionUrl);
  }
};

const toggleReadStatus = (notification: any) => {
  notification.read = !notification.read;
  // In a real app, this would call the API
  console.log("Toggle read status for:", notification.id);
};

const archiveNotification = (notification: any) => {
  notification.archived = true;
  // In a real app, this would call the API
  console.log("Archive notification:", notification.id);
};

const deleteNotification = (notification: any) => {
  if (!confirm("Are you sure you want to delete this notification?")) return;

  const index = mockNotifications.value.findIndex(
    (n) => n.id === notification.id
  );
  if (index !== -1) {
    mockNotifications.value.splice(index, 1);
  }

  console.log("Delete notification:", notification.id);
};

const markAllAsRead = () => {
  mockNotifications.value.forEach((notification) => {
    notification.read = true;
  });
  console.log("Mark all notifications as read");
};

const bulkMarkAsRead = () => {
  selectedNotifications.value.forEach((id) => {
    const notification = mockNotifications.value.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
  });
  selectedNotifications.value = [];
  console.log("Bulk mark as read:", selectedNotifications.value);
};

const bulkArchive = () => {
  selectedNotifications.value.forEach((id) => {
    const notification = mockNotifications.value.find((n) => n.id === id);
    if (notification) {
      notification.archived = true;
    }
  });
  selectedNotifications.value = [];
  console.log("Bulk archive:", selectedNotifications.value);
};

const bulkDelete = () => {
  if (
    !confirm(
      `Are you sure you want to delete ${selectedNotifications.value.length} notifications?`
    )
  )
    return;

  selectedNotifications.value.forEach((id) => {
    const index = mockNotifications.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      mockNotifications.value.splice(index, 1);
    }
  });

  selectedNotifications.value = [];
  console.log("Bulk delete:", selectedNotifications.value);
};

const clearSelection = () => {
  selectedNotifications.value = [];
};

const refreshNotifications = () => {
  console.log("Refresh notifications");
};

const loadMore = () => {
  console.log("Load more notifications");
};

const calculateStats = () => {
  const totalNotifications = mockNotifications.value.length;
  const unreadCount = mockNotifications.value.filter((n) => !n.read).length;
  const thisWeekCount = mockNotifications.value.filter((n) => {
    const notificationDate = new Date(n.sentAt);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return notificationDate >= weekAgo;
  }).length;
  const urgentCount = mockNotifications.value.filter(
    (n) => n.priority === "urgent"
  ).length;

  stats.value = {
    totalNotifications,
    unreadCount,
    thisWeekCount,
    urgentCount,
  };
};

// Initialize
onMounted(async () => {
  calculateStats();
});
</script>
