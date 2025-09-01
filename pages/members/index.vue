<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Page Header -->
    <div class="container-responsive py-8">
      <div class="glass-card p-8 mb-8 fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold gradient-text mb-2">Members</h1>
            <p class="text-white/80 text-lg">
              Manage your church members and their information.
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="showBulkActions = !showBulkActions"
              :class="[
                'btn-ghost',
                selectedMembers.length > 0
                  ? 'text-purple-400'
                  : 'text-white/60',
              ]"
              :disabled="selectedMembers.length === 0"
            >
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Bulk Actions ({{ selectedMembers.length }})
            </button>
            <button @click="showImportModal = true" class="btn-ghost">
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
              Import
            </button>
            <NuxtLink to="/members/create" class="btn-primary">
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
              Add Member
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bulk Actions Panel -->
      <div v-if="showBulkActions" class="glass-card p-6 mb-8 slide-up">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="bulkMarkAsFirstTimer" class="btn-ghost text-sm">
              Mark as First Timer
            </button>
            <button @click="bulkSendNotification" class="btn-ghost text-sm">
              Send Notification
            </button>
            <button @click="bulkExport" class="btn-ghost text-sm">
              Export Data
            </button>
          </div>
          <button
            @click="clearSelection"
            class="text-white/60 hover:text-white"
          >
            Clear Selection
          </button>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="glass-card p-6 mb-8 slide-up">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <label class="form-label">Search Members</label>
            <input
              v-model="filters.search"
              type="text"
              class="form-input"
              placeholder="Search by name, email, or phone..."
              @input="debouncedSearch"
            />
          </div>

          <!-- Status Filter -->
          <div>
            <label class="form-label">Status</label>
            <select
              v-model="filters.isActive"
              @change="applyFilters"
              class="form-input"
            >
              <option :value="undefined">All Status</option>
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>

          <!-- First Timer Filter -->
          <div>
            <label class="form-label">First Timer</label>
            <select
              v-model="filters.isFirstTimer"
              @change="applyFilters"
              class="form-input"
            >
              <option :value="undefined">All Members</option>
              <option :value="true">First Timers</option>
              <option :value="false">Regular Members</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Members List -->
      <div class="glass-card p-6 slide-up">
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="loading-spinner w-12 h-12"></div>
        </div>

        <div v-else-if="members.length === 0" class="text-center py-12">
          <div class="icon-container w-16 h-16 mx-auto mb-4">
            <svg
              class="w-8 h-8 text-white/60"
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
          <p class="text-white/60 mb-4">No members found</p>
          <NuxtLink to="/members/create" class="btn-primary">
            Add Your First Member
          </NuxtLink>
        </div>

        <div v-else class="space-y-4">
          <!-- Select All -->
          <div
            class="flex items-center justify-between pb-4 border-b border-white/10"
          >
            <div class="flex items-center">
              <input
                id="select-all"
                v-model="selectAll"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
              />
              <label for="select-all" class="ml-2 text-sm text-white/80">
                Select All ({{ members.length }} members)
              </label>
            </div>
            <div class="text-sm text-white/60">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} -
              {{ Math.min(currentPage * itemsPerPage, totalMembers) }} of
              {{ totalMembers }}
            </div>
          </div>

          <!-- Member Rows -->
          <div
            v-for="member in paginatedMembers"
            :key="member._id"
            class="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
          >
            <div class="flex items-center space-x-4">
              <input
                :id="`member-${member._id}`"
                v-model="selectedMembers"
                :value="member._id"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
              />

              <div class="flex-shrink-0">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-semibold">
                    {{ member.firstName?.[0] }}{{ member.lastName?.[0] }}
                  </span>
                </div>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2">
                  <h3 class="text-white font-medium truncate">
                    {{ member.firstName }} {{ member.lastName }}
                  </h3>
                  <span
                    v-if="member.isFirstTimer"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400"
                  >
                    First Timer
                  </span>
                  <span
                    v-if="!member.isActive"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400"
                  >
                    Inactive
                  </span>
                </div>
                <p class="text-white/60 text-sm truncate">{{ member.email }}</p>
                <p class="text-white/60 text-sm truncate">{{ member.phone }}</p>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <button
                @click="viewMember(member._id)"
                class="btn-ghost text-sm"
                title="View Details"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
              <button
                @click="editMember(member._id)"
                class="btn-ghost text-sm"
                title="Edit Member"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                @click="deleteMember(member._id)"
                class="btn-ghost text-sm text-red-400 hover:text-red-300"
                title="Delete Member"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex items-center justify-between pt-6 border-t border-white/10"
        >
          <div class="flex items-center space-x-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="btn-ghost text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="text-white/60 text-sm">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="btn-ghost text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "~/stores/member";
