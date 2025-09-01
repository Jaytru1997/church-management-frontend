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
              Track and manage church financial transactions and records.
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
              <p class="text-white/60 text-sm font-medium mb-1">Total Income</p>
              <p class="text-3xl font-bold text-white">
                ₦{{ formatCurrency(stats.totalIncome || 0) }}
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Total Expenses
              </p>
              <p class="text-3xl font-bold text-white">
                ₦{{ formatCurrency(stats.totalExpenses || 0) }}
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
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Net Income</p>
              <p class="text-3xl font-bold text-white">
                ₦{{ formatCurrency(stats.netIncome || 0) }}
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
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Unreconciled</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.unreconciledCount || 0 }}
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

      <!-- Filters -->
      <div class="glass-card p-6 mb-8 slide-up">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label class="form-label">Type</label>
            <select
              v-model="filters.type"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="asset">Asset</option>
              <option value="liability">Liability</option>
              <option value="equity">Equity</option>
            </select>
          </div>
          <div>
            <label class="form-label">Category</label>
            <select
              v-model="filters.category"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Categories</option>
              <option value="donations">Donations</option>
              <option value="tithes">Tithes</option>
              <option value="offerings">Offerings</option>
              <option value="events">Events</option>
              <option value="utilities">Utilities</option>
              <option value="maintenance">Maintenance</option>
              <option value="salaries">Salaries</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="form-label">Status</label>
            <select
              v-model="filters.reconciled"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Records</option>
              <option :value="true">Reconciled</option>
              <option :value="false">Unreconciled</option>
            </select>
          </div>
          <div>
            <label class="form-label">Date From</label>
            <input
              v-model="filters.startDate"
              type="date"
              @change="applyFilters"
              class="form-input"
            />
          </div>
          <div>
            <label class="form-label">Date To</label>
            <input
              v-model="filters.endDate"
              type="date"
              @change="applyFilters"
              class="form-input"
            />
          </div>
        </div>

        <!-- Bulk Actions -->
        <div
          v-if="selectedRecords.length > 0"
          class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg mt-4"
        >
          <span class="text-sm text-white/60"
            >{{ selectedRecords.length }} selected</span
          >
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

      <!-- Records Table -->
      <DataTable
        title="Financial Records"
        :items="records"
        :columns="columns"
        :actions="actions"
        :loading="loading"
        :searchable="true"
        empty-message="No financial records found"
        @action="handleAction"
      >
        <template #column-type="{ item }">
          <span
            :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              getTypeColor(item.type),
            ]"
          >
            {{ capitalize(item.type) }}
          </span>
        </template>

        <template #column-amount="{ item }">
          <span
            :class="[
              'font-semibold',
              item.type === 'income' ? 'text-emerald-400' : 'text-red-400',
            ]"
          >
            {{ item.type === "income" ? "+" : "-" }}₦{{
              formatCurrency(item.amount)
            }}
          </span>
        </template>

        <template #column-reconciled="{ item }">
          <span
            :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              item.reconciled
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-yellow-500/20 text-yellow-400',
            ]"
          >
            {{ item.reconciled ? "Reconciled" : "Pending" }}
          </span>
        </template>

        <template #column-paymentMethod="{ item }">
          <span class="text-white/60 text-sm">
            {{
              item.paymentMethod
                ? capitalize(item.paymentMethod.replace("_", " "))
                : "N/A"
            }}
          </span>
        </template>
      </DataTable>
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

// Filters and state
const filters = ref({
  type: "",
  category: "",
  reconciled: "",
  startDate: "",
  endDate: "",
});

const selectedRecords = ref<string[]>([]);

const stats = ref({
  totalIncome: 0,
  totalExpenses: 0,
  netIncome: 0,
  unreconciledCount: 0,
});

// Table configuration
const columns = [
  { key: "title", label: "Title", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "category", label: "Category", sortable: true },
  { key: "amount", label: "Amount", sortable: true, type: "number" as const },
  { key: "paymentMethod", label: "Payment Method", sortable: false },
  { key: "reconciled", label: "Status", sortable: true },
  { key: "date", label: "Date", type: "date" as const, sortable: true },
];

