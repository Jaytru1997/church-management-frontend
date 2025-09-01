<template>
  <div class="glass-card p-6">
    <div class="mb-6">
      <h3 class="text-xl font-semibold gradient-text">
        {{ isEditing ? "Edit Volunteer Team" : "Create New Volunteer Team" }}
      </h3>
      <p class="mt-2 text-white/70">
        {{
          isEditing
            ? "Update team information and settings"
            : "Set up a new volunteer team for your church"
        }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Team Information</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Team Name -->
          <div class="md:col-span-2">
            <label for="name" class="form-label">
              <i class="fas fa-users mr-2"></i>Team Name *
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.name }"
              placeholder="Enter team name"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-400">
              {{ errors.name }}
            </p>
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label for="description" class="form-label">
              <i class="fas fa-align-left mr-2"></i>Description
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="3"
              class="form-input"
              placeholder="Describe the team's purpose and activities"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Team Leader -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Team Leadership</h4>

        <div>
          <label for="leaderId" class="form-label">
            <i class="fas fa-user-tie mr-2"></i>Team Leader
          </label>
          <select v-model="form.leaderId" class="form-input">
            <option value="">Select a team leader</option>
            <option
              v-for="member in availableMembers"
              :key="member._id"
              :value="member._id"
            >
              {{ member.firstName }} {{ member.lastName }}
            </option>
          </select>
          <p class="mt-1 text-sm text-white/60">
            Optional: Assign a leader to coordinate team activities
          </p>
        </div>
      </div>

      <!-- Team Members -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Team Members</h4>

        <!-- Current Members -->
        <div v-if="form.memberIds.length > 0" class="mb-4">
          <label class="form-label">Current Members</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div
              v-for="memberId in form.memberIds"
              :key="memberId"
              class="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-semibold text-xs">
                    {{ getMemberInitials(memberId) }}
                  </span>
                </div>
                <span class="text-white/80 text-sm">
                  {{ getMemberName(memberId) }}
                </span>
              </div>
              <button
                type="button"
                @click="removeMember(memberId)"
                class="text-red-400 hover:text-red-300"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Add Members -->
        <div>
          <label for="newMember" class="form-label">Add Members</label>
          <select
            id="newMember"
            v-model="selectedNewMember"
            @change="addMember"
            class="form-input"
          >
            <option value="">Select member to add</option>
            <option
              v-for="member in availableMembersForAddition"
              :key="member._id"
              :value="member._id"
            >
              {{ member.firstName }} {{ member.lastName }}
            </option>
          </select>
        </div>
      </div>

      <!-- Team Settings -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Team Settings</h4>

        <!-- Status -->
        <div class="flex items-center">
          <input
            id="isActive"
            v-model="form.isActive"
            type="checkbox"
            class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
          />
          <label for="isActive" class="ml-2 text-sm text-white/80">
            Active Team
          </label>
        </div>

        <p class="text-sm text-white/60">
          Inactive teams won't be visible to members and can't be assigned new
          tasks.
        </p>
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
            {{ isEditing ? "Update Team" : "Create Team" }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useVolunteerTeamStore } from "~/stores/volunteer-team";
import { useMemberStore } from "~/stores/member";
import { useChurchStore } from "~/stores/church";

interface Props {
  team?: any;
  isEditing?: boolean;
}

interface Emits {
  (e: "success", team: any): void;
  (e: "cancel"): void;
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
});

const emit = defineEmits<Emits>();

const teamStore = useVolunteerTeamStore();
const memberStore = useMemberStore();
const churchStore = useChurchStore();

const loading = computed(() => teamStore.loading);
const currentChurch = computed(() => churchStore.currentChurch);
const allMembers = computed(() => memberStore.members);

const form = ref({
  name: "",
  description: "",
  leaderId: "",
  memberIds: [] as string[],
  isActive: true,
});

const errors = ref<Record<string, string>>({});
const submitError = ref("");
const selectedNewMember = ref("");

// Computed properties
const availableMembers = computed(() => {
  return allMembers.value.filter((member) => member.isActive);
});

const availableMembersForAddition = computed(() => {
  return availableMembers.value.filter(
    (member) => !form.value.memberIds.includes(member._id)
  );
});

// Watch for team prop changes (for editing)
watch(
  () => props.team,
  (newTeam) => {
    if (newTeam && props.isEditing) {
      form.value = {
        name: newTeam.name || "",
        description: newTeam.description || "",
        leaderId: newTeam.leaderId || "",
        memberIds: newTeam.memberIds || [],
        isActive: newTeam.isActive ?? true,
      };
    }
  },
  { immediate: true }
);

// Methods
const validateForm = () => {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = "Team name is required";
  } else if (form.value.name.length < 2) {
    errors.value.name = "Team name must be at least 2 characters";
  }

  return Object.keys(errors.value).length === 0;
};

const addMember = () => {
  if (
    selectedNewMember.value &&
    !form.value.memberIds.includes(selectedNewMember.value)
  ) {
    form.value.memberIds.push(selectedNewMember.value);
    selectedNewMember.value = "";
  }
};

const removeMember = (memberId: string) => {
  const index = form.value.memberIds.indexOf(memberId);
  if (index > -1) {
    form.value.memberIds.splice(index, 1);
  }
};

const getMemberName = (memberId: string) => {
  const member = allMembers.value.find((m) => m._id === memberId);
  return member ? `${member.firstName} ${member.lastName}` : "Unknown Member";
};

const getMemberInitials = (memberId: string) => {
  const member = allMembers.value.find((m) => m._id === memberId);
  if (member) {
    return `${member.firstName[0]}${member.lastName[0]}`.toUpperCase();
  }
  return "??";
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  submitError.value = "";

  try {
    const teamData = {
      name: form.value.name,
      description: form.value.description || undefined,
      leaderId: form.value.leaderId || undefined,
      memberIds: form.value.memberIds,
      isActive: form.value.isActive,
      churchId: currentChurch.value?._id,
    };

    let result;
    if (props.isEditing && props.team) {
      result = await teamStore.updateTeam(props.team._id, teamData);
    } else {
      result = await teamStore.createTeam(teamData);
    }

    emit("success", result);
  } catch (error: any) {
    submitError.value =
      error.data?.message ||
      `Failed to ${props.isEditing ? "update" : "create"} team`;
  }
};

// Initialize
onMounted(async () => {
  if (currentChurch.value) {
    // Fetch members for the dropdown
    await memberStore.fetchMembers(currentChurch.value._id, { isActive: true });
  }
});
</script>
