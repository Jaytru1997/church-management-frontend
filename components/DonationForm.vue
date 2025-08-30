<template>
  <div class="card">
    <div class="mb-6">
      <h3 class="text-lg font-medium text-gray-900">Make a Donation</h3>
      <p class="mt-1 text-sm text-gray-600">
        Support your church through tithes, offerings, or special donations.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Donation Type -->
      <div>
        <label class="form-label">Donation Type</label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              v-model="form.donationType"
              type="radio"
              value="manual"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Manual Donation</span>
              <span class="block text-sm text-gray-500">Record an offline donation</span>
            </div>
          </label>
          
          <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              v-model="form.donationType"
              type="radio"
              value="online"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Online Payment</span>
              <span class="block text-sm text-gray-500">Pay securely via Monnify</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Donor Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="donorName" class="form-label">Donor Name</label>
          <input
            id="donorName"
            v-model="form.donorName"
            type="text"
            required
            class="form-input"
            :class="{ 'border-red-500': errors.donorName }"
            placeholder="Enter donor's full name"
          />
          <p v-if="errors.donorName" class="mt-1 text-sm text-red-600">{{ errors.donorName }}</p>
        </div>

        <div>
          <label for="donorEmail" class="form-label">Donor Email</label>
          <input
            id="donorEmail"
            v-model="form.donorEmail"
            type="email"
            required
            class="form-input"
            :class="{ 'border-red-500': errors.donorEmail }"
            placeholder="Enter donor's email"
          />
          <p v-if="errors.donorEmail" class="mt-1 text-sm text-red-600">{{ errors.donorEmail }}</p>
        </div>
      </div>

      <!-- Donation Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="amount" class="form-label">Amount (₦)</label>
          <input
            id="amount"
            v-model="form.amount"
            type="number"
            required
            min="100"
            step="100"
            class="form-input"
            :class="{ 'border-red-500': errors.amount }"
            placeholder="Enter amount"
          />
          <p v-if="errors.amount" class="mt-1 text-sm text-red-600">{{ errors.amount }}</p>
        </div>

        <div>
          <label for="category" class="form-label">Donation Category</label>
          <select
            id="category"
            v-model="form.categoryId"
            required
            class="form-input"
            :class="{ 'border-red-500': errors.categoryId }"
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
          <p v-if="errors.categoryId" class="mt-1 text-sm text-red-600">{{ errors.categoryId }}</p>
        </div>
      </div>

      <!-- Campaign (Optional) -->
      <div v-if="campaigns.length > 0">
        <label for="campaign" class="form-label">Campaign (Optional)</label>
        <select
          id="campaign"
          v-model="form.campaignId"
          class="form-input"
        >
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
        <label for="message" class="form-label">Message (Optional)</label>
        <textarea
          id="message"
          v-model="form.message"
          rows="3"
          class="form-input"
          placeholder="Add a personal message or prayer request"
        ></textarea>
      </div>

      <!-- Anonymous Donation -->
      <div class="flex items-center">
        <input
          id="anonymous"
          v-model="form.anonymous"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="anonymous" class="ml-2 block text-sm text-gray-900">
          Make this donation anonymous
        </label>
      </div>

      <!-- Error message -->
      <div v-if="donationError" class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Donation failed</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ donationError }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit button -->
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="$emit('cancel')"
          class="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
          <span v-else>
            {{ form.donationType === 'online' ? 'Pay Now' : 'Record Donation' }}
          </span>
        </button>
      </div>
    </form>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-4">Donation Successful!</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              {{ successMessage }}
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="closeSuccessModal"
              class="btn-primary w-full"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DonationForm',
  props: {
    churchId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        donationType: 'manual',
        donorName: '',
        donorEmail: '',
        amount: '',
        categoryId: '',
        campaignId: '',
        message: '',
        anonymous: false
      },
      errors: {},
      showSuccessModal: false,
      successMessage: ''
    }
  },
  computed: {
    ...mapState('donation', ['loading', 'error']),
    ...mapState('church', ['donationCategories']),
    ...mapState('donation', ['campaigns']),
    
    donationError() {
      return this.error
    }
  },
  methods: {
    ...mapActions('donation', ['createManualDonation', 'createOnlineDonation']),
    ...mapActions('church', ['fetchDonationCategories']),
    ...mapActions('donation', ['fetchCampaigns']),
    
    validateForm() {
      this.errors = {}
      
      if (!this.form.donorName) {
        this.errors.donorName = 'Donor name is required'
      }
      
      if (!this.form.donorEmail) {
        this.errors.donorEmail = 'Donor email is required'
      } else if (!this.isValidEmail(this.form.donorEmail)) {
        this.errors.donorEmail = 'Please enter a valid email address'
      }
      
      if (!this.form.amount) {
        this.errors.amount = 'Amount is required'
      } else if (this.form.amount < 100) {
        this.errors.amount = 'Minimum amount is ₦100'
      }
      
      if (!this.form.categoryId) {
        this.errors.categoryId = 'Please select a donation category'
      }
      
      return Object.keys(this.errors).length === 0
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    async handleSubmit() {
      if (!this.validateForm()) return
      
      try {
        const donationData = {
          donorName: this.form.donorName,
          donorEmail: this.form.donorEmail,
          amount: parseFloat(this.form.amount),
          categoryId: this.form.categoryId,
          campaignId: this.form.campaignId || null,
          message: this.form.message,
          anonymous: this.form.anonymous
        }
        
        if (this.form.donationType === 'manual') {
          await this.createManualDonation(this.churchId, donationData)
          this.showSuccess('Manual donation recorded successfully!')
        } else {
          const result = await this.createOnlineDonation(this.churchId, donationData)
          if (result.paymentUrl) {
            // Redirect to payment page
            window.location.href = result.paymentUrl
          }
        }
      } catch (error) {
        console.error('Donation error:', error)
      }
    },
    
    showSuccess(message) {
      this.successMessage = message
      this.showSuccessModal = true
      this.resetForm()
    },
    
    closeSuccessModal() {
      this.showSuccessModal = false
      this.$emit('success')
    },
    
    resetForm() {
      this.form = {
        donationType: 'manual',
        donorName: '',
        donorEmail: '',
        amount: '',
        categoryId: '',
        campaignId: '',
        message: '',
        anonymous: false
      }
      this.errors = {}
    }
  },
  async mounted() {
    // Fetch donation categories and campaigns
    await Promise.all([
      this.fetchDonationCategories(this.churchId),
      this.fetchCampaigns(this.churchId)
    ])
  }
}
</script>
