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
              Financial Records
            </h1>
            <p class="text-white/80 text-lg">
              Manage and track all financial transactions and records.
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="exportRecords" class="btn-ghost">
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
            <NuxtLink to="/financial-records/create" class="btn-primary">
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
              Add Record
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
                Total Records
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.totalRecords }}
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Verified Records
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.verifiedRecords }}
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
              <p class="text-white/60 text-sm font-medium mb-1">
                Reconciled Records
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.reconciledRecords }}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Pending Verification
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.pendingRecords }}
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0 1 18 0z"
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
                placeholder="Search records..."
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
              v-model="typeFilter"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Types</option>
              <option value="donation">Donation</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
              <option value="transfer">Transfer</option>
              <option value="adjustment">Adjustment</option>
            </select>
            <select
              v-model="statusFilter"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              v-model="reconciledFilter"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Reconciliation</option>
              <option value="reconciled">Reconciled</option>
              <option value="unreconciled">Unreconciled</option>
            </select>
          </div>

          <div class="flex items-center space-x-2">
            <button @click="refreshRecords" class="btn-ghost">
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
          v-if="selectedRecords.length > 0"
          class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg"
        >
          <span class="text-sm text-white/60"
            >{{ selectedRecords.length }} selected</span
          >
          <button @click="bulkVerify" class="btn-ghost text-sm">Verify</button>
          <button @click="bulkReconcile" class="btn-ghost text-sm">
            Reconcile
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

      <!-- Records List -->
      <div class="space-y-4">
        <div
          v-for="record in filteredRecords"
          :key="record.id"
          class="glass-card p-6 hover:glass-card-hover transition-all cursor-pointer"
          @click="viewRecord(record.id)"
        >
          <div class="flex items-start space-x-4">
            <!-- Record Type Icon -->
            <div class="flex-shrink-0">
              <div
                class="icon-container w-12 h-12"
                :class="getRecordTypeClass(record.recordType)"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="record.recordType === 'donation'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                  <path
                    v-else-if="record.recordType === 'expense'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                  <path
                    v-else-if="record.recordType === 'income'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                  <path
                    v-else-if="record.recordType === 'transfer'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
            </div>

            <!-- Record Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-lg font-semibold text-white">
                      {{ record.title }}
                    </h3>
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getStatusColor(record.status),
                      ]"
                    >
                      {{ capitalize(record.status) }}
                    </span>
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getTypeColor(record.recordType),
                      ]"
                    >
                      {{ capitalize(record.recordType) }}
                    </span>
                    <span
                      v-if="record.reconciled"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400"
                    >
                      Reconciled
                    </span>
                  </div>

                  <p class="text-white/70 mb-3">{{ record.description }}</p>

                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <span class="text-white/60 text-sm">Amount</span>
                      <p class="text-white font-semibold">
                        ₦{{ formatCurrency(record.amount) }}
                      </p>
                    </div>
                    <div>
                      <span class="text-white/60 text-sm">Category</span>
                      <p class="text-white">{{ record.category }}</p>
                    </div>
                    <div>
                      <span class="text-white/60 text-sm">Source</span>
                      <p class="text-white">{{ capitalize(record.source) }}</p>
                    </div>
                    <div>
                      <span class="text-white/60 text-sm">Date</span>
                      <p class="text-white">
                        {{ formatDate(record.transactionDate) }}
                      </p>
                    </div>
                  </div>

                  <div
                    class="flex items-center space-x-4 text-sm text-white/60"
                  >
                    <span>Recorded by: {{ record.recordedBy }}</span>
                    <span>{{ formatDate(record.recordedDate) }}</span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center space-x-2 ml-4">
                  <button
                    @click.stop="editRecord(record.id)"
                    class="btn-ghost text-sm"
                  >
                    Edit
                  </button>
                  <button
                    @click.stop="verifyRecord(record)"
                    v-if="record.status === 'pending'"
                    class="btn-ghost text-sm"
                  >
                    Verify
                  </button>
                  <button
                    @click.stop="reconcileRecord(record)"
                    v-if="!record.reconciled && record.status === 'verified'"
                    class="btn-ghost text-sm"
                  >
                    Reconcile
                  </button>
                  <button
                    @click.stop="deleteRecord(record)"
                    class="btn-ghost text-sm text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredRecords.length === 0"
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">
            No financial records found
          </h3>
          <p class="text-white/60">
            {{
              searchQuery || typeFilter || statusFilter
                ? "Try adjusting your filters"
                : "Start by adding your first financial record"
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
import { useFinancialRecordStore } from "~/stores/financial-record";
import { useChurchStore } from "~/stores/church";

const recordStore = useFinancialRecordStore();
const churchStore = useChurchStore();

const loading = computed(() => recordStore.loading);
const records = computed(() => recordStore.records);
const currentChurch = computed(() => churchStore.currentChurch);

// State
const searchQuery = ref("");
const typeFilter = ref("");
const statusFilter = ref("");
const reconciledFilter = ref("");
const selectedRecords = ref<string[]>([]);
const hasMore = ref(false);

const stats = ref({
  totalRecords: 0,
  verifiedRecords: 0,
  reconciledRecords: 0,
  pendingRecords: 0,
});

// Mock data for financial records
const mockRecords = ref([
  {
    id: "1",
    recordType: "donation",
    title: "Sunday Service Offering",
    description: "Regular Sunday service collection",
    amount: 150000,
    category: "Tithes and Offerings",
    transactionDate: new Date(),
    recordedDate: new Date(),
    status: "verified",
    reconciled: true,
    source: "cash",
    recordedBy: "John Pastor",
  },
  {
    id: "2",
    recordType: "expense",
    title: "Office Supplies Purchase",
    description: "Stationery and office materials",
    amount: 25000,
    category: "Supplies",
    transactionDate: new Date(Date.now() - 86400000),
    recordedDate: new Date(Date.now() - 86400000),
    status: "pending",
    reconciled: false,
    source: "bank-transfer",
    recordedBy: "Mary Admin",
  },
  {
    id: "3",
    recordType: "income",
    title: "Building Fund Donation",
    description: "Special donation for new sanctuary",
    amount: 500000,
    category: "Building Fund",
    transactionDate: new Date(Date.now() - 172800000),
    recordedDate: new Date(Date.now() - 172800000),
    status: "verified",
    reconciled: true,
    source: "online",
    recordedBy: "Finance Team",
  },
  {
    id: "4",
    recordType: "expense",
    title: "Utility Bills Payment",
    description: "Monthly electricity and water bills",
    amount: 75000,
    category: "Utilities",
    transactionDate: new Date(Date.now() - 259200000),
    recordedDate: new Date(Date.now() - 259200000),
    status: "verified",
    reconciled: false,
    source: "bank-transfer",
    recordedBy: "Admin Office",
  },
]);

// Computed
const filteredRecords = computed(() => {
  let filtered = mockRecords.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (record) =>
        record.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        record.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        record.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (typeFilter.value) {
    filtered = filtered.filter(
      (record) => record.recordType === typeFilter.value
    );
  }

  if (statusFilter.value) {
    filtered = filtered.filter(
      (record) => record.status === statusFilter.value
    );
  }

  if (reconciledFilter.value) {
    if (reconciledFilter.value === "reconciled") {
      filtered = filtered.filter((record) => record.reconciled);
    } else if (reconciledFilter.value === "unreconciled") {
      filtered = filtered.filter((record) => !record.reconciled);
    }
  }

  // Sort by transaction date (newest first)
  filtered.sort(
    (a, b) =>
      new Date(b.transactionDate).getTime() -
      new Date(a.transactionDate).getTime()
  );

  return filtered;
});

// Methods
const applyFilters = () => {
  // Filters are applied reactively through computed properties
};

const getRecordTypeClass = (recordType: string) => {
  const colors = {
    donation: "bg-emerald-500/20",
    expense: "bg-red-500/20",
    income: "bg-blue-500/20",
    transfer: "bg-purple-500/20",
    adjustment: "bg-yellow-500/20",
  };
  return colors[recordType as keyof typeof colors] || colors.adjustment;
};

const getStatusColor = (status: string) => {
  const colors = {
    pending: "bg-yellow-500/20 text-yellow-400",
    verified: "bg-emerald-500/20 text-emerald-400",
    rejected: "bg-red-500/20 text-red-400",
    cancelled: "bg-gray-500/20 text-gray-400",
  };
  return colors[status as keyof typeof colors] || colors.pending;
};

const getTypeColor = (type: string) => {
  const colors = {
    donation: "bg-emerald-500/20 text-emerald-400",
    expense: "bg-red-500/20 text-red-400",
    income: "bg-blue-500/20 text-blue-400",
    transfer: "bg-purple-500/20 text-purple-400",
    adjustment: "bg-yellow-500/20 text-yellow-400",
  };
  return colors[type as keyof typeof colors] || colors.adjustment;
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

const viewRecord = (recordId: string) => {
  // Navigate to record detail page
  console.log("View record:", recordId);
};

const editRecord = (recordId: string) => {
  // Navigate to edit form
  console.log("Edit record:", recordId);
};

const verifyRecord = (record: any) => {
  // Verify the record
  record.status = "verified";
  console.log("Verify record:", record.id);
};

const reconcileRecord = (record: any) => {
  // Reconcile the record
  record.reconciled = true;
  console.log("Reconcile record:", record.id);
};

const deleteRecord = (record: any) => {
  if (!confirm("Are you sure you want to delete this financial record?"))
    return;

  const index = mockRecords.value.findIndex((r) => r.id === record.id);
  if (index !== -1) {
    mockRecords.value.splice(index, 1);
  }

  console.log("Delete record:", record.id);
};

const bulkVerify = () => {
  selectedRecords.value.forEach((id) => {
    const record = mockRecords.value.find((r) => r.id === id);
    if (record && record.status === "pending") {
      record.status = "verified";
    }
  });
  selectedRecords.value = [];
  console.log("Bulk verify records:", selectedRecords.value);
};

const bulkReconcile = () => {
  selectedRecords.value.forEach((id) => {
    const record = mockRecords.value.find((r) => r.id === id);
    if (record && !record.reconciled && record.status === "verified") {
      record.reconciled = true;
    }
  });
  selectedRecords.value = [];
  console.log("Bulk reconcile records:", selectedRecords.value);
};

const bulkDelete = () => {
  if (
    !confirm(
      `Are you sure you want to delete ${selectedRecords.value.length} financial records?`
    )
  )
    return;

  selectedRecords.value.forEach((id) => {
    const index = mockRecords.value.findIndex((r) => r.id === id);
    if (index !== -1) {
      mockRecords.value.splice(index, 1);
    }
  });

  selectedRecords.value = [];
  console.log("Bulk delete records:", selectedRecords.value);
};

const clearSelection = () => {
  selectedRecords.value = [];
};

const refreshRecords = () => {
  console.log("Refresh financial records");
};

const loadMore = () => {
  console.log("Load more financial records");
};

const exportRecords = () => {
  console.log("Exporting financial records:", records.value);
};

const calculateStats = () => {
  const totalRecords = mockRecords.value.length;
  const verifiedRecords = mockRecords.value.filter(
    (r) => r.status === "verified"
  ).length;
  const reconciledRecords = mockRecords.value.filter(
    (r) => r.reconciled
  ).length;
  const pendingRecords = mockRecords.value.filter(
    (r) => r.status === "pending"
  ).length;

  stats.value = {
    totalRecords,
    verifiedRecords,
    reconciledRecords,
    pendingRecords,
  };
};

// Initialize
onMounted(async () => {
  if (currentChurch.value) {
    // In a real app, this would fetch from the API
    // await recordStore.fetchRecords(currentChurch.value._id);
  }

  calculateStats();
});
</script>
