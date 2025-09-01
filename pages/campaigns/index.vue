<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Page Header -->
    <div class="container-responsive py-8">
      <div class="glass-card p-8 mb-8 fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold gradient-text mb-2">Campaigns</h1>
            <p class="text-white/80 text-lg">
              Manage fundraising campaigns and special projects.
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="exportCampaigns" class="btn-ghost">
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
            <NuxtLink to="/campaigns/create" class="btn-primary">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Campaign
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
                Total Campaigns
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.totalCampaigns || 0 }}
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Active Campaigns
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.activeCampaigns || 0 }}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Total Raised</p>
              <p class="text-3xl font-bold text-white">
                ₦{{ formatCurrency(stats.totalRaised || 0) }}
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Avg. Completion
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.avgCompletion || 0 }}%
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="glass-card p-6 mb-8 slide-up">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="form-label">Status</label>
            <select
              v-model="filters.status"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Campaigns</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="form-label">Sort By</label>
            <select
              v-model="filters.sortBy"
              @change="applyFilters"
              class="form-input"
            >
              <option value="createdAt">Date Created</option>
              <option value="endDate">End Date</option>
              <option value="currentAmount">Amount Raised</option>
              <option value="progress">Progress</option>
            </select>
          </div>
          <div>
            <label class="form-label">Search</label>
            <input
              v-model="filters.search"
              type="text"
              @input="applyFilters"
              class="form-input"
              placeholder="Search campaigns..."
            />
          </div>
          <div>
            <label class="form-label">Time Frame</label>
            <select
              v-model="filters.timeFrame"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Time</option>
              <option value="this_month">This Month</option>
              <option value="this_year">This Year</option>
              <option value="last_30_days">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Campaigns Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Create New Campaign Card -->
        <div
          class="glass-card p-6 hover:glass-card-hover transition-all cursor-pointer group"
          @click="$router.push('/campaigns/create')"
        >
          <div
            class="flex flex-col items-center justify-center h-64 text-center"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            >
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">
              Create Campaign
            </h3>
            <p class="text-white/60">Start a new fundraising campaign</p>
          </div>
        </div>

        <!-- Campaign Cards -->
        <div
          v-for="campaign in campaigns"
          :key="campaign._id"
          class="glass-card p-6 hover:glass-card-hover transition-all cursor-pointer group"
          @click="$router.push(`/campaigns/${campaign._id}`)"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3
                class="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors"
              >
                {{ campaign.name }}
              </h3>
              <p class="text-white/60 text-sm line-clamp-2">
                {{ campaign.description }}
              </p>
            </div>
            <div class="ml-4">
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  campaign.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : campaign.status === 'completed'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-red-500/20 text-red-400',
                ]"
              >
                {{ capitalize(campaign.status) }}
              </span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-white/60">Progress</span>
              <span class="text-sm text-white/80">
                ₦{{ formatCurrency(campaign.currentAmount || 0) }} / ₦{{
                  formatCurrency(campaign.targetAmount)
                }}
              </span>
            </div>
            <div class="w-full bg-white/10 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                :style="{
                  width: `${Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100)}%`,
                }"
              ></div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <span class="text-sm text-white/60">
                {{
                  Math.round(
                    (campaign.currentAmount / campaign.targetAmount) * 100
                  )
                }}% funded
              </span>
              <span class="text-sm text-white/60">
                {{ daysUntilEnd(campaign.endDate) }} days left
              </span>
            </div>
          </div>

          <!-- Campaign Dates -->
          <div class="flex items-center justify-between text-sm text-white/60">
            <span>Started: {{ formatDate(campaign.startDate) }}</span>
            <span>Ends: {{ formatDate(campaign.endDate) }}</span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="loading-spinner w-12 h-12"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="campaigns.length === 0" class="text-center py-12">
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">
          No Campaigns Found
        </h3>
        <p class="text-white/60 mb-6">
          Get started by creating your first fundraising campaign.
        </p>
        <NuxtLink to="/campaigns/create" class="btn-primary">
          Create Your First Campaign
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useDonationStore } from "~/stores/donation";
import { useChurchStore } from "~/stores/church";

const donationStore = useDonationStore();
const churchStore = useChurchStore();

const loading = computed(() => donationStore.loading);
const campaigns = computed(() => donationStore.campaigns);
const currentChurch = computed(() => churchStore.currentChurch);

// Filters and state
const filters = ref({
  status: "",
  sortBy: "createdAt",
  search: "",
  timeFrame: "",
});

const stats = ref({
  totalCampaigns: 0,
  activeCampaigns: 0,
  totalRaised: 0,
  avgCompletion: 0,
});

// Methods
const applyFilters = async () => {
  if (!currentChurch.value) return;

  try {
    await donationStore.fetchCampaigns(currentChurch.value._id);
    calculateStats();
  } catch (error) {
    console.error("Error applying filters:", error);
  }
};

const calculateStats = () => {
  const allCampaigns = donationStore.campaigns;
  const activeCampaigns = allCampaigns.filter((c) => c.status === "active");
  const totalRaised = allCampaigns.reduce(
    (sum, c) => sum + (c.currentAmount || 0),
    0
  );
  const avgCompletion =
    allCampaigns.length > 0
      ? Math.round(
          allCampaigns.reduce(
            (sum, c) => sum + ((c.currentAmount || 0) / c.targetAmount) * 100,
            0
          ) / allCampaigns.length
        )
      : 0;

  stats.value = {
    totalCampaigns: allCampaigns.length,
    activeCampaigns: activeCampaigns.length,
    totalRaised,
    avgCompletion,
  };
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const daysUntilEnd = (endDate: string) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const exportCampaigns = () => {
  // TODO: Implement export functionality
  console.log("Exporting campaigns:", campaigns.value);
};

// Initialize
onMounted(async () => {
  if (currentChurch.value) {
    await applyFilters();
  }
});
</script>