import { useChurchStore } from "~/stores/church";

const router = useRouter();

definePageMeta({
  layout: "default",
  middleware: "auth",
});

const memberStore = useMemberStore();
const churchStore = useChurchStore();

const loading = computed(() => memberStore.loading);
const members = computed(() => memberStore.members);
const currentChurch = computed(() => churchStore.currentChurch);

// Filters and pagination
const filters = ref({
  search: "",
  isActive: undefined as boolean | undefined,
  isFirstTimer: undefined as boolean | undefined,
});

const currentPage = ref(1);
const itemsPerPage = ref(20);
const selectedMembers = ref<string[]>([]);
const showBulkActions = ref(false);
const showImportModal = ref(false);

// Computed properties
const selectAll = computed({
  get: () =>
    selectedMembers.value.length === paginatedMembers.value.length &&
    paginatedMembers.value.length > 0,
  set: (value) => {
    if (value) {
      selectedMembers.value = paginatedMembers.value.map((m) => m._id);
    } else {
      selectedMembers.value = [];
    }
  },
});

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return members.value.slice(start, end);
});

const totalMembers = computed(() => members.value.length);
const totalPages = computed(() =>
  Math.ceil(totalMembers.value / itemsPerPage.value)
);

// Methods
const applyFilters = async () => {
  if (!currentChurch.value) return;

  try {
    await memberStore.fetchMembers(currentChurch.value._id, {
      search: filters.value.search || undefined,
      isActive: filters.value.isActive,
      isFirstTimer: filters.value.isFirstTimer,
    });
    currentPage.value = 1;
    selectedMembers.value = [];
  } catch (error) {
    console.error("Error applying filters:", error);
  }
};

const debouncedSearch = (() => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(applyFilters, 500);
  };
})();

const viewMember = (memberId: string) => {
  router.push(`/members/${memberId}`);
};

const editMember = (memberId: string) => {
  router.push(`/members/${memberId}/edit`);
};

const deleteMember = async (memberId: string) => {
  if (!confirm("Are you sure you want to delete this member?")) return;

  try {
    await memberStore.deleteMember(memberId);
  } catch (error) {
    console.error("Error deleting member:", error);
  }
};

const clearSelection = () => {
  selectedMembers.value = [];
  showBulkActions.value = false;
};

const bulkMarkAsFirstTimer = async () => {
  if (selectedMembers.value.length === 0) return;

  try {
    for (const memberId of selectedMembers.value) {
      await memberStore.markAsFirstTimer(memberId);
    }
    selectedMembers.value = [];
    showBulkActions.value = false;
  } catch (error) {
    console.error("Error marking members as first timers:", error);
  }
};

const bulkSendNotification = () => {
  // TODO: Implement bulk notification sending
  console.log("Bulk send notification to:", selectedMembers.value);
};

const bulkExport = () => {
  // TODO: Implement bulk export
  console.log("Bulk export members:", selectedMembers.value);
};

// Watch for church changes
watch(currentChurch, async (newChurch) => {
  if (newChurch) {
    await applyFilters();
  }
});

// Initialize
onMounted(async () => {
  if (currentChurch.value) {
    await applyFilters();
  }
});
</script>