const actions = [
  {
    key: "view",
    label: "View Details",
    handler: (record: any) => console.log("View record:", record),
  },
  {
    key: "edit",
    label: "Edit",
    handler: (record: any) => console.log("Edit record:", record),
  },
  {
    key: "reconcile",
    label: "Reconcile",
    handler: reconcileRecord,
  },
  {
    key: "verify",
    label: "Verify",
    handler: verifyRecord,
  },
  {
    key: "delete",
    label: "Delete",
    handler: deleteRecord,
  },
];

// Methods
const applyFilters = async () => {
  if (!currentChurch.value) return;

  try {
    await recordStore.fetchRecords(currentChurch.value._id, {
      type: filters.value.type || undefined,
      category: filters.value.category || undefined,
      reconciled: filters.value.reconciled
        ? filters.value.reconciled === "true"
        : undefined,
      startDate: filters.value.startDate || undefined,
      endDate: filters.value.endDate || undefined,
    });
    calculateStats();
  } catch (error) {
    console.error("Error applying filters:", error);
  }
};

const calculateStats = () => {
  const allRecords = recordStore.records;
  const incomeRecords = allRecords.filter((r) => r.type === "income");
  const expenseRecords = allRecords.filter((r) => r.type === "expense");

  const totalIncome = incomeRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = expenseRecords.reduce((sum, r) => sum + r.amount, 0);
  const unreconciledCount = allRecords.filter((r) => !r.reconciled).length;

  stats.value = {
    totalIncome,
    totalExpenses,
    netIncome: totalIncome - totalExpenses,
    unreconciledCount,
  };
};

const reconcileRecord = async (record: any) => {
  if (!confirm("Are you sure you want to reconcile this record?")) return;

  try {
    await recordStore.reconcileRecord(record._id);
    calculateStats();
  } catch (error) {
    console.error("Error reconciling record:", error);
  }
};

const verifyRecord = async (record: any) => {
  if (!confirm("Are you sure you want to verify this record?")) return;

  try {
    await recordStore.verifyRecord(record._id);
  } catch (error) {
    console.error("Error verifying record:", error);
  }
};

const deleteRecord = async (record: any) => {
  if (
    !confirm(
      "Are you sure you want to delete this record? This action cannot be undone."
    )
  )
    return;

  try {
    await recordStore.deleteRecord(record._id);
    calculateStats();
  } catch (error) {
    console.error("Error deleting record:", error);
  }
};

const bulkReconcile = async () => {
  if (selectedRecords.value.length === 0) return;

  if (
    !confirm(
      `Are you sure you want to reconcile ${selectedRecords.value.length} records?`
    )
  )
    return;

  try {
    await recordStore.bulkReconcileRecords(selectedRecords.value);
    selectedRecords.value = [];
    calculateStats();
  } catch (error) {
    console.error("Error bulk reconciling records:", error);
  }
};

const bulkDelete = async () => {
  if (selectedRecords.value.length === 0) return;

  if (
    !confirm(
      `Are you sure you want to delete ${selectedRecords.value.length} records? This action cannot be undone.`
    )
  )
    return;

  try {
    // Note: Bulk delete would need to be implemented in the store
    selectedRecords.value.forEach(async (id) => {
      await recordStore.deleteRecord(id);
    });
    selectedRecords.value = [];
    calculateStats();
  } catch (error) {
    console.error("Error bulk deleting records:", error);
  }
};

const clearSelection = () => {
  selectedRecords.value = [];
};

const exportRecords = () => {
  // TODO: Implement export functionality
  console.log("Exporting records:", records.value);
};

const handleAction = (action: any, item: any) => {
  // This will be handled by the individual action handlers
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getTypeColor = (type: string) => {
  const colors = {
    income: "bg-emerald-500/20 text-emerald-400",
    expense: "bg-red-500/20 text-red-400",
    asset: "bg-blue-500/20 text-blue-400",
    liability: "bg-orange-500/20 text-orange-400",
    equity: "bg-purple-500/20 text-purple-400",
  };
  return colors[type as keyof typeof colors] || colors.income;
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Initialize
onMounted(async () => {
  if (currentChurch.value) {
    await applyFilters();
  }
});
</script>
