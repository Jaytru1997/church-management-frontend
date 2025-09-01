import { defineStore } from "pinia";
import { reactive, computed, toRefs } from "vue";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "announcement";
  recipientType: "user" | "church" | "team" | "all";
  recipientId?: string; // userId, churchId, or teamId
  churchId?: string;
  sentBy: string;
  sentAt: string;
  read: boolean;
  readAt?: string;
  archived: boolean;
  archivedAt?: string;
  priority: "low" | "medium" | "high" | "urgent";
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

export const useNotificationStore = defineStore("notification", () => {
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000/api";

  const state = reactive<NotificationState>({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  });

  // Getters
  const unreadNotifications = computed(() =>
    state.notifications.filter((n) => !n.read)
  );

  const readNotifications = computed(() =>
    state.notifications.filter((n) => n.read && !n.archived)
  );

  const archivedNotifications = computed(() =>
    state.notifications.filter((n) => n.archived)
  );

  const urgentNotifications = computed(() =>
    state.notifications.filter((n) => n.priority === "urgent" && !n.read)
  );

  const notificationsByType = computed(() => {
    const types: Record<string, Notification[]> = {};
    state.notifications.forEach((notification) => {
      if (!types[notification.type]) {
        types[notification.type] = [];
      }
      types[notification.type]!.push(notification);
    });
    return types;
  });

  // Actions
  const fetchNotifications = async (filters?: {
    read?: boolean;
    archived?: boolean;
    type?: string;
    priority?: string;
    limit?: number;
    offset?: number;
  }) => {
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
        `${apiBaseUrl}/notifications?${queryParams.toString()}`
      )) as { notifications: Notification[]; unreadCount: number };

      state.notifications = response.notifications;
      state.unreadCount = response.unreadCount;
      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch notifications";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const fetchNotification = async (notificationId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/notifications/${notificationId}`
      )) as { notification: Notification };

      // Update notification in store if it exists
      const index = state.notifications.findIndex(
        (n) => n._id === notificationId
      );
      if (index !== -1) {
        state.notifications[index] = response.notification;
      }

      return response.notification;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch notification";
      throw error;
    }
  };

  const sendGeneralNotification = async (notificationData: {
    title: string;
    message: string;
    type?: "info" | "success" | "warning" | "error" | "announcement";
    priority?: "low" | "medium" | "high" | "urgent";
    actionUrl?: string;
    actionText?: string;
    metadata?: Record<string, any>;
  }) => {
    try {
      const response = (await $fetch(`${apiBaseUrl}/notifications/send`, {
        method: "POST",
        body: notificationData,
      })) as { notification: Notification };

      // Add to notifications if it's for the current user
      state.notifications.unshift(response.notification);
      if (!response.notification.read) {
        state.unreadCount += 1;
      }

      return response.notification;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to send notification";
      throw error;
    }
  };

  const sendChurchNotification = async (
    churchId: string,
    notificationData: {
      title: string;
      message: string;
      type?: "info" | "success" | "warning" | "error" | "announcement";
      priority?: "low" | "medium" | "high" | "urgent";
      actionUrl?: string;
      actionText?: string;
      metadata?: Record<string, any>;
    }
  ) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/notifications/send-church`,
        {
          method: "POST",
          body: { churchId, ...notificationData },
        }
      )) as { notification: Notification; sentCount: number };

      // Add to notifications if it's for the current user
      if (response.notification) {
        state.notifications.unshift(response.notification);
        if (!response.notification.read) {
          state.unreadCount += 1;
        }
      }

      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to send church notification";
      throw error;
    }
  };

  const sendUserNotification = async (
    userId: string,
    notificationData: {
      title: string;
      message: string;
      type?: "info" | "success" | "warning" | "error" | "announcement";
      priority?: "low" | "medium" | "high" | "urgent";
      actionUrl?: string;
      actionText?: string;
      metadata?: Record<string, any>;
    }
  ) => {
    try {
      const response = (await $fetch(`${apiBaseUrl}/notifications/send-user`, {
        method: "POST",
        body: { userId, ...notificationData },
      })) as { notification: Notification };

      // Add to notifications if it's for the current user
      state.notifications.unshift(response.notification);
      if (!response.notification.read) {
        state.unreadCount += 1;
      }

      return response.notification;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to send user notification";
      throw error;
    }
  };

  const sendTeamNotification = async (
    teamId: string,
    notificationData: {
      title: string;
      message: string;
      type?: "info" | "success" | "warning" | "error" | "announcement";
      priority?: "low" | "medium" | "high" | "urgent";
      actionUrl?: string;
      actionText?: string;
      metadata?: Record<string, any>;
    }
  ) => {
    try {
      const response = (await $fetch(`${apiBaseUrl}/notifications/send-team`, {
        method: "POST",
        body: { teamId, ...notificationData },
      })) as { notifications: Notification[]; sentCount: number };

      // Add notifications to store
      response.notifications.forEach((notification) => {
        state.notifications.unshift(notification);
        if (!notification.read) {
          state.unreadCount += 1;
        }
      });

      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to send team notification";
      throw error;
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/notifications/${notificationId}/read`,
        {
          method: "PUT",
        }
      )) as { notification: Notification };

      // Update notification in store
      const index = state.notifications.findIndex(
        (n) => n._id === notificationId
      );
      if (index !== -1) {
        state.notifications[index] = response.notification;
        if (response.notification.read && !state.notifications[index].read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }

      return response.notification;
    } catch (error: any) {
      state.error =
        error.data?.message || "Failed to mark notification as read";
      throw error;
    }
  };

  const markAsUnread = async (notificationId: string) => {
    try {
      // This would be a custom endpoint or we can handle it locally
      const index = state.notifications.findIndex(
        (n) => n._id === notificationId
      );
      if (index !== -1) {
        state.notifications[index]!.read = false;
        state.notifications[index]!.readAt = undefined;
        state.unreadCount += 1;
        return state.notifications[index];
      }

      return null;
    } catch (error: any) {
      state.error =
        error.data?.message || "Failed to mark notification as unread";
      throw error;
    }
  };

  const archiveNotification = async (notificationId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/notifications/${notificationId}/archive`,
        {
          method: "PUT",
        }
      )) as { notification: Notification };

      // Update notification in store
      const index = state.notifications.findIndex(
        (n) => n._id === notificationId
      );
      if (index !== -1) {
        state.notifications[index] = response.notification;
        if (!response.notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }

      return response.notification;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to archive notification";
      throw error;
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await $fetch(`${apiBaseUrl}/notifications/${notificationId}`, {
        method: "DELETE",
      });

      // Remove from notifications array
      const index = state.notifications.findIndex(
        (n) => n._id === notificationId
      );
      if (index !== -1) {
        if (!state.notifications[index]!.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }

      return true;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to delete notification";
      throw error;
    }
  };

  const bulkMarkAsRead = async (notificationIds: string[]) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/notifications/bulk-actions`,
        {
          method: "POST",
          body: { action: "mark_read", notificationIds },
        }
      )) as { notifications: Notification[]; updatedCount: number };

      // Update notifications in store
      response.notifications.forEach((updatedNotification) => {
        const index = state.notifications.findIndex(
          (n) => n._id === updatedNotification._id
        );
        if (index !== -1) {
          const wasUnread = !state.notifications[index]!.read;
          state.notifications[index] = updatedNotification;
          if (wasUnread && updatedNotification.read) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
        }
      });

      return response;
    } catch (error: any) {
      state.error =
        error.data?.message || "Failed to bulk mark notifications as read";
      throw error;
    }
  };

  const bulkArchive = async (notificationIds: string[]) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/notifications/bulk-actions`,
        {
          method: "POST",
          body: { action: "archive", notificationIds },
        }
      )) as { notifications: Notification[]; updatedCount: number };

      // Update notifications in store
      response.notifications.forEach((updatedNotification) => {
        const index = state.notifications.findIndex(
          (n) => n._id === updatedNotification._id
        );
        if (index !== -1) {
          const wasUnread = !state.notifications[index]!.read;
          state.notifications[index] = updatedNotification;
          if (wasUnread && updatedNotification.archived) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
        }
      });

      return response;
    } catch (error: any) {
      state.error =
        error.data?.message || "Failed to bulk archive notifications";
      throw error;
    }
  };

  const bulkDelete = async (notificationIds: string[]) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/notifications/bulk-actions`,
        {
          method: "POST",
          body: { action: "delete", notificationIds },
        }
      )) as { deletedCount: number };

      // Remove notifications from store
      let unreadRemoved = 0;
      notificationIds.forEach((id) => {
        const index = state.notifications.findIndex((n) => n._id === id);
        if (index !== -1) {
          if (!state.notifications[index]!.read) {
            unreadRemoved += 1;
          }
          state.notifications.splice(index, 1);
        }
      });

      state.unreadCount = Math.max(0, state.unreadCount - unreadRemoved);

      return response;
    } catch (error: any) {
      state.error =
        error.data?.message || "Failed to bulk delete notifications";
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
    unreadNotifications,
    readNotifications,
    archivedNotifications,
    urgentNotifications,
    notificationsByType,

    // Actions
    fetchNotifications,
    fetchNotification,
    sendGeneralNotification,
    sendChurchNotification,
    sendUserNotification,
    sendTeamNotification,
    markAsRead,
    markAsUnread,
    archiveNotification,
    deleteNotification,
    bulkMarkAsRead,
    bulkArchive,
    bulkDelete,
    clearError,
  };
});
