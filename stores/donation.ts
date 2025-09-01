import { defineStore } from "pinia";
import { reactive, computed, toRefs } from "vue";

interface Donation {
  _id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  categoryId: string;
  campaignId?: string;
  message?: string;
  anonymous: boolean;
  status: "pending" | "completed" | "failed";
  paymentMethod: "manual" | "online";
  createdAt: string;
  updatedAt: string;
}

interface Campaign {
  _id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "cancelled";
  churchId: string;
}

interface DonationState {
  donations: Donation[];
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
}

export const useDonationStore = defineStore("donation", () => {
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000/api";

  const state = reactive<DonationState>({
    donations: [],
    campaigns: [],
    loading: false,
    error: null,
  });

  // Getters
  const totalDonations = computed(() =>
    state.donations.reduce((sum, donation) => sum + donation.amount, 0)
  );

  const recentDonations = computed(() => state.donations.slice(0, 5));

  const activeCampaigns = computed(() =>
    state.campaigns.filter((campaign) => campaign.status === "active")
  );

  // Actions
  const createManualDonation = async (
    churchId: string,
    donationData: {
      donorName: string;
      donorEmail: string;
      amount: number;
      categoryId: string;
      campaignId?: string;
      message?: string;
      anonymous: boolean;
    }
  ) => {
    state.loading = true;
    state.error = null;

    try {
      const response = (await $fetch(`${apiBaseUrl}/donations/manual`, {
        method: "POST",
        body: {
          churchId,
          ...donationData,
        },
      })) as { donation: Donation };

      // Add the new donation to the list
      state.donations.unshift(response.donation);

      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create manual donation";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const createOnlineDonation = async (
    churchId: string,
    donationData: {
      donorName: string;
      donorEmail: string;
      amount: number;
      categoryId: string;
      campaignId?: string;
      message?: string;
      anonymous: boolean;
    }
  ) => {
    state.loading = true;
    state.error = null;

    try {
      const response = await $fetch(`${apiBaseUrl}/donations/online`, {
        method: "POST",
        body: {
          churchId,
          ...donationData,
        },
      });

      // The backend handles Monnify integration and returns payment URL
      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create online donation";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const fetchDonations = async (
    churchId: string,
    filters?: {
      categoryId?: string;
      campaignId?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    }
  ) => {
    state.loading = true;
    state.error = null;

    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });
      }

      const response = (await $fetch(
        `${apiBaseUrl}/donations?churchId=${churchId}&${queryParams.toString()}`
      )) as { donations: Donation[] };

      state.donations = response.donations;
      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch donations";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const fetchCampaigns = async (churchId: string) => {
    state.loading = true;
    state.error = null;

    try {
      const response = (await $fetch(
        `${apiBaseUrl}/campaigns?churchId=${churchId}`
      )) as { campaigns: Campaign[] };

      state.campaigns = response.campaigns;
      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch campaigns";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const createCampaign = async (
    churchId: string,
    campaignData: {
      name: string;
      description: string;
      targetAmount: number;
      startDate: string;
      endDate: string;
    }
  ) => {
    state.loading = true;
    state.error = null;

    try {
      const response = (await $fetch(`${apiBaseUrl}/campaigns`, {
        method: "POST",
        body: {
          churchId,
          ...campaignData,
        },
      })) as { campaign: Campaign };

      state.campaigns.unshift(response.campaign);
      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create campaign";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const updateCampaign = async (
    campaignId: string,
    updates: Partial<Campaign>
  ) => {
    state.loading = true;
    state.error = null;

    try {
      const response = (await $fetch(`${apiBaseUrl}/campaigns/${campaignId}`, {
        method: "PUT",
        body: updates,
      })) as { campaign: Campaign };

      // Update the campaign in the list
      const index = state.campaigns.findIndex((c) => c._id === campaignId);
      if (index !== -1) {
        state.campaigns[index] = response.campaign;
      }

      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to update campaign";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const deleteCampaign = async (campaignId: string) => {
    state.loading = true;
    state.error = null;

    try {
      await $fetch(`${apiBaseUrl}/campaigns/${campaignId}`, {
        method: "DELETE",
      });

      // Remove the campaign from the list
      state.campaigns = state.campaigns.filter((c) => c._id !== campaignId);
    } catch (error: any) {
      state.error = error.data?.message || "Failed to delete campaign";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const getDonationReceipt = async (donationId: string) => {
    try {
      const response = await $fetch(
        `${apiBaseUrl}/donations/${donationId}/receipt`
      );
      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to get donation receipt";
      throw error;
    }
  };

  const handlePaymentCallback = async (callbackData: any) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/donations/callback`, {
        method: "POST",
        body: callbackData,
      });

      // The backend will handle updating the donation status
      // We can optionally refresh the donations list if needed
      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to process payment callback";
      throw error;
    }
  };

  const verifyDonation = async (donationId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/donations/${donationId}/verify`,
        {
          method: "POST",
        }
      )) as { donation: Donation };

      // Update donation in store
      const index = state.donations.findIndex((d) => d._id === donationId);
      if (index !== -1) {
        state.donations[index] = response.donation;
      }

      return response.donation;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to verify donation";
      throw error;
    }
  };

  const updateDonation = async (
    donationId: string,
    updateData: Partial<Donation>
  ) => {
    try {
      const response = (await $fetch(`${apiBaseUrl}/donations/${donationId}`, {
        method: "PUT",
        body: updateData,
      })) as { donation: Donation };

      // Update donation in store
      const index = state.donations.findIndex((d) => d._id === donationId);
      if (index !== -1) {
        state.donations[index] = response.donation;
      }

      return response.donation;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to update donation";
      throw error;
    }
  };

  const deleteDonation = async (donationId: string) => {
    try {
      await $fetch(`${apiBaseUrl}/donations/${donationId}`, {
        method: "DELETE",
      });

      // Remove from donations array
      state.donations = state.donations.filter((d) => d._id !== donationId);

      return true;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to delete donation";
      throw error;
    }
  };

  const clearError = () => {
    state.error = null;
  };

  return {
    // State
    ...toRefs(state),

    // Getters
    totalDonations,
    recentDonations,
    activeCampaigns,

    // Actions
    createManualDonation,
    createOnlineDonation,
    fetchDonations,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getDonationReceipt,
    handlePaymentCallback,
    verifyDonation,
    updateDonation,
    deleteDonation,
    clearError,
  };
});
