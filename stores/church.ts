import { defineStore } from "pinia";

interface Church {
  _id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  banner?: string;
  admins?: string[];
  createdAt: string;
  updatedAt: string;
}

interface DonationCategory {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

interface Service {
  _id: string;
  name: string;
  description?: string;
  day: string;
  time: string;
  isActive: boolean;
}

interface ChurchState {
  churches: Church[];
  currentChurch: Church | null;
  loading: boolean;
  error: string | null;
  donationCategories: DonationCategory[];
  services: Service[];
}

export const useChurchStore = defineStore("church", () => {
  const state = reactive<ChurchState>({
    churches: [],
    currentChurch: null,
    loading: false,
    error: null,
    donationCategories: [],
    services: [],
  });

  // Getters
  const currentChurchId = computed(() => state.currentChurch?._id);
  const currentChurchName = computed(() => state.currentChurch?.name);
  const isChurchAdmin = computed(() => (userId: string) => {
    return state.currentChurch?.admins?.includes(userId) || false;
  });

  // Actions
  const fetchChurches = async () => {
    state.loading = true;
    try {
      const { $fetch } = useNuxtApp();
      const response = await $fetch("/churches");
      state.churches = response.churches;
      return state.churches;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch churches";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const fetchChurch = async (churchId: string) => {
    state.loading = true;
    try {
      const { $fetch } = useNuxtApp();
      const response = await $fetch(`/churches/${churchId}`);
      state.currentChurch = response.church;
      return state.currentChurch;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch church";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const createChurch = async (churchData: Partial<Church>) => {
    state.loading = true;
    try {
      const { $fetch } = useNuxtApp();
      const response = await $fetch("/churches", {
        method: "POST",
        body: churchData,
      });

      const newChurch = response.church;
      state.churches.push(newChurch);
      return newChurch;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create church";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const updateChurch = async (
    churchId: string,
    updateData: Partial<Church>
  ) => {
    state.loading = true;
    try {
      const { $fetch } = useNuxtApp();
      const response = await $fetch(`/churches/${churchId}`, {
        method: "PUT",
        body: updateData,
      });

      const updatedChurch = response.church;

      // Update in churches array
      const index = state.churches.findIndex((c) => c._id === churchId);
      if (index !== -1) {
        state.churches[index] = updatedChurch;
      }

      // Update current church if it's the one being updated
      if (state.currentChurch?._id === churchId) {
        state.currentChurch = updatedChurch;
      }

      return updatedChurch;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to update church";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const deleteChurch = async (churchId: string) => {
    state.loading = true;
    try {
      const { $fetch } = useNuxtApp();
      await $fetch(`/churches/${churchId}`, { method: "DELETE" });

      // Remove from churches array
      state.churches = state.churches.filter((c) => c._id !== churchId);

      // Clear current church if it's the one being deleted
      if (state.currentChurch?._id === churchId) {
        state.currentChurch = null;
      }

      return true;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to delete church";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const uploadChurchLogo = async (churchId: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append("logo", file);

      const { $fetch } = useNuxtApp();
      const response = await $fetch(`/churches/${churchId}/logo`, {
        method: "POST",
        body: formData,
      });

      const updatedChurch = response.church;
      updateChurchInStore(updatedChurch);

      return updatedChurch;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to upload logo";
      throw error;
    }
  };

  const uploadChurchBanner = async (churchId: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append("banner", file);

      const { $fetch } = useNuxtApp();
      const response = await $fetch(`/churches/${churchId}/banner`, {
        method: "POST",
        body: formData,
      });

      const updatedChurch = response.church;
      updateChurchInStore(updatedChurch);

      return updatedChurch;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to upload banner";
      throw error;
    }
  };

  const fetchDonationCategories = async (churchId: string) => {
    try {
      const { $fetch } = useNuxtApp();
      const response = await $fetch(
        `/churches/${churchId}/donation-categories`
      );
      state.donationCategories = response.categories;
      return state.donationCategories;
    } catch (error: any) {
      state.error =
        error.data?.message || "Failed to fetch donation categories";
      throw error;
    }
  };

  const createDonationCategory = async (
    churchId: string,
    categoryData: Partial<DonationCategory>
  ) => {
    try {
      const { $fetch } = useNuxtApp();
      const response = await $fetch(
        `/churches/${churchId}/donation-categories`,
        {
          method: "POST",
          body: categoryData,
        }
      );

      const newCategory = response.category;
      state.donationCategories.push(newCategory);
      return newCategory;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create donation category";
      throw error;
    }
  };

  const fetchServices = async (churchId: string) => {
    try {
      const { $fetch } = useNuxtApp();
      const response = await $fetch(`/churches/${churchId}/services`);
      state.services = response.services;
      return state.services;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch services";
      throw error;
    }
  };

  const createService = async (
    churchId: string,
    serviceData: Partial<Service>
  ) => {
    try {
      const { $fetch } = useNuxtApp();
      const response = await $fetch(`/churches/${churchId}/services`, {
        method: "POST",
        body: serviceData,
      });

      const newService = response.service;
      state.services.push(newService);
      return newService;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create service";
      throw error;
    }
  };

  const setCurrentChurch = (church: Church) => {
    state.currentChurch = church;
  };

  const updateChurchInStore = (updatedChurch: Church) => {
    // Update in churches array
    const index = state.churches.findIndex((c) => c._id === updatedChurch._id);
    if (index !== -1) {
      state.churches[index] = updatedChurch;
    }

    // Update current church if it's the one being updated
    if (state.currentChurch?._id === updatedChurch._id) {
      state.currentChurch = updatedChurch;
    }
  };

  const clearError = () => {
    state.error = null;
  };

  return {
    // State
    ...toRefs(state),

    // Getters
    currentChurchId,
    currentChurchName,
    isChurchAdmin,

    // Actions
    fetchChurches,
    fetchChurch,
    createChurch,
    updateChurch,
    deleteChurch,
    uploadChurchLogo,
    uploadChurchBanner,
    fetchDonationCategories,
    createDonationCategory,
    fetchServices,
    createService,
    setCurrentChurch,
    updateChurchInStore,
    clearError,
  };
});
