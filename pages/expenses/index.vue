<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Page Header -->
    <div class="container-responsive py-8">
      <div class="glass-card p-8 mb-8 fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold gradient-text mb-2">Expenses</h1>
            <p class="text-white/80 text-lg">
              Manage church expenses, approvals, and payments.
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="showBulkActions = !showBulkActions"
              :class="[
                'btn-ghost',
                selectedExpenses.length > 0
                  ? 'text-purple-400'
                  : 'text-white/60',
              ]"
              :disabled="selectedExpenses.length === 0"
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Bulk Actions ({{ selectedExpenses.length }})
            </button>
            <button @click="exportExpenses" class="btn-ghost">
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
            <NuxtLink to="/expenses/create" class="btn-primary">
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
              Add Expense
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
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Pending Approval
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.pendingExpenses || 0 }}
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

        <div class="stats-card bounce-in" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Approved</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.approvedExpenses || 0 }}
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

        <div class="stats-card bounce-in" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Paid</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.paidExpenses || 0 }}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Bulk Actions Panel -->
      <div v-if="showBulkActions" class="glass-card p-6 mb-8 slide-up">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="bulkApprove" class="btn-ghost text-sm">
              Approve Selected
            </button>
            <button @click="bulkReject" class="btn-ghost text-sm">
              Reject Selected
            </button>
            <button @click="bulkMarkPaid" class="btn-ghost text-sm">
              Mark as Paid
            </button>
          </div>
          <button
            @click="clearSelection"
            class="text-white/60 hover:text-white"
          >
            Clear Selection
          </button>
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
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="paid">Paid</option>
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
              <option value="utilities">Utilities</option>
              <option value="maintenance">Maintenance</option>
              <option value="supplies">Supplies</option>
              <option value="events">Events</option>
              <option value="salaries">Salaries</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="form-label">Start Date</label>
            <input
              v-model="filters.startDate"
              type="date"
              @change="applyFilters"
              class="form-input"
            />
          </div>
          <div>
            <label class="form-label">End Date</label>
            <input
              v-model="filters.endDate"
              type="date"
              @change="applyFilters"
              class="form-input"
            />
          </div>
        </div>
      </div>

      <!-- Expenses Table -->
      <DataTable
        title="Expenses"
        :items="expenses"
        :columns="columns"
        :actions="actions"
        :bulk-actions="bulkActions"
        :loading="loading"
        :selectable="true"
        :searchable="true"
        search-placeholder="Search expenses..."
        empty-message="No expenses found"
        @action="handleAction"
        @bulk-action="handleBulkAction"
        @selection-change="selectedExpenses = $event"
      >
        <template #actions>
          <button @click="refreshExpenses" class="btn-ghost text-sm">
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useExpenseStore } from "~/stores/expense";
import { useChurchStore } from "~/stores/church";
import { useRouter } from "vue-router";

const router = useRouter();
const expenseStore = useExpenseStore();
const churchStore = useChurchStore();

const loading = computed(() => expenseStore.loading);
const expenses = computed(() => expenseStore.expenses);
const stats = computed(() => expenseStore.stats);
const currentChurch = computed(() => churchStore.currentChurch);

// Filters and state
const filters = ref({
  status: "",
  category: "",
  startDate: "",
  endDate: "",
});

const selectedExpenses = ref<string[]>([]);
const showBulkActions = ref(false);

// Table configuration
const columns = [
  { key: "title", label: "Title", sortable: true },
  { key: "category", label: "Category", sortable: true },
  { key: "amount", label: "Amount", type: "currency" as const, sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "createdAt", label: "Date", type: "date" as const, sortable: true },
];

const actions = [
  {
    key: "view",
    label: "View",
    handler: (expense: any) => router.push(`/expenses/${expense._id}`),
  },
  {
    key: "edit",
    label: "Edit",
    handler: (expense: any) => router.push(`/expenses/${expense._id}/edit`),
  },
  {
    key: "approve",
    label: "Approve",
    handler: (expense: any) => approveExpense(expense._id),
  },
  {
    key: "reject",
    label: "Reject",
    handler: (expense: any) => rejectExpense(expense._id),
  },
  {
    key: "mark_paid",
    label: "Mark Paid",
    handler: (expense: any) => markAsPaid(expense._id),
  },
  {
    key: "delete",
    label: "Delete",
    handler: (expense: any) => deleteExpense(expense._id),
  },
];

