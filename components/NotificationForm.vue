<template>
  <div class="glass-card p-6">
    <div class="mb-6">
      <h3 class="text-xl font-semibold gradient-text">Send Notification</h3>
      <p class="mt-2 text-white/70">
        Send notifications to church members, teams, or individuals.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Notification Details</h4>

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
              placeholder="Enter notification title"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-400">
              {{ errors.title }}
            </p>
          </div>

          <!-- Type -->
          <div>
            <label for="type" class="form-label">
              <i class="fas fa-info-circle mr-2"></i>Type *
            </label>
            <select
              id="type"
              v-model="form.type"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.type }"
            >
              <option value="">Select type</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="announcement">Announcement</option>
            </select>
            <p v-if="errors.type" class="mt-1 text-sm text-red-400">
              {{ errors.type }}
            </p>
          </div>

          <!-- Priority -->
          <div>
            <label for="priority" class="form-label">
              <i class="fas fa-exclamation-triangle mr-2"></i>Priority *
            </label>
            <select
              id="priority"
              v-model="form.priority"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.priority }"
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            <p v-if="errors.priority" class="mt-1 text-sm text-red-400">
              {{ errors.priority }}
            </p>
          </div>
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="form-label">
            <i class="fas fa-align-left mr-2"></i>Message *
          </label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            required
            class="form-input"
            :class="{ 'border-red-400/50': errors.message }"
            placeholder="Enter the notification message"
          ></textarea>
          <p v-if="errors.message" class="mt-1 text-sm text-red-400">
            {{ errors.message }}
          </p>
        </div>
      </div>

      <!-- Recipients -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Recipients</h4>

        <!-- Recipient Type -->
        <div>
          <label for="recipientType" class="form-label">
            <i class="fas fa-users mr-2"></i>Send To *
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              class="flex items-center p-4 glass-card cursor-pointer hover:glass-card-hover transition-all"
            >
              <input
                v-model="form.recipientType"
                type="radio"
                value="church"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-white"
                  >Church Members</span
                >
                <span class="block text-sm text-white/60"
                  >Send to all church members</span
                >
              </div>
            </label>

            <label
              class="flex items-center p-4 glass-card cursor-pointer hover:glass-card-hover transition-all"
            >
              <input
                v-model="form.recipientType"
                type="radio"
                value="team"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-white"
                  >Volunteer Team</span
                >
                <span class="block text-sm text-white/60"
                  >Send to specific team</span
                >
              </div>
            </label>

            <label
              class="flex items-center p-4 glass-card cursor-pointer hover:glass-card-hover transition-all"
            >
              <input
                v-model="form.recipientType"
                type="radio"
                value="user"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-white"
                  >Individual</span
                >
                <span class="block text-sm text-white/60"
                  >Send to specific member</span
                >
              </div>
            </label>

            <label
              class="flex items-center p-4 glass-card cursor-pointer hover:glass-card-hover transition-all"
            >
              <input
                v-model="form.recipientType"
                type="radio"
                value="all"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-white"
                  >All Users</span
                >
                <span class="block text-sm text-white/60"
                  >Send to everyone</span
                >
              </div>
            </label>
          </div>
          <p v-if="errors.recipientType" class="mt-1 text-sm text-red-400">
            {{ errors.recipientType }}
          </p>
        </div>

        <!-- Team Selection -->
        <div v-if="form.recipientType === 'team'">
          <label for="teamId" class="form-label">
            <i class="fas fa-users-cog mr-2"></i>Select Team *
          </label>
          <select
            id="teamId"
            v-model="form.recipientId"
            required
            class="form-input"
            :class="{ 'border-red-400/50': errors.recipientId }"
          >
            <option value="">Select a team</option>
            <option
              v-for="team in availableTeams"
              :key="team._id"
              :value="team._id"
            >
              {{ team.name }} ({{ team.memberIds?.length || 0 }} members)
            </option>
          </select>
          <p v-if="errors.recipientId" class="mt-1 text-sm text-red-400">
            {{ errors.recipientId }}
          </p>
        </div>

        <!-- User Selection -->
        <div v-if="form.recipientType === 'user'">
          <label for="userId" class="form-label">
            <i class="fas fa-user mr-2"></i>Select Member *
          </label>
          <select
            id="userId"
            v-model="form.recipientId"
            required
            class="form-input"
            :class="{ 'border-red-400/50': errors.recipientId }"
          >
            <option value="">Select a member</option>
            <option
              v-for="member in availableMembers"
              :key="member._id"
              :value="member._id"
            >
              {{ member.firstName }} {{ member.lastName }}
            </option>
          </select>
          <p v-if="errors.recipientId" class="mt-1 text-sm text-red-400">
            {{ errors.recipientId }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Actions</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Action URL -->
          <div>
            <label for="actionUrl" class="form-label">
              <i class="fas fa-link mr-2"></i>Action URL
            </label>
            <input
              id="actionUrl"
              v-model="form.actionUrl"
              type="url"
              class="form-input"
              placeholder="https://..."
            />
            <p class="mt-1 text-sm text-white/60">
              Optional: URL to redirect users when they click the notification
            </p>
          </div>

          <!-- Action Text -->
          <div>
            <label for="actionText" class="form-label">
              <i class="fas fa-mouse-pointer mr-2"></i>Action Text
            </label>
            <input
              id="actionText"
              v-model="form.actionText"
              type="text"
              class="form-input"
              placeholder="View Details"
            />
            <p class="mt-1 text-sm text-white/60">
              Optional: Text for the action button
            </p>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Preview</h4>

        <div class="glass-card p-4 bg-white/5">
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-white">
                  {{ form.title || "Notification Title" }}
                </h3>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getTypeColor(form.type),
                  ]"
                >
                  {{ form.type ? capitalize(form.type) : "Type" }}
                </span>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getPriorityColor(form.priority),
                  ]"
                >
                  {{ form.priority ? capitalize(form.priority) : "Priority" }}
                </span>
              </div>
              <p class="text-white/70">
                {{ form.message || "Notification message will appear here..." }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm text-white/60">
            <span>{{ getRecipientPreview() }}</span>
            <span>{{ new Date().toLocaleString() }}</span>
          </div>

          <div v-if="form.actionUrl && form.actionText" class="mt-4">
            <button class="btn-primary text-sm">
              {{ form.actionText }}
            </button>
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
              Failed to send notification
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
            Sending...
          </span>
          <span v-else> Send Notification </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useNotificationStore } from "~/stores/notification";
