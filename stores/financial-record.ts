import { defineStore } from "pinia";
import { reactive, computed, toRefs } from "vue";

interface FinancialRecord {
  _id: string;
  title: string;
  description?: string;
  type: "income" | "expense" | "asset" | "liability" | "equity";
  amount: number;
  category: string;
  churchId: string;
  date: string;
  paymentMethod?: "cash" | "bank_transfer" | "check" | "online" | "other";
  reference?: string;
  reconciled: boolean;
  reconciledBy?: string;
  reconciledAt?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface FinancialStats {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  monthlyBreakdown: Array<{
    month: string;
    income: number;
    expenses: number;
    net: number;
  }>;
  categoryBreakdown: {
    income: Array<{ category: string; amount: number; count: number }>;
    expenses: Array<{ category: string; amount: number; count: number }>;
  };
}

interface FinancialRecordState {
  records: FinancialRecord[];
  currentRecord: FinancialRecord | null;
  stats: FinancialStats | null;
  loading: boolean;
  error: string | null;
}

export const useFinancialRecordStore = defineStore("financialRecord", () => {
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000/api";

  const state = reactive<FinancialRecordState>({
    records: [],
    currentRecord: null,
    stats: null,
    loading: false,
    error: null,
  });

  // Getters
  const incomeRecords = computed(() =>
    state.records.filter((record) => record.type === "income")
  );

  const expenseRecords = computed(() =>
    state.records.filter((record) => record.type === "expense")
  );

  const reconciledRecords = computed(() =>
    state.records.filter((record) => record.reconciled)
  );

  const unreconciledRecords = computed(() =>
    state.records.filter((record) => !record.reconciled)
  );

  const totalIncome = computed(() =>
    incomeRecords.value.reduce((sum, record) => sum + record.amount, 0)
  );

  const totalExpenses = computed(() =>
    expenseRecords.value.reduce((sum, record) => sum + record.amount, 0)
  );

  const netIncome = computed(() => totalIncome.value - totalExpenses.value);

  // Actions
  const fetchRecords = async (
    churchId: string,
    filters?: {
      type?: string;
      category?: string;
      reconciled?: boolean;
      startDate?: string;
      endDate?: string;
      search?: string;
    }
  ) => {
    state.loading = true;
    state.error = null;

    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = (await $fetch(
        `${apiBaseUrl}/financial-records?churchId=${churchId}&${queryParams.toString()}`
      )) as { records: FinancialRecord[] };

      state.records = response.records;
      return response.records;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch financial records";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const fetchRecord = async (recordId: string) => {
    state.loading = true;
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/financial-records/${recordId}`
      )) as { record: FinancialRecord };

      state.currentRecord = response.record;
      return state.currentRecord;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch financial record";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const createRecord = async (recordData: Partial<FinancialRecord>) => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/financial-records`, {
        method: "POST",
        body: recordData,
      })) as { record: FinancialRecord };

      const newRecord = response.record;
      state.records.unshift(newRecord);
      return newRecord;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create financial record";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const updateRecord = async (
    recordId: string,
    updateData: Partial<FinancialRecord>
  ) => {
    state.loading = true;
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/financial-records/${recordId}`,
        {
          method: "PUT",
          body: updateData,
        }
      )) as { record: FinancialRecord };

      const updatedRecord = response.record;

      // Update in records array
      const index = state.records.findIndex((r) => r._id === recordId);
      if (index !== -1) {
        state.records[index] = updatedRecord;
      }

      // Update current record if it's the one being updated
      if (state.currentRecord?._id === recordId) {
        state.currentRecord = updatedRecord;
      }

      return updatedRecord;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to update financial record";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const deleteRecord = async (recordId: string) => {
    state.loading = true;
    try {
      await $fetch(`${apiBaseUrl}/financial-records/${recordId}`, {
        method: "DELETE",
      });

      // Remove from records array
      state.records = state.records.filter((r) => r._id !== recordId);

      // Clear current record if it's the one being deleted
      if (state.currentRecord?._id === recordId) {
        state.currentRecord = null;
      }

      return true;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to delete financial record";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const verifyRecord = async (recordId: string, notes?: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/financial-records/${recordId}/verify`,
        {
          method: "POST",
          body: { notes },
        }
      )) as { record: FinancialRecord };

      // Update record in store
      const index = state.records.findIndex((r) => r._id === recordId);
      if (index !== -1) {
        state.records[index] = response.record;
      }

      if (state.currentRecord?._id === recordId) {
        state.currentRecord = response.record;
      }

      return response.record;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to verify financial record";
      throw error;
    }
  };

  const reconcileRecord = async (recordId: string, notes?: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/financial-records/${recordId}/reconcile`,
        {
          method: "POST",
          body: { notes },
        }
      )) as { record: FinancialRecord };

      // Update record in store
      const index = state.records.findIndex((r) => r._id === recordId);
      if (index !== -1) {
        state.records[index] = response.record;
      }

      if (state.currentRecord?._id === recordId) {
        state.currentRecord = response.record;
      }

      return response.record;
    } catch (error: any) {
      state.error =
        error.data?.message || "Failed to reconcile financial record";
      throw error;
    }
  };

  const fetchFinancialStats = async (
    churchId: string,
    filters?: {
      startDate?: string;
      endDate?: string;
    }
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });
      }

      const response = (await $fetch(
        `${apiBaseUrl}/financial-records/stats?churchId=${churchId}&${queryParams.toString()}`
      )) as { stats: FinancialStats };

      state.stats = response.stats;
      return response.stats;
    } catch (error: any) {
      state.error =
        error.data?.message || "Failed to fetch financial statistics";
      throw error;
    }
  };

  const bulkReconcileRecords = async (recordIds: string[], notes?: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/financial-records/bulk-reconcile`,
        {
          method: "POST",
          body: { recordIds, notes },
        }
      )) as { records: FinancialRecord[]; reconciled: number };

      // Update records in store
      response.records.forEach((updatedRecord) => {
        const index = state.records.findIndex(
          (r) => r._id === updatedRecord._id
        );
        if (index !== -1) {
          state.records[index] = updatedRecord;
        }
      });

      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to bulk reconcile records";
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
    incomeRecords,
    expenseRecords,
    reconciledRecords,
    unreconciledRecords,
    totalIncome,
    totalExpenses,
    netIncome,

    // Actions
    fetchRecords,
    fetchRecord,
    createRecord,
    updateRecord,
    deleteRecord,
    verifyRecord,
    reconcileRecord,
    fetchFinancialStats,
    bulkReconcileRecords,
    clearError,
  };
});
