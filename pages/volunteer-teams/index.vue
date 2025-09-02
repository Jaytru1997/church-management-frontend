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
              Organize and manage church volunteer teams and activities.
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
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="stats-card bounce-in">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">Total Teams</p>
              <p class="text-3xl font-bold text-white">
                {{ stats.totalTeams }}
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
              <p class="text-white/60 text-sm font-medium mb-1">
                Active Members
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.totalMembers }}
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Upcoming Events
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.upcomingEvents }}
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                This Month's Activities
              </p>
              <p class="text-3xl font-bold text-white">
                {{ stats.monthlyActivities }}
              </p>
            </div>
            <div class="icon-container">
              <svg
                class="w-8 h-8 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="glass-card p-6 mb-8 slide-up">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search teams..."
                class="form-input pl-10"
              />
              <svg
                class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              v-model="statusFilter"
              @change="applyFilters"
              class="form-input"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div class="flex items-center space-x-2">
            <button
              @click="toggleView('grid')"
              :class="[
                'btn-ghost',
                viewMode === 'grid' ? 'bg-purple-500/20' : '',
              ]"
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              @click="toggleView('list')"
              :class="[
                'btn-ghost',
                viewMode === 'list' ? 'bg-purple-500/20' : '',
              ]"
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Bulk Actions -->
        <div
          v-if="selectedTeams.length > 0"
          class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg"
        >
          <span class="text-sm text-white/60"
            >{{ selectedTeams.length }} selected</span
          >
          <button @click="bulkActivate" class="btn-ghost text-sm">
            Activate
          </button>
          <button @click="bulkDeactivate" class="btn-ghost text-sm">
            Deactivate
          </button>
          <button @click="bulkDelete" class="btn-ghost text-sm">Delete</button>
          <button
            @click="clearSelection"
            class="text-white/60 hover:text-white text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- Teams Grid/List View -->
      <div
        v-if="viewMode === 'grid'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="team in filteredTeams"
          :key="team.id"
          class="glass-card p-6 hover:glass-card-hover transition-all cursor-pointer"
          @click="viewTeam(team.id)"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-white mb-2">{{ team.name }}</h3>
              <p class="text-white/70 text-sm mb-3">{{ team.description }}</p>
            </div>
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                team.isActive
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400',
              ]"
            >
              {{ team.isActive ? "Active" : "Inactive" }}
            </span>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-white/60 text-sm">Leader</span>
              <span class="text-white text-sm">{{
                team.leaderName || "Not assigned"
              }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-white/60 text-sm">Members</span>
              <span class="text-white text-sm">{{
                team.memberCount || 0
              }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-white/60 text-sm">Upcoming Events</span>
              <span class="text-white text-sm">{{
                team.upcomingEvents || 0
              }}</span>
            </div>
          </div>

          <div class="flex items-center space-x-2 mt-6">
            <button
              @click.stop="editTeam(team.id)"
              class="btn-secondary text-sm flex-1"
            >
              Edit
            </button>
            <button
              @click.stop="manageMembers(team.id)"
              class="btn-ghost text-sm flex-1"
            >
              Members
            </button>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="glass-card p-6 slide-up">
        <DataTable
          title="Volunteer Teams"
          :items="filteredTeams"
          :columns="columns"
          :actions="actions"
          :loading="loading"
          empty-message="No volunteer teams found"
          @action="handleAction"
        >
          <template #column-status="{ item }">
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                item.isActive
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400',
              ]"
            >
              {{ item.isActive ? "Active" : "Inactive" }}
            </span>
          </template>

          <template #column-leader="{ item }">
            <span class="text-white">{{
              item.leaderName || "Not assigned"
            }}</span>
          </template>

          <template #column-members="{ item }">
            <span class="text-white">{{ item.memberCount || 0 }}</span>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useVolunteerTeamStore } from "~/stores/volunteer-team";
import { useChurchStore } from "~/stores/church";

const teamStore = useVolunteerTeamStore();
const churchStore = useChurchStore();

const loading = computed(() => teamStore.loading);
const teams = computed(() => teamStore.teams);
const currentChurch = computed(() => churchStore.currentChurch);

// State
const searchQuery = ref("");
const statusFilter = ref("");
const viewMode = ref("grid");
const selectedTeams = ref<string[]>([]);

const stats = ref({
  totalTeams: 0,
  totalMembers: 0,
  upcomingEvents: 0,
  monthlyActivities: 0,
});