import { useMemberStore } from "~/stores/member";
import { useVolunteerTeamStore } from "~/stores/volunteer-team";
import { useChurchStore } from "~/stores/church";

interface Props {
  preselectedRecipient?: {
    type: "user" | "team" | "church" | "all";
    id?: string;
  };
}

interface Emits {
  (e: "success", result: any): void;
  (e: "cancel"): void;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<Emits>();

const notificationStore = useNotificationStore();
const memberStore = useMemberStore();
const teamStore = useVolunteerTeamStore();
const churchStore = useChurchStore();

const loading = computed(() => notificationStore.loading);
const currentChurch = computed(() => churchStore.currentChurch);
const availableMembers = computed(() =>
  memberStore.members.filter((m) => m.isActive)
);
const availableTeams = computed(() =>
  teamStore.teams.filter((t) => t.isActive)
);

const form = ref({
  title: "",
  message: "",
  type: "info",
  priority: "medium",
  recipientType: "church",
  recipientId: "",
  actionUrl: "",
  actionText: "",
});

const errors = ref<Record<string, string>>({});
const submitError = ref("");

// Watch for preselected recipient
watch(
  () => props.preselectedRecipient,
  (newRecipient) => {
    if (newRecipient) {
      form.value.recipientType = newRecipient.type;
      form.value.recipientId = newRecipient.id || "";
    }
  },
  { immediate: true }
);

// Methods
const validateForm = () => {
  errors.value = {};

  if (!form.value.title.trim()) {
    errors.value.title = "Title is required";
  } else if (form.value.title.length < 3) {
    errors.value.title = "Title must be at least 3 characters";
  }

  if (!form.value.message.trim()) {
    errors.value.message = "Message is required";
  } else if (form.value.message.length < 10) {
    errors.value.message = "Message must be at least 10 characters";
  }

  if (!form.value.type) {
    errors.value.type = "Type is required";
  }

  if (!form.value.priority) {
    errors.value.priority = "Priority is required";
  }

  if (!form.value.recipientType) {
    errors.value.recipientType = "Recipient type is required";
  }

  if (
    (form.value.recipientType === "team" ||
      form.value.recipientType === "user") &&
    !form.value.recipientId
  ) {
    errors.value.recipientId = "Please select a recipient";
  }

  return Object.keys(errors.value).length === 0;
};

const getTypeColor = (type: string) => {
  const colors = {
    info: "bg-blue-500/20 text-blue-400",
    success: "bg-emerald-500/20 text-emerald-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    error: "bg-red-500/20 text-red-400",
    announcement: "bg-purple-500/20 text-purple-400",
  };
  return colors[type as keyof typeof colors] || colors.info;
};

const getPriorityColor = (priority: string) => {
  const colors = {
    low: "bg-gray-500/20 text-gray-400",
    medium: "bg-blue-500/20 text-blue-400",
    high: "bg-orange-500/20 text-orange-400",
    urgent: "bg-red-500/20 text-red-400",
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};

const getRecipientPreview = () => {
  switch (form.value.recipientType) {
    case "church":
      return "Church Members";
    case "team":
      const team = availableTeams.value.find(
        (t) => t._id === form.value.recipientId
      );
      return team ? `Team: ${team.name}` : "Selected Team";
    case "user":
      const member = availableMembers.value.find(
        (m) => m._id === form.value.recipientId
      );
      return member
        ? `Individual: ${member.firstName} ${member.lastName}`
        : "Selected Member";
    case "all":
      return "All Users";
    default:
      return "Recipients";
  }
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  submitError.value = "";

  try {
    const notificationData = {
      title: form.value.title,
      message: form.value.message,
      type: form.value.type,
      priority: form.value.priority,
      actionUrl: form.value.actionUrl || undefined,
      actionText: form.value.actionText || undefined,
    };

    let result;
    switch (form.value.recipientType) {
      case "church":
        result = await notificationStore.sendChurchNotification(
          currentChurch.value?._id || "",
          notificationData
        );
        break;
      case "team":
        result = await notificationStore.sendTeamNotification(
          form.value.recipientId,
          notificationData
        );
        break;
      case "user":
        result = await notificationStore.sendUserNotification(
          form.value.recipientId,
          notificationData
        );
        break;
      case "all":
        result =
          await notificationStore.sendGeneralNotification(notificationData);
        break;
      default:
        throw new Error("Invalid recipient type");
    }

    emit("success", result);
  } catch (error: any) {
    submitError.value = error.data?.message || "Failed to send notification";
  }
};

// Initialize
onMounted(async () => {
  if (currentChurch.value) {
    // Fetch members and teams for dropdowns
    await memberStore.fetchMembers(currentChurch.value._id, { isActive: true });
    await teamStore.fetchTeams(currentChurch.value._id);
  }
});
</script>
