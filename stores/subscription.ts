import { defineStore } from "pinia";
import { reactive, computed, toRefs } from "vue";

interface SubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: "monthly" | "yearly";
  features: string[];
  maxMembers?: number;
  maxChurches?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Subscription {
  _id: string;
  userId: string;
  planId: string;
  plan?: SubscriptionPlan;
  status: "active" | "canceled" | "past_due" | "incomplete";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  paymentMethodId?: string;
  createdAt: string;
  updatedAt: string;
}

interface BillingHistory {
  _id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed";
  invoiceUrl?: string;
  paymentDate: string;
  periodStart: string;
  periodEnd: string;
  createdAt: string;
}

interface UsageSummary {
  membersUsed: number;
  membersLimit: number;
  churchesUsed: number;
  churchesLimit: number;
  donationsProcessed: number;
  campaignsCreated: number;
  storageUsed: number; // in MB
  storageLimit: number; // in MB
}

interface SubscriptionState {
  plans: SubscriptionPlan[];
  currentSubscription: Subscription | null;
  billingHistory: BillingHistory[];
  usage: UsageSummary | null;
  loading: boolean;
  error: string | null;
}

export const useSubscriptionStore = defineStore("subscription", () => {
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000/api";

  const state = reactive<SubscriptionState>({
    plans: [],
    currentSubscription: null,
    billingHistory: [],
    usage: null,
    loading: false,
    error: null,
  });

  // Getters
  const activePlans = computed(() =>
    state.plans.filter((plan) => plan.isActive)
  );

  const isSubscriptionActive = computed(
    () => state.currentSubscription?.status === "active"
  );

  const isSubscriptionExpiringSoon = computed(() => {
    if (!state.currentSubscription) return false;
    const endDate = new Date(state.currentSubscription.currentPeriodEnd);
    const now = new Date();
    const daysUntilExpiry = Math.ceil(
      (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  });

  const daysUntilExpiry = computed(() => {
    if (!state.currentSubscription) return null;
    const endDate = new Date(state.currentSubscription.currentPeriodEnd);
    const now = new Date();
    return Math.ceil(
      (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
  });

  const usagePercentage = computed(() => {
    if (!state.usage) return {};
    return {
      members: state.usage.membersLimit
        ? (state.usage.membersUsed / state.usage.membersLimit) * 100
        : 0,
      churches: state.usage.churchesLimit
        ? (state.usage.churchesUsed / state.usage.churchesLimit) * 100
        : 0,
      storage: state.usage.storageLimit
        ? (state.usage.storageUsed / state.usage.storageLimit) * 100
        : 0,
    };
  });

  // Actions
  const fetchPlans = async () => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/subscriptions/plans`)) as {
        plans: SubscriptionPlan[];
      };
      state.plans = response.plans;
      return response.plans;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch subscription plans";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/subscriptions/current`
      )) as { subscription: Subscription };
      state.currentSubscription = response.subscription;
      return response.subscription;
    } catch (error: any) {
      state.error =
        error.data?.message || "Failed to fetch current subscription";
      throw error;
    }
  };

  const fetchUsage = async () => {
    try {
      const response = (await $fetch(`${apiBaseUrl}/subscriptions/usage`)) as {
        usage: UsageSummary;
      };
      state.usage = response.usage;
      return response.usage;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch usage summary";
      throw error;
    }
  };

  const subscribe = async (planId: string, paymentMethodId?: string) => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/subscriptions/subscribe`, {
        method: "POST",
        body: { planId, paymentMethodId },
      })) as { subscription: Subscription; clientSecret?: string };

      state.currentSubscription = response.subscription;
      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to subscribe to plan";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const upgradeSubscription = async (newPlanId: string) => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/subscriptions/upgrade`, {
        method: "PUT",
        body: { newPlanId },
      })) as { subscription: Subscription };

      state.currentSubscription = response.subscription;
      return response.subscription;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to upgrade subscription";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const cancelSubscription = async (cancelAtPeriodEnd: boolean = true) => {
    try {
      const response = (await $fetch(`${apiBaseUrl}/subscriptions/cancel`, {
        method: "PUT",
        body: { cancelAtPeriodEnd },
      })) as { subscription: Subscription };

      state.currentSubscription = response.subscription;
      return response.subscription;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to cancel subscription";
      throw error;
    }
  };

  const renewSubscription = async () => {
    try {
      const response = (await $fetch(`${apiBaseUrl}/subscriptions/renew`, {
        method: "PUT",
      })) as { subscription: Subscription };

      state.currentSubscription = response.subscription;
      return response.subscription;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to renew subscription";
      throw error;
    }
  };

  const fetchBillingHistory = async (filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
    limit?: number;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value.toString());
        });
      }

      const response = (await $fetch(
        `${apiBaseUrl}/subscriptions/billing-history?${queryParams.toString()}`
      )) as { billingHistory: BillingHistory[] };

      state.billingHistory = response.billingHistory;
      return response.billingHistory;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch billing history";
      throw error;
    }
  };

  const processPayment = async (paymentMethodId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/subscriptions/process-payment`,
        {
          method: "POST",
          body: { paymentMethodId },
        }
      )) as { success: boolean; subscription?: Subscription };

      if (response.subscription) {
        state.currentSubscription = response.subscription;
      }

      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to process payment";
      throw error;
    }
  };

  const fetchAnalytics = async (filters?: {
    startDate?: string;
    endDate?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value.toString());
        });
      }

      const response = (await $fetch(
        `${apiBaseUrl}/subscriptions/analytics?${queryParams.toString()}`
      )) as { analytics: any };

      return response.analytics;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch analytics";
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
    activePlans,
    isSubscriptionActive,
    isSubscriptionExpiringSoon,
    daysUntilExpiry,
    usagePercentage,

    // Actions
    fetchPlans,
    fetchCurrentSubscription,
    fetchUsage,
    subscribe,
    upgradeSubscription,
    cancelSubscription,
    renewSubscription,
    fetchBillingHistory,
    processPayment,
    fetchAnalytics,
    clearError,
  };
});
