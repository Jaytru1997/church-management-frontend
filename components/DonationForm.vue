<template>
  <div class="glass-card p-6">
    <div class="mb-6">
      <h3 class="text-xl font-semibold gradient-text">Make a Donation</h3>
      <p class="mt-2 text-white/70">
        Support your church through tithes, offerings, or special donations.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Donation Type -->
      <div>
        <label class="form-label">Donation Type</label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label
            class="flex items-center p-4 glass-card cursor-pointer hover:glass-card-hover transition-all"
          >
            <input
              v-model="form.donationType"
              type="radio"
              value="manual"
              class="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-white"
                >Manual Donation</span
              >
              <span class="block text-sm text-white/60"
                >Record an offline donation</span
              >
            </div>
          </label>

          <label
            class="flex items-center p-4 glass-card cursor-pointer hover:glass-card-hover transition-all"
          >
            <input
              v-model="form.donationType"
              type="radio"
              value="online"
              class="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-white"
                >Online Payment</span
              >
              <span class="block text-sm text-white/60"
                >Pay securely via Monnify</span
              >
            </div>
          </label>
        </div>
      </div>

      <!-- Donor Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="donorName" class="form-label">
            <i class="fas fa-user mr-2"></i>Donor Name
          </label>
          <input
            id="donorName"
            v-model="form.donorName"
            type="text"
            required
            class="form-input"
            :class="{ 'border-red-400/50': errors.donorName }"
            placeholder="Enter donor name"
          />
          <p v-if="errors.donorName" class="mt-1 text-sm text-red-400">
            {{ errors.donorName }}
          </p>
        </div>

        <div>
          <label for="donorEmail" class="form-label">
            <i class="fas fa-envelope mr-2"></i>Donor Email
          </label>
          <input
            id="donorEmail"
            v-model="form.donorEmail"
            type="email"
            required
            class="form-input"
            :class="{ 'border-red-400/50': errors.donorEmail }"
            placeholder="Enter donor email"
          />
          <p v-if="errors.donorEmail" class="mt-1 text-sm text-red-400">
            {{ errors.donorEmail }}
          </p>
        </div>
      </div>

      <!-- Donation Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="amount" class="form-label">
            <i class="fas fa-money-bill mr-2"></i>Amount (₦)
          </label>
          <input
            id="amount"
            v-model="form.amount"
            type="number"
            required
            min="100"
            step="100"
            class="form-input"
            :class="{ 'border-red-400/50': errors.amount }"
            placeholder="Enter amount"
          />
          <p v-if="errors.amount" class="mt-1 text-sm text-red-400">
            {{ errors.amount }}
          </p>
        </div>

        <div>
          <label for="category" class="form-label">
            <i class="fas fa-tag mr-2"></i>Donation Category
          </label>
          <select
            id="category"
            v-model="form.categoryId"
            required
            class="form-input"
            :class="{ 'border-red-400/50': errors.categoryId }"
          >
            <option value="">Select category</option>
            <option
              v-for="category in donationCategories"
              :key="category._id"
              :value="category._id"
            >
              {{ category.name }}
            </option>
          </select>
          <p v-if="errors.categoryId" class="mt-1 text-sm text-red-400">
            {{ errors.categoryId }}
          </p>
        </div>
      </div>

      <!-- Campaign (Optional) -->
      <div v-if="campaigns.length > 0">
        <label for="campaign" class="form-label">
          <i class="fas fa-bullhorn mr-2"></i>Campaign (Optional)
        </label>
        <select id="campaign" v-model="form.campaignId" class="form-input">
          <option value="">No specific campaign</option>
          <option
            v-for="campaign in campaigns"
            :key="campaign._id"
            :value="campaign._id"
          >
            {{ campaign.name }}
          </option>
        </select>
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="form-label">
          <i class="fas fa-comment mr-2"></i>Message (Optional)
        </label>
        <textarea
          id="message"
          v-model="form.message"
          rows="3"
          class="form-input"
          placeholder="Add a personal message..."
        ></textarea>
      </div>

      <!-- Anonymous Option -->
      <div class="flex items-center">
        <input
          id="anonymous"
          v-model="form.anonymous"
          type="checkbox"
          class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
        />
        <label for="anonymous" class="ml-2 text-sm text-white/80">
          Make this donation anonymous
        </label>
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="loading" class="btn-primary w-full">
        <i v-if="loading" class="loading-spinner mr-2"></i>
        <i v-else class="fas fa-heart mr-2"></i>
        {{
          loading
            ? "Processing..."
            : form.donationType === "online"
              ? "Proceed to Payment"
              : "Record Donation"
        }}
      </button>
    </form>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="glass-card p-6 max-w-md w-full mx-4">
        <div class="text-center">
          <i class="fas fa-check-circle text-4xl text-emerald-400 mb-4"></i>
          <h3 class="text-xl font-semibold text-white mb-2">Success!</h3>
          <p class="text-white/80 mb-6">{{ successMessage }}</p>
          <button @click="closeSuccessModal" class="btn-primary">
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useDonationStore } from "~/stores/donation";
import { useChurchStore } from "~/stores/church";

