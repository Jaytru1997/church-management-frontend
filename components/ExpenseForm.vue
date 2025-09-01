<template>
  <div class="glass-card p-6">
    <div class="mb-6">
      <h3 class="text-xl font-semibold gradient-text">
        {{ isEditing ? "Edit Expense" : "Add New Expense" }}
      </h3>
      <p class="mt-2 text-white/70">
        {{
          isEditing
            ? "Update expense information"
            : "Record a new church expense"
        }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Expense Details</h4>

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
              placeholder="Enter expense title"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-400">
              {{ errors.title }}
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
              min="0"
              step="0.01"
              class="form-input"
              :class="{ 'border-red-400/50': errors.amount }"
              placeholder="Enter amount"
            />
            <p v-if="errors.amount" class="mt-1 text-sm text-red-400">
              {{ errors.amount }}
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
              <option value="utilities">Utilities</option>
              <option value="maintenance">Maintenance</option>
              <option value="supplies">Office Supplies</option>
              <option value="events">Events</option>
              <option value="salaries">Salaries</option>
              <option value="transportation">Transportation</option>
              <option value="communication">Communication</option>
              <option value="insurance">Insurance</option>
              <option value="other">Other</option>
            </select>
            <p v-if="errors.category" class="mt-1 text-sm text-red-400">
              {{ errors.category }}
            </p>
          </div>

          <!-- Vendor -->
          <div>
            <label for="vendor" class="form-label">
              <i class="fas fa-building mr-2"></i>Vendor
            </label>
            <input
              id="vendor"
              v-model="form.vendor"
              type="text"
              class="form-input"
              placeholder="Enter vendor name"
            />
          </div>

          <!-- Payment Method -->
          <div>
            <label for="paymentMethod" class="form-label">
              <i class="fas fa-credit-card mr-2"></i>Payment Method
            </label>
            <select v-model="form.paymentMethod" class="form-input">
              <option value="">Select payment method</option>
              <option value="cash">Cash</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="online">Online Payment</option>
              <option value="other">Other</option>
            </select>
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
            placeholder="Enter expense description"
          ></textarea>
        </div>

        <!-- Notes -->
        <div>
          <label for="notes" class="form-label">
            <i class="fas fa-sticky-note mr-2"></i>Notes
          </label>
          <textarea
            id="notes"
            v-model="form.notes"
            rows="2"
            class="form-input"
            placeholder="Additional notes"
          ></textarea>
        </div>
      </div>

      <!-- Receipt Upload -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Receipt</h4>

        <div>
          <label class="form-label">
            <i class="fas fa-upload mr-2"></i>Upload Receipt
          </label>
          <input
            ref="receiptInput"
            type="file"
            accept="image/*,.pdf"
            @change="handleReceiptUpload"
            class="hidden"
          />
          <div class="mt-2">
            <button
              type="button"
              @click="$refs.receiptInput?.click()"
              class="btn-ghost"
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Choose File
            </button>
            <span v-if="receiptFile" class="ml-3 text-white/80 text-sm">
              {{ receiptFile.name }}
            </span>
            <span v-else class="ml-3 text-white/60 text-sm">
              No file selected
            </span>
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
            {{ isEditing ? "Update Expense" : "Create Expense" }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useExpenseStore } from "~/stores/expense";
import { useChurchStore } from "~/stores/church";

interface Props {
  expense?: any;
  isEditing?: boolean;
}

interface Emits {
  (e: "success", expense: any): void;
  (e: "cancel"): void;
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
});

const emit = defineEmits<Emits>();

const expenseStore = useExpenseStore();
const churchStore = useChurchStore();

const loading = computed(() => expenseStore.loading);
const currentChurch = computed(() => churchStore.currentChurch);

const form = ref({
  title: "",
  description: "",
  amount: "",
  category: "",
  vendor: "",
  paymentMethod: "",
  notes: "",
});

const errors = ref<Record<string, string>>({});
const submitError = ref("");
const receiptFile = ref<File | null>(null);
const receiptInput = ref<HTMLInputElement | null>(null);

// Watch for expense prop changes (for editing)
watch(
  () => props.expense,
  (newExpense) => {
    if (newExpense && props.isEditing) {
      form.value = {
        title: newExpense.title || "",
        description: newExpense.description || "",
        amount: newExpense.amount?.toString() || "",
        category: newExpense.category || "",
        vendor: newExpense.vendor || "",
        paymentMethod: newExpense.paymentMethod || "",
        notes: newExpense.notes || "",
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
  }

  if (!form.value.amount || parseFloat(form.value.amount) <= 0) {
    errors.value.amount = "Amount must be greater than 0";
  }

  if (!form.value.category) {
    errors.value.category = "Category is required";
  }

  return Object.keys(errors.value).length === 0;
};

const handleReceiptUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    receiptFile.value = file;
  }
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  submitError.value = "";

  try {
    const expenseData = {
      title: form.value.title,
      description: form.value.description || undefined,
      amount: parseFloat(form.value.amount),
      category: form.value.category,
      vendor: form.value.vendor || undefined,
      paymentMethod: (form.value.paymentMethod as any) || undefined,
      notes: form.value.notes || undefined,
      churchId: currentChurch.value?._id,
    };

    let result;
    if (props.isEditing && props.expense) {
      result = await expenseStore.updateExpense(props.expense._id, expenseData);
    } else {
      result = await expenseStore.createExpense(expenseData);
    }

    // Upload receipt if provided
    if (receiptFile.value && result._id) {
      try {
        await expenseStore.uploadExpenseReceipt(result._id, receiptFile.value);
      } catch (uploadError) {
        console.error("Error uploading receipt:", uploadError);
        // Don't fail the whole operation for receipt upload error
      }
    }

    emit("success", result);
  } catch (error: any) {
    submitError.value =
      error.data?.message ||
      `Failed to ${props.isEditing ? "update" : "create"} expense`;
  }
};
</script>
