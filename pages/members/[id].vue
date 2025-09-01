<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Page Header -->
    <div class="container-responsive py-8">
      <div class="glass-card p-8 mb-8 fade-in">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="router.back()" class="btn-ghost">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <div>
              <h1 class="text-4xl font-bold gradient-text mb-2">
                {{ member?.firstName }} {{ member?.lastName }}
              </h1>
              <p class="text-white/80 text-lg">Member Details & Management</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="showEditModal = true" class="btn-ghost">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            <button
              @click="toggleMemberStatus"
              :class="[
                'btn-ghost',
                member?.isActive
                  ? 'text-red-400 hover:text-red-300'
                  : 'text-emerald-400 hover:text-emerald-300',
              ]"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                />
              </svg>
              {{ member?.isActive ? "Deactivate" : "Activate" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="loading-spinner w-12 h-12"></div>
      </div>

      <!-- Member Details -->
      <div v-else-if="member" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Information -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Basic Information -->
          <div class="glass-card p-6 slide-up">
            <h2 class="text-2xl font-bold gradient-text mb-6">
              Basic Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">First Name</label>
                <p class="text-white/80">{{ member.firstName }}</p>
              </div>
              <div>
                <label class="form-label">Last Name</label>
                <p class="text-white/80">{{ member.lastName }}</p>
              </div>
              <div>
                <label class="form-label">Email</label>
                <p class="text-white/80">{{ member.email }}</p>
              </div>
              <div>
                <label class="form-label">Phone</label>
                <p class="text-white/80">
                  {{ member.phone || "Not provided" }}
                </p>
              </div>
              <div>
                <label class="form-label">Date of Birth</label>
                <p class="text-white/80">
                  {{
                    member.dateOfBirth
                      ? formatDate(member.dateOfBirth)
                      : "Not provided"
                  }}
                </p>
              </div>
              <div>
                <label class="form-label">Gender</label>
                <p class="text-white/80">
                  {{
                    member.gender ? capitalize(member.gender) : "Not specified"
                  }}
                </p>
              </div>
              <div>
                <label class="form-label">Marital Status</label>
                <p class="text-white/80">
                  {{
                    member.maritalStatus
                      ? capitalize(member.maritalStatus)
                      : "Not specified"
                  }}
                </p>
              </div>
              <div>
                <label class="form-label">Occupation</label>
                <p class="text-white/80">
                  {{ member.occupation || "Not specified" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Church Information -->
          <div class="glass-card p-6 slide-up">
            <h2 class="text-2xl font-bold gradient-text mb-6">
              Church Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">Membership Date</label>
                <p class="text-white/80">
                  {{ formatDate(member.membershipDate) }}
                </p>
              </div>
              <div>
                <label class="form-label">Status</label>
                <span
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                    member.isActive
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400',
                  ]"
                >
                  {{ member.isActive ? "Active" : "Inactive" }}
                </span>
              </div>
              <div>
                <label class="form-label">First Timer</label>
                <span
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                    member.isFirstTimer
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-slate-500/20 text-slate-400',
                  ]"
                >
                  {{ member.isFirstTimer ? "Yes" : "No" }}
                </span>
              </div>
              <div>
                <label class="form-label">Baptism Date</label>
                <p class="text-white/80">
                  {{
                    member.baptismDate
                      ? formatDate(member.baptismDate)
                      : "Not baptized"
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div v-if="member.address" class="glass-card p-6 slide-up">
            <h2 class="text-2xl font-bold gradient-text mb-6">
              Address Information
            </h2>
            <p class="text-white/80">{{ member.address }}</p>
          </div>

          <!-- Recent Attendance -->
          <div class="glass-card p-6 slide-up">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold gradient-text">
                Recent Attendance
              </h2>
              <button
                @click="showAttendanceModal = true"
                class="btn-ghost text-sm"
              >
                Add Attendance
              </button>
            </div>
            <div v-if="recentAttendance.length === 0" class="text-center py-8">
              <p class="text-white/60">No attendance records found</p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="record in recentAttendance"
                :key="record._id"
                class="flex items-center justify-between p-4 rounded-xl bg-white/5"
              >
                <div>
                  <p class="text-white font-medium">{{ record.serviceId }}</p>
                  <p class="text-white/60 text-sm">
                    {{ formatDate(record.date) }}
                  </p>
                </div>
                <span
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                    record.status === 'present'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : record.status === 'late'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400',
                  ]"
                >
                  {{ capitalize(record.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Quick Actions -->
          <div class="glass-card p-6 slide-up">
            <h3 class="text-xl font-bold gradient-text mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button
                @click="markAsFirstTimer"
                :disabled="member.isFirstTimer"
                :class="[
                  'w-full btn-ghost text-left',
                  member.isFirstTimer ? 'opacity-50 cursor-not-allowed' : '',
                ]"
              >
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                Mark as First Timer
              </button>
              <button
                @click="showBaptismModal = true"
                :disabled="!!member.baptismDate"
                :class="[
                  'w-full btn-ghost text-left',
                  member.baptismDate ? 'opacity-50 cursor-not-allowed' : '',
                ]"
              >
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Record Baptism
              </button>
              <button
                @click="showVolunteerModal = true"
                class="w-full btn-ghost text-left"
              >
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Manage Volunteer Teams
              </button>
            </div>
          </div>

          <!-- Volunteer Teams -->
          <div class="glass-card p-6 slide-up">
            <h3 class="text-xl font-bold gradient-text mb-4">
              Volunteer Teams
            </h3>
            <div
              v-if="member.volunteerTeams && member.volunteerTeams.length > 0"
              class="space-y-2"
            >
              <div
                v-for="teamId in member.volunteerTeams"
                :key="teamId"
                class="flex items-center justify-between p-3 rounded-lg bg-white/5"
              >
                <span class="text-white/80 text-sm">{{ teamId }}</span>
                <button
                  @click="removeFromTeam(teamId)"
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
            <p v-else class="text-white/60 text-sm">
              Not assigned to any teams
            </p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-12">
        <div class="icon-container w-16 h-16 mx-auto mb-4">
          <svg
            class="w-8 h-8 text-red-400"
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
        <h3 class="text-xl font-semibold text-white mb-2">Member Not Found</h3>
        <p class="text-white/60 mb-6">
          The member you're looking for doesn't exist or has been removed.
        </p>
        <button @click="router.push('/members')" class="btn-primary">
          Back to Members
        </button>
      </div>
    </div>

    <!-- Edit Member Modal -->
    <!-- TODO: Implement edit modal -->

    <!-- Attendance Modal -->
    <!-- TODO: Implement attendance modal -->

    <!-- Baptism Modal -->
    <!-- TODO: Implement baptism modal -->

    <!-- Volunteer Teams Modal -->
    <!-- TODO: Implement volunteer teams modal -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMemberStore } from "~/stores/member";
import { useVolunteerTeamStore } from "~/stores/volunteer-team";

const router = useRouter();
const route = useRoute();
const memberStore = useMemberStore();
const volunteerStore = useVolunteerTeamStore();

const memberId = route.params.id as string;
const member = computed(() => memberStore.currentMember);
const loading = computed(() => memberStore.loading);

// Modal states
const showEditModal = ref(false);
const showAttendanceModal = ref(false);
const showBaptismModal = ref(false);
const showVolunteerModal = ref(false);

// Mock data for recent attendance (replace with actual API call)
const recentAttendance = ref([
  {
    _id: "1",
    serviceId: "Sunday Service",
    date: "2024-01-07",
    status: "present" as const,
  },
  {
    _id: "2",
    serviceId: "Wednesday Prayer",
    date: "2024-01-03",
    status: "present" as const,
  },
  {
    _id: "3",
    serviceId: "Sunday Service",
    date: "2023-12-31",
    status: "late" as const,
  },
]);

// Methods
const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const toggleMemberStatus = async () => {
  if (!member.value) return;

  try {
    await memberStore.updateMember(memberId, {
      isActive: !member.value.isActive,
    });
  } catch (error) {
    console.error("Error updating member status:", error);
  }
};

const markAsFirstTimer = async () => {
  if (!member.value || member.value.isFirstTimer) return;

  try {
    await memberStore.markAsFirstTimer(memberId);
  } catch (error) {
    console.error("Error marking as first timer:", error);
  }
};

const removeFromTeam = async (teamId: string) => {
  try {
    await memberStore.addToVolunteerTeam(memberId, teamId); // This will actually remove from team
  } catch (error) {
    console.error("Error removing from team:", error);
  }
};

// Initialize
onMounted(async () => {
  try {
    await memberStore.fetchMember(memberId);
  } catch (error) {
    console.error("Error fetching member:", error);
  }
});
</script>