// Mock data for teams
const mockTeams = ref([
  {
    id: "1",
    name: "Worship Team",
    description: "Leading worship services and music ministry",
    isActive: true,
    leaderName: "Sarah Johnson",
    memberCount: 12,
    upcomingEvents: 3,
  },
  {
    id: "2",
    name: "Children's Ministry",
    description: "Sunday school and children's programs",
    isActive: true,
    leaderName: "Michael Davis",
    memberCount: 8,
    upcomingEvents: 2,
  },
  {
    id: "3",
    name: "Youth Ministry",
    description: "Teenage ministry and youth programs",
    isActive: true,
    leaderName: "Emily Chen",
    memberCount: 15,
    upcomingEvents: 4,
  },
  {
    id: "4",
    name: "Outreach Team",
    description: "Community outreach and evangelism",
    isActive: false,
    leaderName: null,
    memberCount: 6,
    upcomingEvents: 0,
  },
]);

// Computed
const filteredTeams = computed(() => {
  let filtered = mockTeams.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (team) =>
        team.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        team.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (statusFilter.value) {
    filtered = filtered.filter((team) =>
      statusFilter.value === "active" ? team.isActive : !team.isActive
    );
  }

  return filtered;
});

// Methods
const applyFilters = () => {
  // Filters are applied reactively through computed properties
};

const toggleView = (mode: string) => {
  viewMode.value = mode;
};

const viewTeam = (teamId: string) => {
  // Navigate to team detail page
  console.log("View team:", teamId);
};

const editTeam = (teamId: string) => {
  // Navigate to edit form
  console.log("Edit team:", teamId);
};

const manageMembers = (teamId: string) => {
  // Navigate to member management
  console.log("Manage members for team:", teamId);
};

const viewSchedule = (teamId: string) => {
  // Navigate to schedule view
  console.log("View schedule for team:", teamId);
};

const deleteTeam = (teamId: string) => {
  if (!confirm("Are you sure you want to delete this team?")) return;
  console.log("Delete team:", teamId);
};

// Table configuration
const columns = [
  { key: "name", label: "Team Name", sortable: true },
  { key: "description", label: "Description", sortable: false },
  { key: "leader", label: "Leader", sortable: true },
  { key: "members", label: "Members", sortable: true, type: "number" as const },
  { key: "status", label: "Status", sortable: true },
];

const actions = [
  {
    key: "view",
    label: "View Details",
    handler: (team: any) => viewTeam(team.id),
  },
  {
    key: "edit",
    label: "Edit",
    handler: (team: any) => editTeam(team.id),
  },
  {
    key: "members",
    label: "Manage Members",
    handler: (team: any) => manageMembers(team.id),
  },
  {
    key: "schedule",
    label: "View Schedule",
    handler: (team: any) => viewSchedule(team.id),
  },
  {
    key: "delete",
    label: "Delete",
    handler: (team: any) => deleteTeam(team.id),
  },
];

const bulkActivate = () => {
  console.log("Bulk activate teams:", selectedTeams.value);
  selectedTeams.value = [];
};

const bulkDeactivate = () => {
  console.log("Bulk deactivate teams:", selectedTeams.value);
  selectedTeams.value = [];
};

const bulkDelete = () => {
  if (
    !confirm(
      `Are you sure you want to delete ${selectedTeams.value.length} teams?`
    )
  )
    return;
  console.log("Bulk delete teams:", selectedTeams.value);
  selectedTeams.value = [];
};

const clearSelection = () => {
  selectedTeams.value = [];
};

const exportTeams = () => {
  console.log("Exporting teams:", teams.value);
};

const handleAction = (action: any, item: any) => {
  // This will be handled by the individual action handlers
};

const calculateStats = () => {
  const activeTeams = mockTeams.value.filter((team) => team.isActive);
  const totalMembers = mockTeams.value.reduce(
    (sum, team) => sum + (team.memberCount || 0),
    0
  );
  const upcomingEvents = mockTeams.value.reduce(
    (sum, team) => sum + (team.upcomingEvents || 0),
    0
  );

  stats.value = {
    totalTeams: mockTeams.value.length,
    totalMembers,
    upcomingEvents,
    monthlyActivities: 24, // Mock data
  };
};

// Initialize
onMounted(async () => {
  if (currentChurch.value) {
    // In a real app, this would fetch from the API
    // await teamStore.fetchTeams(currentChurch.value._id);
  }

  calculateStats();
});
</script>