interface Props {
  churchId: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  success: [];
}>();

const donationStore = useDonationStore();
const churchStore = useChurchStore();

const form = ref({
  donationType: "manual",
  donorName: "",
  donorEmail: "",
  amount: "",
  categoryId: "",
  campaignId: "",
  message: "",
  anonymous: false,
});

const errors = ref<Record<string, string>>({});
const showSuccessModal = ref(false);
const successMessage = ref("");

const loading = computed(() => donationStore.loading);
const donationCategories = computed(() => churchStore.donationCategories);
const campaigns = computed(() => donationStore.campaigns);

const validateForm = () => {
  errors.value = {};

  if (!form.value.donorName) {
    errors.value.donorName = "Donor name is required";
  }

  if (!form.value.donorEmail) {
    errors.value.donorEmail = "Donor email is required";
  } else if (!isValidEmail(form.value.donorEmail)) {
    errors.value.donorEmail = "Please enter a valid email address";
  }

  if (!form.value.amount) {
    errors.value.amount = "Amount is required";
  } else if (parseFloat(form.value.amount) < 100) {
    errors.value.amount = "Minimum amount is ₦100";
  }

  if (!form.value.categoryId) {
    errors.value.categoryId = "Please select a donation category";
  }

  return Object.keys(errors.value).length === 0;
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    const donationData = {
      donorName: form.value.donorName,
      donorEmail: form.value.donorEmail,
      amount: parseFloat(form.value.amount),
      categoryId: form.value.categoryId,
      campaignId: form.value.campaignId || null,
      message: form.value.message,
      anonymous: form.value.anonymous,
    };

    if (form.value.donationType === "manual") {
      // Call backend API for manual donation
      await donationStore.createManualDonation(props.churchId, donationData);
      showSuccess("Manual donation recorded successfully!");
    } else {
      // Call backend API for online donation - backend handles Monnify integration
      const result = await donationStore.createOnlineDonation(
        props.churchId,
        donationData
      );
      if (result.paymentUrl) {
        // Redirect to payment page (handled by backend)
        window.location.href = result.paymentUrl;
      }
    }
  } catch (error: any) {
    console.error("Donation error:", error);
    // Handle error display
  }
};

const showSuccess = (message: string) => {
  successMessage.value = message;
  showSuccessModal.value = true;
  resetForm();
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  emit("success");
};

const resetForm = () => {
  form.value = {
    donationType: "manual",
    donorName: "",
    donorEmail: "",
    amount: "",
    categoryId: "",
    campaignId: "",
    message: "",
    anonymous: false,
  };
  errors.value = {};
};

onMounted(async () => {
  // Fetch donation categories and campaigns from backend APIs
  await Promise.all([
    churchStore.fetchDonationCategories(props.churchId),
    donationStore.fetchCampaigns(props.churchId),
  ]);
});
</script>
