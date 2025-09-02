<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Page Header -->
    <div class="container-responsive py-8">
      <div class="glass-card p-8 mb-8 fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold gradient-text mb-2">
              Fundraising Campaigns
            </h1>
            <p class="text-white/80 text-lg">
              Create and manage church fundraising campaigns and track progress.
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
                {{ stats.totalCampaigns }}
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
                {{ stats.activeCampaigns }}
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
                ₦{{ formatCurrency(stats.totalRaised) }}
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
                {{ stats.averageCompletion }}%
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

      <!-- Filters and Search -->
      <div class="glass-card p-6 mb-8 slide-up">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search campaigns..."
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
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select v-model="sortBy" @change="applyFilters" class="form-input">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-funded">Most Funded</option>
              <option value="ending-soon">Ending Soon</option>
            </select>
          </div>

          <div class="flex items-center space-x-2">
            <button
              @click="toggleView('grid')"
              :class="[
                'btn-ghost',
                viewMode === 'grid' ? 'bg-purple-500/20' : '',
              ]"
            >
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              @click="toggleView('list')"
              :class="[
                'btn-ghost',
                viewMode === 'list' ? 'bg-purple-500/20' : '',
              ]"
            >
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Bulk Actions -->
        <div
          v-if="selectedCampaigns.length > 0"
          class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg"
        >
          <span class="text-sm text-white/60"
            >{{ selectedCampaigns.length }} selected</span
          >
          <button @click="bulkPause" class="btn-ghost text-sm">Pause</button>
          <button @click="bulkResume" class="btn-ghost text-sm">Resume</button>
          <button @click="bulkDelete" class="btn-ghost text-sm">Delete</button>
          <button
            @click="clearSelection"
            class="text-white/60 hover:text-white text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- Campaigns Grid/List View -->
      <div
        v-if="viewMode === 'grid'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="campaign in filteredCampaigns"
          :key="campaign.id"
          class="glass-card p-6 hover:glass-card-hover transition-all cursor-pointer"
          @click="viewCampaign(campaign.id)"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-white mb-2">
                {{ campaign.name }}
              </h3>
              <p class="text-white/70 text-sm mb-3 line-clamp-2">
                {{ campaign.description }}
              </p>
            </div>
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                getStatusColor(campaign.status),
              ]"
            >
              {{ capitalize(campaign.status) }}
            </span>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-white/60">Progress</span>
              <span class="text-sm text-white"
                >{{ Math.round(campaign.progress) }}%</span
              >
            </div>
            <div class="w-full bg-white/10 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all duration-300"
                :class="getProgressColor(campaign.progress)"
                :style="{ width: `${campaign.progress}%` }"
              ></div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span class="text-white/60 text-sm">Raised</span>
              <p class="text-white font-semibold">
                ₦{{ formatCurrency(campaign.currentAmount) }}
              </p>
            </div>
            <div>
              <span class="text-white/60 text-sm">Target</span>
              <p class="text-white font-semibold">
                ₦{{ formatCurrency(campaign.targetAmount) }}
              </p>
            </div>
          </div>

          <div
            class="flex items-center justify-between text-sm text-white/60 mb-4"
          >
            <span>{{ formatDate(campaign.startDate) }}</span>
            <span>{{ formatDate(campaign.endDate) }}</span>
          </div>

          <div class="flex items-center space-x-2">
            <button
              @click.stop="editCampaign(campaign.id)"
              class="btn-secondary text-sm flex-1"
            >
              Edit
            </button>
            <button
              @click.stop="viewDonations(campaign.id)"
              class="btn-ghost text-sm flex-1"
            >
              Donations
            </button>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="glass-card p-6 slide-up">
        <DataTable
          title="Fundraising Campaigns"
          :items="filteredCampaigns"
          :columns="columns"
          :actions="actions"
          :loading="loading"
          empty-message="No campaigns found"
          @action="handleAction"
        >
          <template #column-status="{ item }">
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                getStatusColor(item.status),
              ]"
            >
              {{ capitalize(item.status) }}
            </span>
          </template>

          <template #column-progress="{ item }">
            <div class="flex items-center space-x-2">
              <div class="w-16 bg-white/10 rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all duration-300"
                  :class="getProgressColor(item.progress)"
                  :style="{ width: `${item.progress}%` }"
                ></div>
              </div>
              <span class="text-white text-sm"
                >{{ Math.round(item.progress) }}%</span
              >
            </div>
          </template>

          <template #column-raised="{ item }">
            <span class="text-white"
              >₦{{ formatCurrency(item.currentAmount) }}</span
            >
          </template>

          <template #column-target="{ item }">
            <span class="text-white"
              >₦{{ formatCurrency(item.targetAmount) }}</span
            >
          </template>
        </DataTable>
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

// State
const searchQuery = ref("");
const statusFilter = ref("");
const sortBy = ref("newest");
const viewMode = ref("grid");
const selectedCampaigns = ref<string[]>([]);

const stats = ref({
  totalCampaigns: 0,
  activeCampaigns: 0,
  totalRaised: 0,
  averageCompletion: 0,
});