const bulkActions = [
  {
    key: "approve",
    label: "Approve Selected",
    handler: bulkApprove,
  },
  {
    key: "reject",
    label: "Reject Selected",
    handler: bulkReject,
  },
  {
    key: "mark_paid",
    label: "Mark as Paid",
    handler: bulkMarkPaid,
  },
];

// Methods
const applyFilters = async () => {
  if (!currentChurch.value) return;

  try {
    await expenseStore.fetchExpenses(currentChurch.value._id, {
      status: filters.value.status || undefined,
      category: filters.value.category || undefined,
      startDate: filters.value.startDate || undefined,
      endDate: filters.value.endDate || undefined,
    });
  } catch (error) {
    console.error("Error applying filters:", error);
  }
};

const refreshExpenses = async () => {
  await applyFilters();
  if (currentChurch.value) {
    await expenseStore.fetchExpenseStats(currentChurch.value._id);
  }
};

const approveExpense = async (expenseId: string) => {
  if (!confirm("Are you sure you want to approve this expense?")) return;

  try {
    await expenseStore.approveExpense(expenseId);
  } catch (error) {
    console.error("Error approving expense:", error);
  }
};

const rejectExpense = async (expenseId: string) => {
  const reason = prompt("Reason for rejection (optional):");
  if (reason === null) return; // User cancelled

  try {
    await expenseStore.rejectExpense(expenseId, reason);
  } catch (error) {
    console.error("Error rejecting expense:", error);
  }
};

const markAsPaid = async (expenseId: string) => {
  const paymentMethod =
    prompt("Payment method (cash, bank_transfer, check, online):") || "cash";

  try {
    await expenseStore.markAsPaid(expenseId, {
      paymentMethod: paymentMethod as any,
      notes: "Marked as paid",
    });
  } catch (error) {
    console.error("Error marking expense as paid:", error);
  }
};

const deleteExpense = async (expenseId: string) => {
  if (
    !confirm(
      "Are you sure you want to delete this expense? This action cannot be undone."
    )
  )
    return;

  try {
    await expenseStore.deleteExpense(expenseId);
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};

const bulkApprove = async () => {
  if (selectedExpenses.value.length === 0) return;

  if (
    !confirm(
      `Are you sure you want to approve ${selectedExpenses.value.length} expenses?`
    )
  )
    return;

  try {
    for (const expenseId of selectedExpenses.value) {
      await expenseStore.approveExpense(expenseId);
    }
    selectedExpenses.value = [];
    showBulkActions.value = false;
  } catch (error) {
    console.error("Error bulk approving expenses:", error);
  }
};

const bulkReject = async () => {
  if (selectedExpenses.value.length === 0) return;

  const reason = prompt("Reason for rejection (optional):");
  if (reason === null) return;

  try {
    for (const expenseId of selectedExpenses.value) {
      await expenseStore.rejectExpense(expenseId, reason);
    }
    selectedExpenses.value = [];
    showBulkActions.value = false;
  } catch (error) {
    console.error("Error bulk rejecting expenses:", error);
  }
};

const bulkMarkPaid = async () => {
  if (selectedExpenses.value.length === 0) return;

  const paymentMethod =
    prompt("Payment method (cash, bank_transfer, check, online):") || "cash";

  try {
    for (const expenseId of selectedExpenses.value) {
      await expenseStore.markAsPaid(expenseId, {
        paymentMethod: paymentMethod as any,
        notes: "Bulk marked as paid",
      });
    }
    selectedExpenses.value = [];
    showBulkActions.value = false;
  } catch (error) {
    console.error("Error bulk marking expenses as paid:", error);
  }
};

const clearSelection = () => {
  selectedExpenses.value = [];
  showBulkActions.value = false;
};

const exportExpenses = () => {
  // TODO: Implement export functionality
  console.log("Exporting expenses:", expenses.value);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const handleAction = (action: any, item: any) => {
  // This will be handled by the individual action handlers
};

const handleBulkAction = (action: any, items: any[]) => {
  // This will be handled by the bulk action handlers
};

// Initialize
onMounted(async () => {
  if (currentChurch.value) {
    await applyFilters();
    await expenseStore.fetchExpenseStats(currentChurch.value._id);
  }
});
</script>
