<template>
  <div class="glass-card p-6">
    <div class="mb-6">
      <h3 class="text-xl font-semibold gradient-text">
        {{ isEditing ? "Edit Campaign" : "Create New Campaign" }}
      </h3>
      <p class="mt-2 text-white/70">
        {{
          isEditing
            ? "Update campaign information and settings"
            : "Set up a fundraising campaign for your church"
        }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Campaign Details</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Campaign Name -->
          <div class="md:col-span-2">
            <label for="name" class="form-label">
              <i class="fas fa-tag mr-2"></i>Campaign Name *
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.name }"
              placeholder="Enter campaign name"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-400">
              {{ errors.name }}
            </p>
          </div>

          <!-- Target Amount -->
          <div>
            <label for="targetAmount" class="form-label">
              <i class="fas fa-bullseye mr-2"></i>Target Amount (₦) *
            </label>
            <input
              id="targetAmount"
              v-model="form.targetAmount"
              type="number"
              required
              min="1000"
              step="1000"
              class="form-input"
              :class="{ 'border-red-400/50': errors.targetAmount }"
              placeholder="Enter target amount"
            />
            <p v-if="errors.targetAmount" class="mt-1 text-sm text-red-400">
              {{ errors.targetAmount }}
            </p>
          </div>

          <!-- Start Date -->
          <div>
            <label for="startDate" class="form-label">
              <i class="fas fa-calendar-start mr-2"></i>Start Date *
            </label>
            <input
              id="startDate"
              v-model="form.startDate"
              type="date"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.startDate }"
              :min="minStartDate"
            />
            <p v-if="errors.startDate" class="mt-1 text-sm text-red-400">
              {{ errors.startDate }}
            </p>
          </div>

          <!-- End Date -->
          <div>
            <label for="endDate" class="form-label">
              <i class="fas fa-calendar-end mr-2"></i>End Date *
            </label>
            <input
              id="endDate"
              v-model="form.endDate"
              type="date"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.endDate }"
              :min="form.startDate || minStartDate"
            />
            <p v-if="errors.endDate" class="mt-1 text-sm text-red-400">
              {{ errors.endDate }}
            </p>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="form-label">
            <i class="fas fa-align-left mr-2"></i>Description *
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            required
            class="form-input"
            :class="{ 'border-red-400/50': errors.description }"
            placeholder="Describe the campaign purpose and goals"
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-400">
            {{ errors.description }}
          </p>
        </div>
      </div>

      <!-- Campaign Settings -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Campaign Settings</h4>

        <!-- Status -->
        <div class="flex items-center">
          <input
            id="isActive"
            v-model="form.status"
            type="checkbox"
            value="active"
            class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
          />
          <label for="isActive" class="ml-2 text-sm text-white/80">
            Activate campaign immediately
          </label>
        </div>

        <p class="text-sm text-white/60">
          Active campaigns will be visible to donors and accept contributions.
        </p>
      </div>

      <!-- Campaign Preview -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Preview</h4>

        <div class="glass-card p-4 bg-white/5">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">
                {{ form.name || "Campaign Name" }}
              </h3>
              <p class="text-white/70 text-sm">
                {{
                  form.description || "Campaign description will appear here..."
                }}
              </p>
            </div>
            <div class="text-right">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400"
              >
                {{ form.status === "active" ? "Active" : "Draft" }}
              </span>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-white/60">Progress</span>
              <span class="text-sm text-white/80">
                ₦0 / ₦{{ formatCurrency(parseFloat(form.targetAmount) || 0) }}
              </span>
            </div>
            <div class="w-full bg-white/10 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-0"
              ></div>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm text-white/60">
            <span>Starts: {{ formatDate(form.startDate) || "Not set" }}</span>
            <span>Ends: {{ formatDate(form.endDate) || "Not set" }}</span>
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
            {{ isEditing ? "Update Campaign" : "Create Campaign" }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useDonationStore } from "~/stores/donation";
import { useChurchStore } from "~/stores/church";

interface Props {
  campaign?: any;
  isEditing?: boolean;
}

interface Emits {
  (e: "success", campaign: any): void;
  (e: "cancel"): void;
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
});

const emit = defineEmits<Emits>();

const donationStore = useDonationStore();
const churchStore = useChurchStore();

const loading = computed(() => donationStore.loading);
const currentChurch = computed(() => churchStore.currentChurch);

const form = ref({
  name: "",
  description: "",
  targetAmount: "",
  startDate: "",
  endDate: "",
  status: "active",
});

const errors = ref<Record<string, string>>({});
const submitError = ref("");

// Computed properties
const minStartDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

// Watch for campaign prop changes (for editing)
watch(
  () => props.campaign,
  (newCampaign) => {
    if (newCampaign && props.isEditing) {
      form.value = {
        name: newCampaign.name || "",
        description: newCampaign.description || "",
        targetAmount: newCampaign.targetAmount?.toString() || "",
        startDate: newCampaign.startDate
          ? new Date(newCampaign.startDate).toISOString().split("T")[0]
          : "",
        endDate: newCampaign.endDate
          ? new Date(newCampaign.endDate).toISOString().split("T")[0]
          : "",
        status: newCampaign.status || "active",
      };
    }
  },
  { immediate: true }
);

// Methods
const validateForm = () => {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = "Campaign name is required";
  } else if (form.value.name.length < 3) {
    errors.value.name = "Campaign name must be at least 3 characters";
  }

  if (!form.value.description.trim()) {
    errors.value.description = "Description is required";
  } else if (form.value.description.length < 10) {
    errors.value.description = "Description must be at least 10 characters";
  }

  if (!form.value.targetAmount || parseFloat(form.value.targetAmount) < 1000) {
    errors.value.targetAmount = "Target amount must be at least ₦1,000";
  }

  if (!form.value.startDate) {
    errors.value.startDate = "Start date is required";
  }

  if (!form.value.endDate) {
    errors.value.endDate = "End date is required";
  } else if (
    form.value.startDate &&
    form.value.endDate <= form.value.startDate
  ) {
    errors.value.endDate = "End date must be after start date";
  }

  return Object.keys(errors.value).length === 0;
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

const handleSubmit = async () => {
  if (!validateForm()) return;

  submitError.value = "";

  try {
    const campaignData = {
      name: form.value.name,
      description: form.value.description,
      targetAmount: parseFloat(form.value.targetAmount),
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      status: form.value.status,
      churchId: currentChurch.value?._id || "",
    };

    let result;
    if (props.isEditing && props.campaign) {
      result = await donationStore.updateCampaign(
        props.campaign._id,
        campaignData
      );
    } else {
      result = await donationStore.createCampaign(
        currentChurch.value?._id || "",
        campaignData
      );
    }

    emit("success", result);
  } catch (error: any) {
    submitError.value =
      error.data?.message ||
      `Failed to ${props.isEditing ? "update" : "create"} campaign`;
  }
};
</script>