// Mock data for campaigns
const mockCampaigns = ref([
  {
    id: "1",
    name: "Building Fund Campaign",
    description: "Help us build a new sanctuary for our growing congregation",
    status: "active",
    targetAmount: 5000000,
    currentAmount: 3250000,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    progress: 65,
  },
  {
    id: "2",
    name: "Mission Trip to Africa",
    description:
      "Support our mission team in spreading the gospel across Africa",
    status: "active",
    targetAmount: 2000000,
    currentAmount: 1850000,
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-08-31"),
    progress: 92.5,
  },
  {
    id: "3",
    name: "Children's Ministry Expansion",
    description: "Expand our children's programs and facilities",
    status: "completed",
    targetAmount: 1500000,
    currentAmount: 1500000,
    startDate: new Date("2023-09-01"),
    endDate: new Date("2024-02-28"),
    progress: 100,
  },
  {
    id: "4",
    name: "Youth Conference 2024",
    description:
      "Annual youth conference bringing together young people from across the region",
    status: "active",
    targetAmount: 800000,
    currentAmount: 320000,
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-07-31"),
    progress: 40,
  },
]);

// Computed
const filteredCampaigns = computed(() => {
  let filtered = mockCampaigns.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        campaign.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  if (statusFilter.value) {
    filtered = filtered.filter(
      (campaign) => campaign.status === statusFilter.value
    );
  }

  // Sort campaigns
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case "oldest":
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      case "most-funded":
        return b.currentAmount - a.currentAmount;
      case "ending-soon":
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      default: // newest
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
    }
  });

  return filtered;
});

// Methods
const applyFilters = () => {
  // Filters are applied reactively through computed properties
};

const toggleView = (mode: string) => {
  viewMode.value = mode;
};

const viewCampaign = (campaignId: string) => {
  // Navigate to campaign detail page
  console.log("View campaign:", campaignId);
};

const editCampaign = (campaignId: string) => {
  // Navigate to edit form
  console.log("Edit campaign:", campaignId);
};

const viewDonations = (campaignId: string) => {
  // Navigate to donations for this campaign
  console.log("View donations for campaign:", campaignId);
};

const getStatusColor = (status: string) => {
  const colors = {
    active: "bg-emerald-500/20 text-emerald-400",
    completed: "bg-blue-500/20 text-blue-400",
    cancelled: "bg-red-500/20 text-red-400",
  };
  return colors[status as keyof typeof colors] || colors.active;
};

const getProgressColor = (progress: number) => {
  if (progress >= 100) return "bg-blue-500";
  if (progress >= 75) return "bg-emerald-500";
  if (progress >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const bulkPause = () => {
  console.log("Bulk pause campaigns:", selectedCampaigns.value);
  selectedCampaigns.value = [];
};

const bulkResume = () => {
  console.log("Bulk resume campaigns:", selectedCampaigns.value);
  selectedCampaigns.value = [];
};

const bulkDelete = () => {
  if (
    !confirm(
      `Are you sure you want to delete ${selectedCampaigns.value.length} campaigns?`
    )
  )
    return;
  console.log("Bulk delete campaigns:", selectedCampaigns.value);
  selectedCampaigns.value = [];
};

const clearSelection = () => {
  selectedCampaigns.value = [];
};

const exportCampaigns = () => {
  console.log("Exporting campaigns:", campaigns.value);
};

const handleAction = (action: any, item: any) => {
  // This will be handled by the individual action handlers
};

// Table configuration
const columns = [
  { key: "name", label: "Campaign Name", sortable: true },
  { key: "description", label: "Description", sortable: false },
  { key: "status", label: "Status", sortable: true },
  { key: "progress", label: "Progress", sortable: true },
  { key: "raised", label: "Raised", sortable: true, type: "number" as const },
  { key: "target", label: "Target", sortable: true, type: "number" as const },
  { key: "endDate", label: "End Date", sortable: true },
];

const actions = [
  {
    key: "view",
    label: "View Details",
    handler: (campaign: any) => viewCampaign(campaign.id),
  },
  {
    key: "edit",
    label: "Edit",
    handler: (campaign: any) => editCampaign(campaign.id),
  },
  {
    key: "donations",
    label: "View Donations",
    handler: (campaign: any) => viewDonations(campaign.id),
  },
  {
    key: "pause",
    label: "Pause",
    handler: (campaign: any) => console.log("Pause campaign:", campaign.id),
  },
  {
    key: "delete",
    label: "Delete",
    handler: (campaign: any) => {
      if (!confirm("Are you sure you want to delete this campaign?")) return;
      console.log("Delete campaign:", campaign.id);
    },
  },
];

const calculateStats = () => {
  const totalCampaigns = mockCampaigns.value.length;
  const activeCampaigns = mockCampaigns.value.filter(
    (c) => c.status === "active"
  ).length;
  const totalRaised = mockCampaigns.value.reduce(
    (sum, c) => sum + c.currentAmount,
    0
  );
  const totalTarget = mockCampaigns.value.reduce(
    (sum, c) => sum + c.targetAmount,
    0
  );
  const averageCompletion =
    totalTarget > 0 ? (totalRaised / totalTarget) * 100 : 0;

  stats.value = {
    totalCampaigns,
    activeCampaigns,
    totalRaised,
    averageCompletion: Math.round(averageCompletion),
  };
};

// Initialize
onMounted(async () => {
  if (currentChurch.value) {
    // In a real app, this would fetch from the API
    // await donationStore.fetchCampaigns(currentChurch.value._id);
  }

  calculateStats();
});
</script>
