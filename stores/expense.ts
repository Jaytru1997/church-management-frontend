import { defineStore } from "pinia";
import { reactive, computed, toRefs } from "vue";

interface Expense {
  _id: string;
  title: string;
  description?: string;
  amount: number;
  category: string;
  churchId: string;
  approvedBy?: string;
  approvedAt?: string;
  paidBy?: string;
  paidAt?: string;
  status: "pending" | "approved" | "rejected" | "paid";
  paymentMethod?: "cash" | "bank_transfer" | "check" | "online";
  vendor?: string;
  receipt?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface ExpenseStats {
  totalExpenses: number;
  pendingExpenses: number;
  approvedExpenses: number;
  paidExpenses: number;
  monthlyExpenses: number;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    count: number;
  }>;
}

interface ExpenseState {
  expenses: Expense[];
  currentExpense: Expense | null;
  stats: ExpenseStats | null;
  loading: boolean;
  error: string | null;
}

export const useExpenseStore = defineStore("expense", () => {
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000/api";

  const state = reactive<ExpenseState>({
    expenses: [],
    currentExpense: null,
    stats: null,
    loading: false,
    error: null,
  });

  // Getters
  const pendingExpenses = computed(() =>
    state.expenses.filter((expense) => expense.status === "pending")
  );

  const approvedExpenses = computed(() =>
    state.expenses.filter((expense) => expense.status === "approved")
  );

  const paidExpenses = computed(() =>
    state.expenses.filter((expense) => expense.status === "paid")
  );

  const totalExpenses = computed(() =>
    state.expenses.reduce((sum, expense) => sum + expense.amount, 0)
  );

  const expensesByCategory = computed(() => {
    const categories: Record<string, { amount: number; count: number }> = {};

    state.expenses.forEach((expense) => {
      if (!categories[expense.category]) {
        categories[expense.category] = { amount: 0, count: 0 };
      }
      categories[expense.category]!.amount += expense.amount;
      categories[expense.category]!.count += 1;
    });

    return Object.entries(categories).map(([category, data]) => ({
      category,
      ...data,
    }));
  });

  // Actions
  const fetchExpenses = async (
    churchId: string,
    filters?: {
      status?: string;
      category?: string;
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
          if (value) queryParams.append(key, value);
        });
      }

      const response = (await $fetch(
        `${apiBaseUrl}/expenses?churchId=${churchId}&${queryParams.toString()}`
      )) as { expenses: Expense[] };

      state.expenses = response.expenses;
      return response.expenses;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch expenses";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const fetchExpense = async (expenseId: string) => {
    state.loading = true;
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/expenses/${expenseId}`
      )) as { expense: Expense };

      state.currentExpense = response.expense;
      return state.currentExpense;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch expense";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const createExpense = async (expenseData: Partial<Expense>) => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/expenses`, {
        method: "POST",
        body: expenseData,
      })) as { expense: Expense };

      const newExpense = response.expense;
      state.expenses.unshift(newExpense);
      return newExpense;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create expense";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const updateExpense = async (
    expenseId: string,
    updateData: Partial<Expense>
  ) => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/expenses/${expenseId}`, {
        method: "PUT",
        body: updateData,
      })) as { expense: Expense };

      const updatedExpense = response.expense;

      // Update in expenses array
      const index = state.expenses.findIndex((e) => e._id === expenseId);
      if (index !== -1) {
        state.expenses[index] = updatedExpense;
      }

      // Update current expense if it's the one being updated
      if (state.currentExpense?._id === expenseId) {
        state.currentExpense = updatedExpense;
      }

      return updatedExpense;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to update expense";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const deleteExpense = async (expenseId: string) => {
    state.loading = true;
    try {
      await $fetch(`${apiBaseUrl}/expenses/${expenseId}`, { method: "DELETE" });

      // Remove from expenses array
      state.expenses = state.expenses.filter((e) => e._id !== expenseId);

      // Clear current expense if it's the one being deleted
      if (state.currentExpense?._id === expenseId) {
        state.currentExpense = null;
      }

      return true;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to delete expense";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const approveExpense = async (expenseId: string, notes?: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/expenses/${expenseId}/approve`,
        {
          method: "POST",
          body: { notes },
        }
      )) as { expense: Expense };

      // Update expense in store
      const index = state.expenses.findIndex((e) => e._id === expenseId);
      if (index !== -1) {
        state.expenses[index] = response.expense;
      }

      if (state.currentExpense?._id === expenseId) {
        state.currentExpense = response.expense;
      }

      return response.expense;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to approve expense";
      throw error;
    }
  };

  const rejectExpense = async (expenseId: string, notes?: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/expenses/${expenseId}/reject`,
        {
          method: "POST",
          body: { notes },
        }
      )) as { expense: Expense };

      // Update expense in store
      const index = state.expenses.findIndex((e) => e._id === expenseId);
      if (index !== -1) {
        state.expenses[index] = response.expense;
      }

      if (state.currentExpense?._id === expenseId) {
        state.currentExpense = response.expense;
      }

      return response.expense;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to reject expense";
      throw error;
    }
  };

  const markAsPaid = async (
    expenseId: string,
    paymentData: {
      paymentMethod: "cash" | "bank_transfer" | "check" | "online";
      notes?: string;
    }
  ) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/expenses/${expenseId}/mark-paid`,
        {
          method: "POST",
          body: paymentData,
        }
      )) as { expense: Expense };

      // Update expense in store
      const index = state.expenses.findIndex((e) => e._id === expenseId);
      if (index !== -1) {
        state.expenses[index] = response.expense;
      }

      if (state.currentExpense?._id === expenseId) {
        state.currentExpense = response.expense;
      }

      return response.expense;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to mark expense as paid";
      throw error;
    }
  };

  const fetchExpenseStats = async (
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
        `${apiBaseUrl}/expenses/stats?churchId=${churchId}&${queryParams.toString()}`
      )) as { stats: ExpenseStats };

      state.stats = response.stats;
      return response.stats;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch expense statistics";
      throw error;
    }
  };

  const uploadExpenseReceipt = async (expenseId: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append("receipt", file);

      const response = (await $fetch(
        `${apiBaseUrl}/expenses/${expenseId}/receipt`,
        {
          method: "POST",
          body: formData,
        }
      )) as { expense: Expense };

      // Update expense in store
      const index = state.expenses.findIndex((e) => e._id === expenseId);
      if (index !== -1) {
        state.expenses[index] = response.expense;
      }

      if (state.currentExpense?._id === expenseId) {
        state.currentExpense = response.expense;
      }

      return response.expense;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to upload receipt";
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
    pendingExpenses,
    approvedExpenses,
    paidExpenses,
    totalExpenses,
    expensesByCategory,

    // Actions
    fetchExpenses,
    fetchExpense,
    createExpense,
    updateExpense,
    deleteExpense,
    approveExpense,
    rejectExpense,
    markAsPaid,
    fetchExpenseStats,
    uploadExpenseReceipt,
    clearError,
  };
});
