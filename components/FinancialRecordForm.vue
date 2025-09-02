<template>
  <div class="glass-card p-6">
    <div class="mb-6">
      <h3 class="text-xl font-semibold gradient-text">
        {{ isEditing ? "Edit Financial Record" : "Add Financial Record" }}
      </h3>
      <p class="mt-2 text-white/70">
        {{
          isEditing
            ? "Update financial record information"
            : "Record a new financial transaction"
        }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Transaction Details</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Title -->
          <div class="md:col-span-2">
            <label for="title" class="form-label">
              <i class="fas fa-tag mr-2"></i>Title *
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.title }"
              placeholder="Enter transaction title"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-400">
              {{ errors.title }}
            </p>
          </div>

          <!-- Type -->
          <div>
            <label for="type" class="form-label">
              <i class="fas fa-chart-pie mr-2"></i>Type *
            </label>
            <select
              id="type"
              v-model="form.type"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.type }"
            >
              <option value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="asset">Asset</option>
              <option value="liability">Liability</option>
              <option value="equity">Equity</option>
            </select>
            <p v-if="errors.type" class="mt-1 text-sm text-red-400">
              {{ errors.type }}
            </p>
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="form-label">
              <i class="fas fa-folder mr-2"></i>Category *
            </label>
            <select
              id="category"
              v-model="form.category"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.category }"
            >
              <option value="">Select category</option>
              <option value="donations">Donations</option>
              <option value="tithes">Tithes</option>
              <option value="offerings">Offerings</option>
              <option value="events">Events</option>
              <option value="utilities">Utilities</option>
              <option value="maintenance">Maintenance</option>
              <option value="salaries">Salaries</option>
              <option value="missions">Missions</option>
              <option value="building">Building Fund</option>
              <option value="other">Other</option>
            </select>
            <p v-if="errors.category" class="mt-1 text-sm text-red-400">
              {{ errors.category }}
            </p>
          </div>

          <!-- Amount -->
          <div>
            <label for="amount" class="form-label">
              <i class="fas fa-money-bill mr-2"></i>Amount (₦) *
            </label>
            <input
              id="amount"
              v-model="form.amount"
              type="number"
              required
              min="0.01"
              step="0.01"
              class="form-input"
              :class="{ 'border-red-400/50': errors.amount }"
              placeholder="Enter amount"
            />
            <p v-if="errors.amount" class="mt-1 text-sm text-red-400">
              {{ errors.amount }}
            </p>
          </div>

          <!-- Date -->
          <div>
            <label for="date" class="form-label">
              <i class="fas fa-calendar mr-2"></i>Date *
            </label>
            <input
              id="date"
              v-model="form.date"
              type="date"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.date }"
              :max="maxDate"
            />
            <p v-if="errors.date" class="mt-1 text-sm text-red-400">
              {{ errors.date }}
            </p>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="form-label">
            <i class="fas fa-align-left mr-2"></i>Description
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            class="form-input"
            placeholder="Enter transaction description"
          ></textarea>
        </div>
      </div>

      <!-- Payment Information -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Payment Information</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Payment Method -->
          <div>
            <label for="paymentMethod" class="form-label">
              <i class="fas fa-credit-card mr-2"></i>Payment Method
            </label>
            <select
              id="paymentMethod"
              v-model="form.paymentMethod"
              class="form-input"
            >
              <option value="">Select payment method</option>
              <option value="cash">Cash</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="online">Online Payment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Reference -->
          <div>
            <label for="reference" class="form-label">
              <i class="fas fa-hashtag mr-2"></i>Reference
            </label>
            <input
              id="reference"
              v-model="form.reference"
              type="text"
              class="form-input"
              placeholder="Transaction reference"
            />
          </div>
        </div>

        <!-- Vendor (for expenses) -->
        <div v-if="form.type === 'expense'">
          <label for="vendor" class="form-label">
            <i class="fas fa-building mr-2"></i>Vendor
          </label>
          <input
            id="vendor"
            v-model="form.vendor"
            type="text"
            class="form-input"
            placeholder="Vendor or supplier name"
          />
        </div>
      </div>

      <!-- Additional Information -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Additional Information</h4>

        <!-- Notes -->
        <div>
          <label for="notes" class="form-label">
            <i class="fas fa-sticky-note mr-2"></i>Notes
          </label>
          <textarea
            id="notes"
            v-model="form.notes"
            rows="3"
            class="form-input"
            placeholder="Additional notes or comments"
          ></textarea>
        </div>

        <!-- Reconciliation Status -->
        <div class="flex items-center">
          <input
            id="reconciled"
            v-model="form.reconciled"
            type="checkbox"
            class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
          />
          <label for="reconciled" class="ml-2 text-sm text-white/80">
            Mark as reconciled
          </label>
        </div>

        <p class="text-sm text-white/60">
          Reconciled records have been verified and matched with bank
          statements.
        </p>
      </div>

      <!-- Preview -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Preview</h4>

        <div class="glass-card p-4 bg-white/5">
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-white">
                  {{ form.title || "Transaction Title" }}
                </h3>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getTypeColor(form.type),
                  ]"
                >
                  {{ form.type ? capitalize(form.type) : "Type" }}
                </span>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    form.reconciled
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-yellow-500/20 text-yellow-400',
                  ]"
                >
                  {{ form.reconciled ? "Reconciled" : "Pending" }}
                </span>
              </div>
              <p class="text-white/70">
                {{
                  form.description ||
                  "Transaction description will appear here..."
                }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span class="text-sm text-white/60">Category:</span>
              <span class="text-sm text-white ml-2">
                {{
                  form.category
                    ? capitalize(form.category.replace("_", " "))
                    : "Not specified"
                }}
              </span>
            </div>
            <div>
              <span class="text-sm text-white/60">Amount:</span>
              <span
                :class="[
                  'text-sm font-semibold ml-2',
                  form.type === 'income' ? 'text-emerald-400' : 'text-red-400',
                ]"
              >
                {{ form.type === "income" ? "+" : "-" }}₦{{
                  formatCurrency(parseFloat(form.amount) || 0)
                }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm text-white/60">
            <span>{{ formatDate(form.date) || "Date not set" }}</span>
            <span>{{
              form.paymentMethod
                ? capitalize(form.paymentMethod.replace("_", " "))
                : "Payment method not specified"
            }}</span>
          </div>
        </div>
      </div>

      <!-- Error message -->
      <div
        v-if="submitError"
        class="bg-red-500/10 border border-red-500/20 rounded-xl p-4"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
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
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-400">
              {{ isEditing ? "Update failed" : "Creation failed" }}
            </h3>
            <div class="mt-1 text-sm text-red-300">
              <p>{{ submitError }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Buttons -->
      <div class="flex items-center justify-end space-x-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="btn-ghost"
          :disabled="loading"
        >
          Cancel
        </button>
        <button type="submit" :disabled="loading" class="btn-primary">
          <span v-if="loading" class="flex items-center">
            <div class="loading-spinner w-4 h-4 mr-2"></div>
            {{ isEditing ? "Updating..." : "Creating..." }}
          </span>
          <span v-else>
            {{ isEditing ? "Update Record" : "Create Record" }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useFinancialRecordStore } from "~/stores/financial-record";
import { useChurchStore } from "~/stores/church";

interface Props {
  record?: any;
  isEditing?: boolean;
}

interface Emits {
  (e: "success", record: any): void;
  (e: "cancel"): void;
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
});

const emit = defineEmits<Emits>();

const recordStore = useFinancialRecordStore();
const churchStore = useChurchStore();

const loading = computed(() => recordStore.loading);
const currentChurch = computed(() => churchStore.currentChurch);

const form = ref({
  title: "",
  description: "",
  type: "income",
  category: "",
  amount: "",
  date: "",
  paymentMethod: "",
  reference: "",
  vendor: "",
  notes: "",
  reconciled: false,
});

const errors = ref<Record<string, string>>({});
const submitError = ref("");

// Computed properties
const maxDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

// Watch for record prop changes (for editing)
watch(
  () => props.record,
  (newRecord) => {
    if (newRecord && props.isEditing) {
      form.value = {
        title: newRecord.title || "",
        description: newRecord.description || "",
        type: newRecord.type || "income",
        category: newRecord.category || "",
        amount: newRecord.amount?.toString() || "",
        date: newRecord.date
          ? new Date(newRecord.date).toISOString().split("T")[0]
          : "",
        paymentMethod: newRecord.paymentMethod || "",
        reference: newRecord.reference || "",
        vendor: newRecord.vendor || "",
        notes: newRecord.notes || "",
        reconciled: newRecord.reconciled || false,
      };
    }
  },
  { immediate: true }
);

// Methods
const validateForm = () => {
  errors.value = {};

  if (!form.value.title.trim()) {
    errors.value.title = "Title is required";
  } else if (form.value.title.length < 3) {
    errors.value.title = "Title must be at least 3 characters";
  }

  if (!form.value.type) {
    errors.value.type = "Type is required";
  }

  if (!form.value.category) {
    errors.value.category = "Category is required";
  }

  if (!form.value.amount || parseFloat(form.value.amount) <= 0) {
    errors.value.amount = "Amount must be greater than 0";
  }

  if (!form.value.date) {
    errors.value.date = "Date is required";
  }

  return Object.keys(errors.value).length === 0;
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date: string) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  submitError.value = "";

  try {
    const recordData = {
      title: form.value.title,
      description: form.value.description || undefined,
      type: form.value.type as
        | "income"
        | "expense"
        | "asset"
        | "liability"
        | "equity",
      category: form.value.category,
      amount: parseFloat(form.value.amount),
      date: form.value.date,
      paymentMethod: (form.value.paymentMethod || undefined) as
        | "cash"
        | "bank_transfer"
        | "check"
        | "online"
        | "other"
        | undefined,
      reference: form.value.reference || undefined,
      vendor: form.value.vendor || undefined,
      notes: form.value.notes || undefined,
      reconciled: form.value.reconciled,
      churchId: currentChurch.value?._id || "",
    };

    let result;
    if (props.isEditing && props.record) {
      result = await recordStore.updateRecord(props.record._id, recordData);
    } else {
      result = await recordStore.createRecord(recordData);
    }

    emit("success", result);
  } catch (error: any) {
    submitError.value =
      error.data?.message ||
      `Failed to ${props.isEditing ? "update" : "create"} financial record`;
  }
};
</script>
