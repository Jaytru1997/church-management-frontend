<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Page Header -->
    <div class="container-responsive py-8">
      <div class="glass-card p-8 mb-8 fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold gradient-text mb-2">
              Volunteer Teams
            </h1>
            <p class="text-white/80 text-lg">
              Manage church volunteer teams and their activities.
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="exportTeams" class="btn-ghost">
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export
            </button>
            <NuxtLink to="/volunteer-teams/create" class="btn-primary">
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Team
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="stats-card bounce-in">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Total Teams</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.totalTeams || 0 }}
              </p>
            </div>
            <div class="icon-container">
              <svg
                class="w-8 h-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Active Teams</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.activeTeams || 0 }}
              </p>
            </div>
            <div class="icon-container">
              <svg
                class="w-8 h-8 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Total Members
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.totalMembers || 0 }}
              </p>
            </div>
            <div class="icon-container">
              <svg
                class="w-8 h-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="glass-card p-6 mb-8 slide-up">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="form-label">Status</label>
            <select
              v-model="filters.isActive"
              @change="applyFilters"
              class="form-input"
            >
              <option :value="null">All Teams</option>
              <option :value="true">Active Only</option>
              <option :value="false">Inactive Only</option>
            </select>
          </div>
          <div>
            <label class="form-label">Has Leader</label>
            <select
              v-model="filters.hasLeader"
              @change="applyFilters"
              class="form-input"
            >
              <option :value="null">All Teams</option>
              <option :value="true">With Leader</option>
              <option :value="false">Without Leader</option>
            </select>
          </div>
          <div>
            <label class="form-label">Search</label>
            <input
              v-model="filters.search"
              type="text"
              @input="applyFilters"
              class="form-input"
              placeholder="Search teams..."
            />
          </div>
        </div>
      </div>

      <!-- Teams Table -->
      <DataTable
        title="Volunteer Teams"
        :items="teams"
        :columns="columns"
        :actions="actions"
        :loading="loading"
        :searchable="false"
        empty-message="No volunteer teams found"
        @action="handleAction"
      >
        <template #actions>
          <button @click="refreshTeams" class="btn-ghost text-sm">
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </template>

        <!-- Custom column for member count -->
        <template #column-memberCount="{ item }">
          <span class="text-white/80">
            {{ item.memberIds?.length || 0 }} members
          </span>
        </template>

        <!-- Custom column for leader -->
        <template #column-leader="{ item }">
          <div v-if="item.leader" class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center"
            >
              <span class="text-white font-semibold text-xs">
                {{ item.leader.firstName[0] }}{{ item.leader.lastName[0] }}
              </span>
            </div>
            <span class="text-white/80 text-sm">
              {{ item.leader.firstName }} {{ item.leader.lastName }}
            </span>
          </div>
          <span v-else class="text-white/60 text-sm">No leader assigned</span>
        </template>

        <!-- Custom column for status -->
        <template #column-isActive="{ item }">
          <span
            :class="[
              'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
              item.isActive
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-red-500/20 text-red-400',
            ]"
          >
            {{ item.isActive ? "Active" : "Inactive" }}
          </span>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useVolunteerTeamStore } from "~/stores/volunteer-team";
import { useChurchStore } from "~/stores/church";
import { useRouter } from "vue-router";

const router = useRouter();
const teamStore = useVolunteerTeamStore();
const churchStore = useChurchStore();

const loading = computed(() => teamStore.loading);
const teams = computed(() => teamStore.teams);
const currentChurch = computed(() => churchStore.currentChurch);

// Filters and state
const filters = ref({
  isActive: null as boolean | null,
  hasLeader: null as boolean | null,
  search: "",
});

const stats = ref({
  totalTeams: 0,
  activeTeams: 0,
  totalMembers: 0,
});

// Table configuration
const columns = [
  { key: "name", label: "Team Name", sortable: true },
  { key: "description", label: "Description", sortable: false },
  { key: "leader", label: "Leader", sortable: false },
  {
    key: "memberCount",
    label: "Members",
    sortable: true,
    type: "number" as const,
  },
  { key: "isActive", label: "Status", sortable: true },
  { key: "createdAt", label: "Created", type: "date" as const, sortable: true },
];

const actions = [
  {
    key: "view",
    label: "View Details",
    handler: (team: any) => router.push(`/volunteer-teams/${team._id}`),
  },
  {
    key: "edit",
    label: "Edit",
    handler: (team: any) => router.push(`/volunteer-teams/${team._id}/edit`),
  },
  {
    key: "manage_members",
    label: "Manage Members",
    handler: (team: any) => router.push(`/volunteer-teams/${team._id}/members`),
  },
  {
    key: "schedule",
    label: "View Schedule",
    handler: (team: any) =>
      router.push(`/volunteer-teams/${team._id}/schedule`),
  },
  {
    key: "toggle_status",
    label: "Toggle Status",
    handler: toggleTeamStatus,
  },
  {
    key: "delete",
    label: "Delete",
    handler: deleteTeam,
  },
];

// Methods
const applyFilters = async () => {
  if (!currentChurch.value) return;

  try {
    await teamStore.fetchTeams(currentChurch.value._id);
    calculateStats();
  } catch (error) {
    console.error("Error applying filters:", error);
  }
};

const refreshTeams = async () => {
  await applyFilters();
};

const toggleTeamStatus = async (team: any) => {
  if (
    !confirm(
      `Are you sure you want to ${team.isActive ? "deactivate" : "activate"} this team?`
    )
  )
    return;

  try {
    await teamStore.updateTeam(team._id, { isActive: !team.isActive });
    calculateStats();
  } catch (error) {
    console.error("Error updating team status:", error);
  }
};

const deleteTeam = async (team: any) => {
  if (
    !confirm(
      `Are you sure you want to delete "${team.name}"? This action cannot be undone.`
    )
  )
    return;

  try {
    await teamStore.deleteTeam(team._id);
    calculateStats();
  } catch (error) {
    console.error("Error deleting team:", error);
  }
};

const calculateStats = () => {
  const allTeams = teamStore.teams;
  stats.value = {
    totalTeams: allTeams.length,
    activeTeams: allTeams.filter((team) => team.isActive).length,
    totalMembers: allTeams.reduce(
      (sum, team) => sum + (team.memberIds?.length || 0),
      0
    ),
  };
};

const exportTeams = () => {
  // TODO: Implement export functionality
  console.log("Exporting teams:", teams.value);
};

const handleAction = (action: any, item: any) => {
  // This will be handled by the individual action handlers
};

// Initialize
onMounted(async () => {
  if (currentChurch.value) {
    await applyFilters();
  }
});
</script>
