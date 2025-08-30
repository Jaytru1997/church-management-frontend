<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Page Header -->
    <div class="container-responsive py-8">
      <div class="glass-card p-8 mb-8 fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
            <p class="text-white/80 text-lg">
              Welcome back, {{ user?.name }}! Here's what's happening with your
              church.
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

      <!-- Church Selection (if multiple churches) -->
      <div v-if="churches.length > 1" class="glass-card p-6 mb-8 slide-up">
        <label for="church-select" class="form-label">Select Church</label>
        <select
          id="church-select"
          v-model="selectedChurchId"
          @change="onChurchChange"
          class="form-input max-w-xs"
        >
          <option
            v-for="church in churches"
            :key="church._id"
            :value="church._id"
          >
            {{ church.name }}
          </option>
        </select>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Members -->
        <div class="stats-card bounce-in" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Total Members
              </p>
              <p class="text-3xl font-bold text-white">
                {{ statistics.totalMembers || 0 }}
              </p>
              <div class="flex items-center mt-2">
                <svg
                  class="w-4 h-4 text-emerald-400 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span class="text-emerald-400 text-sm">+12% this month</span>
              </div>
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Today's Attendance -->
        <div class="stats-card bounce-in" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Today's Attendance
              </p>
              <p class="text-3xl font-bold text-white">
                {{ statistics.todayAttendance || 0 }}
              </p>
              <div class="flex items-center mt-2">
                <svg
                  class="w-4 h-4 text-emerald-400 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span class="text-emerald-400 text-sm">+8% vs last week</span>
              </div>
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Monthly Donations -->
        <div class="stats-card bounce-in" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Monthly Donations
              </p>
              <p class="text-3xl font-bold text-white">
                ₦{{ formatCurrency(statistics.monthlyDonations || 0) }}
              </p>
              <div class="flex items-center mt-2">
                <svg
                  class="w-4 h-4 text-emerald-400 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span class="text-emerald-400 text-sm">+15% this month</span>
              </div>
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Active Campaigns -->
        <div class="stats-card bounce-in" style="animation-delay: 0.4s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Active Campaigns
              </p>
              <p class="text-3xl font-bold text-white">
                {{ statistics.activeCampaigns || 0 }}
              </p>
              <div class="flex items-center mt-2">
                <svg
                  class="w-4 h-4 text-yellow-400 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="text-yellow-400 text-sm">2 ending soon</span>
              </div>
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Activities -->
        <div class="lg:col-span-2">
          <div class="glass-card p-6 slide-up">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold gradient-text">
                Recent Activities
              </h2>
              <button class="btn-ghost text-sm">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View all
              </button>
            </div>

            <div v-if="loading" class="flex items-center justify-center py-12">
              <div class="loading-spinner w-12 h-12"></div>
            </div>

            <div
              v-else-if="recentActivities.length === 0"
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
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p class="text-white/60">No recent activities</p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="(activity, index) in recentActivities"
                :key="activity._id"
                class="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                :style="{ animationDelay: `${0.1 * index}s` }"
              >
                <div class="flex-shrink-0">
                  <div
                    class="icon-container w-12 h-12"
                    :class="getActivityIconClass(activity.type)"
                  >
                    <svg
                      class="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        v-if="activity.type === 'donation'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                      <path
                        v-else-if="activity.type === 'member'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                      <path
                        v-else
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-white font-medium">
                    {{ activity.description }}
                  </p>
                  <p class="text-white/60 text-sm mt-1">
                    {{ formatDate(activity.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Notifications -->
        <div>
          <div class="glass-card p-6 slide-up">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold gradient-text">Notifications</h2>
              <button class="btn-ghost text-sm">
                <svg
                  class="w-4 h-4 mr-2"
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
                View all
              </button>
            </div>

            <div
              v-if="recentNotifications.length === 0"
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
              <p class="text-white/60">No notifications</p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="(notification, index) in recentNotifications"
                :key="notification._id"
                class="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300"
                @click="markAsRead(notification._id)"
                :style="{ animationDelay: `${0.1 * index}s` }"
              >
                <div class="flex-shrink-0 relative">
                  <div
                    class="icon-container w-12 h-12"
                    :class="
                      notification.read
                        ? 'bg-white/5'
                        : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                    "
                  >
                    <svg
                      class="w-6 h-6"
                      :class="
                        notification.read ? 'text-white/60' : 'text-purple-400'
                      "
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
                  <div
                    v-if="!notification.read"
                    class="notification-badge"
                  ></div>
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-white font-medium"
                    :class="{ 'opacity-60': notification.read }"
                  >
                    {{ notification.title }}
                  </p>
                  <p class="text-white/60 text-sm mt-1">
                    {{ formatDate(notification.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useHead({
  title: "Dashboard - Church Management System",
});

const authStore = useAuthStore();
const churchStore = useChurchStore();

const selectedChurchId = ref(null);
const loading = ref(false);

const statistics = ref({
  totalMembers: 0,
  todayAttendance: 0,
  monthlyDonations: 0,
  activeCampaigns: 0,
});

const recentActivities = ref([]);

// Computed properties
const user = computed(() => authStore.user);
const churches = computed(() => churchStore.churches);
const currentChurch = computed(() => churchStore.currentChurch);
const notifications = computed(() => []); // Placeholder - would come from notification store
const recentNotifications = computed(() => notifications.value.slice(0, 5));

// Methods
const onChurchChange = async () => {
  if (selectedChurchId.value) {
    const church = churches.value.find((c) => c._id === selectedChurchId.value);
    if (church) {
      churchStore.setCurrentChurch(church);
      await fetchChurchData();
    }
  }
};

const fetchChurchData = async () => {
  if (!currentChurch.value) return;

  loading.value = true;
  try {
    // Fetch dashboard statistics
    await fetchDashboardStats();

    // Fetch recent activities
    await fetchRecentActivities();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    loading.value = false;
  }
};

const fetchDashboardStats = async () => {
  try {
    // This would be replaced with actual API calls
    statistics.value = {
      totalMembers: 1250,
      todayAttendance: 342,
      monthlyDonations: 2500000,
      activeCampaigns: 3,
    };
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};

const fetchRecentActivities = async () => {
  try {
    // This would be replaced with actual API calls
    recentActivities.value = [
      {
        _id: "1",
        type: "donation",
        description: "New donation of ₦50,000 received from John Doe",
        createdAt: new Date(),
      },
      {
        _id: "2",
        type: "member",
        description: "New member Sarah Johnson joined the church",
        createdAt: new Date(Date.now() - 86400000),
      },
      {
        _id: "3",
        type: "campaign",
        description: "Building fund campaign reached 75% of target",
        createdAt: new Date(Date.now() - 172800000),
      },
    ];
  } catch (error) {
    console.error("Error fetching recent activities:", error);
  }
};

const getActivityIconClass = (type: string) => {
  switch (type) {
    case "donation":
      return "bg-gradient-to-br from-emerald-500/20 to-teal-500/20";
    case "member":
      return "bg-gradient-to-br from-blue-500/20 to-indigo-500/20";
    case "campaign":
      return "bg-gradient-to-br from-purple-500/20 to-pink-500/20";
    default:
      return "bg-gradient-to-br from-slate-500/20 to-slate-600/20";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG").format(amount);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const markAsRead = (notificationId: string) => {
  // This would call the notification store action
  console.log("Marking notification as read:", notificationId);
};

// Initialize data
onMounted(async () => {
  await fetchChurchData();
});
</script>
