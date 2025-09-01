<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Welcome Header -->
    <div class="container-responsive py-8">
      <div class="glass-card p-8 mb-8 fade-in">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-4 mb-4">
              <div
                class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
              >
                <span class="text-2xl font-bold text-white">
                  {{ user?.name?.charAt(0)?.toUpperCase() }}
                </span>
              </div>
              <div>
                <h1 class="text-3xl font-bold gradient-text">
                  Welcome back, {{ user?.name }}!
                </h1>
                <p class="text-white/80 text-lg">
                  {{ getGreetingMessage() }}
                </p>
                <div class="flex items-center space-x-4 mt-2">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400"
                  >
                    {{ user?.role }}
                  </span>
                  <span class="text-white/60 text-sm">
                    {{ currentChurch?.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center space-x-3">
            <NuxtLink to="/members/create" class="btn-secondary">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Member
            </NuxtLink>
            <NuxtLink to="/donations" class="btn-primary">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              Record Donation
            </NuxtLink>
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

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Members -->
        <div class="stats-card bounce-in" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Total Members
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.totalMembers }}
              </p>
              <div class="flex items-center mt-2">
                <span class="text-emerald-400 text-sm"
                  >{{ stats.newMembersThisMonth }} new this month</span
                >
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

        <!-- Financial Overview -->
        <div class="stats-card bounce-in" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Monthly Net Income
              </p>
              <p class="text-3xl font-bold text-white">
                ₦{{ formatCurrency(stats.netIncome) }}
              </p>
              <div class="flex items-center mt-2">
                <span
                  :class="
                    stats.netIncome >= 0 ? 'text-emerald-400' : 'text-red-400'
                  "
                  class="text-sm"
                >
                  {{ stats.netIncome >= 0 ? "+" : ""
                  }}{{
                    Math.round(
                      (stats.netIncome / (stats.monthlyIncome || 1)) * 100
                    )
                  }}% from income
                </span>
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Pending Tasks -->
        <div class="stats-card bounce-in" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Pending Tasks
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.pendingTasks }}
              </p>
              <div class="flex items-center mt-2">
                <span class="text-yellow-400 text-sm"
                  >{{ stats.urgentTasks }} urgent</span
                >
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
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
                {{ stats.activeCampaigns }}
              </p>
              <div class="flex items-center mt-2">
                <span class="text-purple-400 text-sm"
                  >₦{{ formatCurrency(stats.campaignFundsRaised) }} raised</span
                >
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <NuxtLink
          to="/members"
          class="glass-card p-6 hover:glass-card-hover transition-all group"
        >
          <div class="flex items-center space-x-4">
            <div class="icon-container group-hover:bg-blue-500/20">
              <svg
                class="w-6 h-6 text-blue-400"
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
            <div>
              <h3 class="font-semibold text-white">Manage Members</h3>
              <p class="text-white/60 text-sm">Add, edit, and track members</p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/donations"
          class="glass-card p-6 hover:glass-card-hover transition-all group"
        >
          <div class="flex items-center space-x-4">
            <div class="icon-container group-hover:bg-emerald-500/20">
              <svg
                class="w-6 h-6 text-emerald-400"
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
            <div>
              <h3 class="font-semibold text-white">Record Donations</h3>
              <p class="text-white/60 text-sm">
                Track contributions and giving
              </p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/expenses"
          class="glass-card p-6 hover:glass-card-hover transition-all group"
        >
          <div class="flex items-center space-x-4">
            <div class="icon-container group-hover:bg-red-500/20">
              <svg
                class="w-6 h-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-white">Manage Expenses</h3>
              <p class="text-white/60 text-sm">Track and approve expenses</p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/volunteer-teams"
          class="glass-card p-6 hover:glass-card-hover transition-all group"
        >
          <div class="flex items-center space-x-4">
            <div class="icon-container group-hover:bg-purple-500/20">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-white">Volunteer Teams</h3>
              <p class="text-white/60 text-sm">Organize and manage teams</p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Activities & Tasks -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Pending Tasks -->
          <div v-if="pendingTasks.length > 0" class="glass-card p-6 slide-up">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold gradient-text">Pending Tasks</h2>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-400"
              >
                {{ pendingTasks.length }} items
              </span>
            </div>

            <div class="space-y-4">
              <div
                v-for="task in pendingTasks.slice(0, 5)"
                :key="task.id"
                class="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <div class="flex items-center space-x-4">
                  <div
                    class="icon-container w-10 h-10"
                    :class="getTaskIconClass(task.type)"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        v-if="task.type === 'expense'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                      <path
                        v-else-if="task.type === 'member'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                      <path
                        v-else
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-white">{{ task.title }}</h3>
                    <p class="text-white/60 text-sm">{{ task.description }}</p>
                  </div>
                </div>
                <NuxtLink :to="task.actionUrl" class="btn-primary text-sm">
                  {{ task.actionText }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Recent Activities -->
          <div class="glass-card p-6 slide-up">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold gradient-text">
                Recent Activities
              </h2>
              <NuxtLink to="/activities" class="btn-ghost text-sm"
                >View all</NuxtLink
              >
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
                :key="activity.id"
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
                        v-else-if="activity.type === 'expense'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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
                    {{ formatDate(activity.timestamp) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Quick Stats -->
          <div class="glass-card p-6 slide-up">
            <h2 class="text-xl font-bold gradient-text mb-6">This Month</h2>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-white/60">Income</span>
                <span class="text-emerald-400 font-semibold"
                  >₦{{ formatCurrency(stats.monthlyIncome) }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-white/60">Expenses</span>
                <span class="text-red-400 font-semibold"
                  >₦{{ formatCurrency(stats.monthlyExpenses) }}</span
                >
              </div>
              <div class="border-t border-white/10 pt-4">
                <div class="flex items-center justify-between">
                  <span class="text-white font-medium">Net</span>
                  <span
                    :class="
                      stats.netIncome >= 0 ? 'text-emerald-400' : 'text-red-400'
                    "
                    class="font-bold"
                  >
                    ₦{{ formatCurrency(stats.netIncome) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Donations -->
          <div class="glass-card p-6 slide-up">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold gradient-text">Recent Donations</h2>
              <NuxtLink to="/donations" class="btn-ghost text-sm"
                >View all</NuxtLink
              >
            </div>

            <div v-if="recentDonations.length === 0" class="text-center py-8">
              <p class="text-white/60 text-sm">No recent donations</p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="donation in recentDonations.slice(0, 5)"
                :key="donation.id"
                class="flex items-center justify-between p-3 rounded-lg bg-white/5"
              >
                <div>
                  <p class="text-white font-medium text-sm">
                    {{ donation.donorName }}
                  </p>
                  <p class="text-white/60 text-xs">{{ donation.category }}</p>
                </div>
                <span class="text-emerald-400 font-semibold text-sm">
                  ₦{{ formatCurrency(donation.amount) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Notifications -->
          <div class="glass-card p-6 slide-up">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold gradient-text">Notifications</h2>
              <NuxtLink to="/notifications" class="btn-ghost text-sm"
                >View all</NuxtLink
              >
            </div>

            <div
              v-if="recentNotifications.length === 0"
              class="text-center py-8"
            >
              <div class="icon-container w-12 h-12 mx-auto mb-3">
                <svg
                  class="w-6 h-6 text-white/60"
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
              <p class="text-white/60 text-sm">No notifications</p>
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="notification in recentNotifications.slice(0, 3)"
                :key="notification.id"
                class="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all"
                @click="handleNotificationClick(notification)"
              >
                <div class="flex-shrink-0 relative">
                  <div
                    class="icon-container w-8 h-8"
                    :class="
                      notification.read ? 'bg-white/5' : 'bg-purple-500/20'
                    "
                  >
                    <svg
                      class="w-4 h-4"
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
                    class="text-white font-medium text-sm"
                    :class="{ 'opacity-60': notification.read }"
                  >
                    {{ notification.title }}
                  </p>
                  <p class="text-white/60 text-xs mt-1">
                    {{ formatDate(notification.timestamp) }}
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
import { useHead } from "nuxt/app";
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useChurchStore } from "~/stores/church";
import { useMemberStore } from "~/stores/member";
import { useDonationStore } from "~/stores/donation";
import { useExpenseStore } from "~/stores/expense";
import { useNotificationStore } from "~/stores/notification";

definePageMeta({
  layout: "default",
});

useHead({
  title: "Dashboard - Church Management System",
});

const authStore = useAuthStore();
const churchStore = useChurchStore();
const memberStore = useMemberStore();
const donationStore = useDonationStore();
const expenseStore = useExpenseStore();
const notificationStore = useNotificationStore();

const selectedChurchId = ref(null);
const loading = ref(true);

// Enhanced statistics
const stats = ref({
  totalMembers: 0,
  newMembersThisMonth: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  netIncome: 0,
  pendingTasks: 0,
  urgentTasks: 0,
  activeCampaigns: 0,
  campaignFundsRaised: 0,
});

// Recent activities
const recentActivities = ref([
  {
    id: "1",
    type: "donation",
    description: "New donation of ₦50,000 received from John Doe",
    timestamp: new Date(),
  },
  {
    id: "2",
    type: "member",
    description: "New member Sarah Johnson joined the church",
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    type: "expense",
    description: "Office supplies expense approved for ₦25,000",
    timestamp: new Date(Date.now() - 172800000),
  },
]);

// Pending tasks
const pendingTasks = ref([
  {
    id: "1",
    type: "expense",
    title: "Approve Office Supplies Expense",
    description: "₦25,000 expense needs approval",
    actionUrl: "/expenses",
    actionText: "Review",
    urgent: true,
  },
  {
    id: "2",
    type: "member",
    title: "Welcome New Members",
    description: "3 new members joined this week",
    actionUrl: "/members",
    actionText: "View",
    urgent: false,
  },
]);

// Recent donations
const recentDonations = ref([
  {
    id: "1",
    donorName: "John Doe",
    amount: 50000,
    category: "Tithes",
  },
  {
    id: "2",
    donorName: "Jane Smith",
    amount: 25000,
    category: "Offerings",
  },
  {
    id: "3",
    donorName: "Anonymous",
    amount: 10000,
    category: "Donations",
  },
]);

// Recent notifications
const recentNotifications = ref([
  {
    id: "1",
    title: "New member registration",
    read: false,
    timestamp: new Date(),
  },
  {
    id: "2",
    title: "Expense approval required",
    read: true,
    timestamp: new Date(Date.now() - 3600000),
  },
]);

// Computed properties
const user = computed(() => authStore.user);
const churches = computed(() => churchStore.churches);
const currentChurch = computed(() => churchStore.currentChurch);

// Methods
const getGreetingMessage = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! Ready to start the day?";
  if (hour < 17) return "Good afternoon! How's your day going?";
  return "Good evening! Hope you had a productive day.";
};

const onChurchChange = async () => {
  if (selectedChurchId.value) {
    const church = churches.value.find((c) => c._id === selectedChurchId.value);
    if (church) {
      churchStore.setCurrentChurch(church);
      await fetchDashboardData();
    }
  }
};

const fetchDashboardData = async () => {
  if (!currentChurch.value) return;

  loading.value = true;
  try {
    // Fetch data from all stores in parallel
    const [
      memberData,
      donationData,
      expenseData,
      campaignData,
      notificationData,
    ] = await Promise.all([
      // Member data
      memberStore
        .fetchMembers(currentChurch.value._id)
        .catch(() => ({ members: [] })),
      // Donation data
      donationStore
        .fetchDonations(currentChurch.value._id)
        .catch(() => ({ donations: [] })),
      // Expense data
      expenseStore
        .fetchExpenses(currentChurch.value._id)
        .catch(() => ({ expenses: [] })),
      // Campaign data
      donationStore
        .fetchCampaigns(currentChurch.value._id)
        .catch(() => ({ campaigns: [] })),
      // Notification data
      notificationStore
        .fetchNotifications()
        .catch(() => ({ notifications: [] })),
    ]);

    // Process member statistics
    const members = memberStore.members;
    const totalMembers = members.filter((m) => m.isActive).length;
    const newMembersThisMonth = members.filter((m) => {
      const joinDate = new Date(m.membershipDate);
      const now = new Date();
      return (
        joinDate.getMonth() === now.getMonth() &&
        joinDate.getFullYear() === now.getFullYear()
      );
    }).length;

    // Process financial data
    const donations = donationStore.donations;
    const expenses = expenseStore.expenses;
    const campaigns = donationStore.campaigns;

    const monthlyIncome = donations
      .filter((d) => {
        const date = new Date(d.createdAt);
        const now = new Date();
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, d) => sum + d.amount, 0);

    const monthlyExpenses = expenses
      .filter((e) => {
        const date = new Date(e.createdAt);
        const now = new Date();
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, e) => sum + e.amount, 0);

    // Process pending tasks
    const pendingExpenses = expenses.filter(
      (e) => e.status === "pending"
    ).length;
    const urgentTasks = pendingExpenses; // For now, only expenses are urgent

    // Process campaign data
    const activeCampaigns = campaigns.filter(
      (c) => c.status === "active"
    ).length;
    const campaignFundsRaised = campaigns
      .filter((c) => c.status === "active")
      .reduce((sum, c) => sum + c.currentAmount, 0);

    // Update statistics
    stats.value = {
      totalMembers,
      newMembersThisMonth,
      monthlyIncome,
      monthlyExpenses,
      netIncome: monthlyIncome - monthlyExpenses,
      pendingTasks: pendingExpenses,
      urgentTasks,
      activeCampaigns,
      campaignFundsRaised,
    };

    // Update recent activities
    updateRecentActivities(donations, expenses, members);

    // Update recent donations
    recentDonations.value = donations.slice(0, 5).map((d) => ({
      id: d._id,
      donorName: d.donorName,
      amount: d.amount,
      category: d.categoryId, // This would need to be resolved to category name
    }));
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Set default values
    stats.value = {
      totalMembers: 0,
      newMembersThisMonth: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
      netIncome: 0,
      pendingTasks: 0,
      urgentTasks: 0,
      activeCampaigns: 0,
      campaignFundsRaised: 0,
    };
  } finally {
    loading.value = false;
  }
};

const updateRecentActivities = (
  donations: any[],
  expenses: any[],
  members: any[]
) => {
  const activities = [];

  // Add recent donations
  donations.slice(0, 3).forEach((donation) => {
    activities.push({
      id: `donation-${donation._id}`,
      type: "donation",
      description: `New donation of ₦${formatCurrency(donation.amount)} received from ${donation.donorName}`,
      timestamp: new Date(donation.createdAt),
    });
  });

  // Add recent expenses
  expenses.slice(0, 2).forEach((expense) => {
    activities.push({
      id: `expense-${expense._id}`,
      type: "expense",
      description: `${expense.title} expense ${expense.status === "pending" ? "submitted" : "approved"} for ₦${formatCurrency(expense.amount)}`,
      timestamp: new Date(expense.createdAt),
    });
  });

  // Add recent members
  members.slice(0, 2).forEach((member) => {
    activities.push({
      id: `member-${member._id}`,
      type: "member",
      description: `New member ${member.firstName} ${member.lastName} joined the church`,
      timestamp: new Date(member.membershipDate),
    });
  });

  // Sort by timestamp and take most recent
  recentActivities.value = activities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 6);
};

const getActivityIconClass = (type: string) => {
  switch (type) {
    case "donation":
      return "bg-gradient-to-br from-emerald-500/20 to-teal-500/20";
    case "member":
      return "bg-gradient-to-br from-blue-500/20 to-indigo-500/20";
    case "expense":
      return "bg-gradient-to-br from-red-500/20 to-pink-500/20";
    case "campaign":
      return "bg-gradient-to-br from-purple-500/20 to-pink-500/20";
    default:
      return "bg-gradient-to-br from-slate-500/20 to-slate-600/20";
  }
};

const getTaskIconClass = (type: string) => {
  switch (type) {
    case "expense":
      return "bg-gradient-to-br from-red-500/20 to-pink-500/20";
    case "member":
      return "bg-gradient-to-br from-blue-500/20 to-indigo-500/20";
    default:
      return "bg-gradient-to-br from-slate-500/20 to-slate-600/20";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const handleNotificationClick = (notification: any) => {
  if (!notification.read) {
    // Mark as read
    notification.read = true;
  }
  // Navigate to notification details or perform action
};

// Initialize data
onMounted(async () => {
  await fetchDashboardData();
});
</script>
