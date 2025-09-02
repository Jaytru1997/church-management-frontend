<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Page Header -->
    <div class="container-responsive py-8">
      <div class="glass-card p-8 mb-8 fade-in">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
            >
              <span class="text-3xl font-bold text-white">
                {{ member?.firstName?.charAt(0)
                }}{{ member?.lastName?.charAt(0) }}
              </span>
            </div>
            <div>
              <h1 class="text-4xl font-bold gradient-text">
                {{ member?.firstName }} {{ member?.lastName }}
              </h1>
              <div class="flex items-center space-x-4 mt-2">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400"
                >
                  {{ member?.isActive ? "Active" : "Inactive" }}
                </span>
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400"
                >
                  {{ member?.isFirstTimer ? "First Timer" : "Regular Member" }}
                </span>
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400"
                >
                  {{ member?.isBaptized ? "Baptized" : "Not Baptized" }}
                </span>
              </div>
              <p class="text-white/60 mt-2">
                Member since {{ formatDate(member?.membershipDate) }}
              </p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <button @click="editMember" class="btn-secondary">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Member
            </button>
            <button @click="recordAttendance" class="btn-primary">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0 1 18 0z"
                />
              </svg>
              Record Attendance
            </button>
          </div>
        </div>
      </div>

      <!-- Member Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="stats-card bounce-in">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Total Donations
              </p>
              <p class="text-3xl font-bold text-white">
                ₦{{ formatCurrency(memberStats.totalDonations) }}
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Attendance Rate
              </p>
              <p class="text-3xl font-bold text-white">
                {{ memberStats.attendanceRate }}%
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
                Volunteer Teams
              </p>
              <p class="text-3xl font-bold text-white">
                {{ member?.volunteerTeams?.length || 0 }}
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stats-card bounce-in" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/60 text-sm font-medium mb-1">
                Membership Status
              </p>
              <p class="text-3xl font-bold text-white">
                {{ memberStats.membershipYears }}y
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Member Details -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Personal Information -->
          <div class="glass-card p-6 slide-up">
            <h2 class="text-2xl font-bold gradient-text mb-6">
              Personal Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">Email</label>
                <p class="text-white">{{ member?.email }}</p>
              </div>
              <div>
                <label class="form-label">Phone</label>
                <p class="text-white">{{ member?.phone || "Not provided" }}</p>
              </div>
              <div>
                <label class="form-label">Date of Birth</label>
                <p class="text-white">
                  {{
                    member?.dateOfBirth
                      ? formatDate(member.dateOfBirth)
                      : "Not provided"
                  }}
                </p>
              </div>
              <div>
                <label class="form-label">Gender</label>
                <p class="text-white">
                  {{
                    member?.gender ? capitalize(member.gender) : "Not specified"
                  }}
                </p>
              </div>
              <div>
                <label class="form-label">Marital Status</label>
                <p class="text-white">
                  {{
                    member?.maritalStatus
                      ? capitalize(member.maritalStatus)
                      : "Not specified"
                  }}
                </p>
              </div>
              <div>
                <label class="form-label">Occupation</label>
                <p class="text-white">
                  {{ member?.occupation || "Not specified" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div v-if="member?.address" class="glass-card p-6 slide-up">
            <h2 class="text-2xl font-bold gradient-text mb-6">
              Address Information
            </h2>
            <p class="text-white">{{ member.address }}</p>
          </div>

          <!-- Recent Donations -->
          <div class="glass-card p-6 slide-up">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold gradient-text">Recent Donations</h2>
              <NuxtLink to="/donations" class="btn-ghost text-sm"
                >View all</NuxtLink
              >
            </div>

            <div v-if="recentDonations.length === 0" class="text-center py-8">
              <p class="text-white/60">No donations recorded yet</p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="donation in recentDonations"
                :key="donation.id"
                class="flex items-center justify-between p-4 rounded-lg bg-white/5"
              >
                <div>
                  <p class="text-white font-medium">{{ donation.category }}</p>
                  <p class="text-white/60 text-sm">
                    {{ formatDate(donation.date) }}
                  </p>
                </div>
                <span class="text-emerald-400 font-semibold">
                  ₦{{ formatCurrency(donation.amount) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Attendance History -->
          <div class="glass-card p-6 slide-up">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold gradient-text">
                Attendance History
              </h2>
              <button @click="recordAttendance" class="btn-primary text-sm">
                Record Attendance
              </button>
            </div>

            <div v-if="attendanceHistory.length === 0" class="text-center py-8">
              <p class="text-white/60">No attendance records yet</p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="record in attendanceHistory.slice(0, 10)"
                :key="record.id"
                class="flex items-center justify-between p-4 rounded-lg bg-white/5"
              >
                <div>
                  <p class="text-white font-medium">{{ record.service }}</p>
                  <p class="text-white/60 text-sm">
                    {{ formatDate(record.date) }}
                  </p>
                </div>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
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
          <!-- Volunteer Teams -->
          <div class="glass-card p-6 slide-up">
            <h2 class="text-2xl font-bold gradient-text mb-6">
              Volunteer Teams
            </h2>

            <div
              v-if="!member?.volunteerTeams?.length"
              class="text-center py-8"
            >
              <p class="text-white/60 text-sm">Not assigned to any teams</p>
              <button @click="assignToTeam" class="btn-primary text-sm mt-4">
                Assign to Team
              </button>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="team in member.volunteerTeams"
                :key="team.id"
                class="p-4 rounded-lg bg-white/5"
              >
                <h3 class="font-semibold text-white">{{ team.name }}</h3>
                <p class="text-white/60 text-sm">{{ team.role }}</p>
              </div>
              <button
                @click="assignToTeam"
                class="btn-secondary text-sm w-full"
              >
                Manage Teams
              </button>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="glass-card p-6 slide-up">
            <h2 class="text-2xl font-bold gradient-text mb-6">Quick Actions</h2>

            <div class="space-y-3">
              <button
                @click="recordDonation"
                class="btn-secondary w-full text-left"
              >
                <svg
                  class="w-4 h-4 mr-2 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                Record Donation
              </button>

              <button
                @click="sendMessage"
                class="btn-secondary w-full text-left"
              >
                <svg
                  class="w-4 h-4 mr-2 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Send Message
              </button>

              <button
                @click="markAsFirstTimer"
                class="btn-secondary w-full text-left"
              >
                <svg
                  class="w-4 h-4 mr-2 inline"
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
                @click="recordBaptism"
                class="btn-secondary w-full text-left"
              >
                <svg
                  class="w-4 h-4 mr-2 inline"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useMemberStore } from "~/stores/member";
import { useDonationStore } from "~/stores/donation";

const route = useRoute();
const memberStore = useMemberStore();
const donationStore = useDonationStore();

const member = ref(null);
const loading = ref(true);
const memberStats = ref({
  totalDonations: 0,
  attendanceRate: 0,
  membershipYears: 0,
});

const recentDonations = ref([
  { id: "1", category: "Tithes", amount: 50000, date: new Date() },
  {
    id: "2",
    category: "Offerings",
    amount: 25000,
    date: new Date(Date.now() - 86400000),
  },
]);

const attendanceHistory = ref([
  { id: "1", service: "Sunday Service", date: new Date(), status: "present" },
  {
    id: "2",
    service: "Midweek Service",
    date: new Date(Date.now() - 86400000),
    status: "present",
  },
  {
    id: "3",
    service: "Sunday Service",
    date: new Date(Date.now() - 172800000),
    status: "late",
  },
]);

// Methods
const editMember = () => {
  // Navigate to edit form
  console.log("Edit member:", member.value);
};

const recordAttendance = () => {
  // Open attendance modal
  console.log("Record attendance for:", member.value);
};

const recordDonation = () => {
  // Navigate to donation form with member pre-selected
  console.log("Record donation for:", member.value);
};

const sendMessage = () => {
  // Open message modal
  console.log("Send message to:", member.value);
};

const markAsFirstTimer = () => {
  // Mark as first timer
  console.log("Mark as first timer:", member.value);
};

const recordBaptism = () => {
  // Record baptism
  console.log("Record baptism for:", member.value);
};

const assignToTeam = () => {
  // Open team assignment modal
  console.log("Assign to team:", member.value);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Initialize
onMounted(async () => {
  const memberId = route.params.id as string;

  try {
    // Fetch member data
    member.value = await memberStore.fetchMember(memberId);

    // Calculate stats
    calculateMemberStats();

    // Fetch related data
    await fetchMemberData(memberId);
  } catch (error) {
    console.error("Error fetching member:", error);
  } finally {
    loading.value = false;
  }
});

const calculateMemberStats = () => {
  if (!member.value) return;

  // Calculate membership years
  const membershipDate = new Date(member.value.membershipDate);
  const now = new Date();
  const membershipYears = Math.floor(
    (now.getTime() - membershipDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  memberStats.value = {
    totalDonations: 125000, // This would come from API
    attendanceRate: 85, // This would be calculated from attendance records
    membershipYears,
  };
};

const fetchMemberData = async (memberId: string) => {
  try {
    // Fetch donations for this member
    // This would need to be implemented in the donation store
    // await donationStore.fetchDonationsByMember(memberId);
    // Fetch attendance records
    // This would need to be implemented in the member store
    // await memberStore.fetchAttendanceHistory(memberId);
  } catch (error) {
    console.error("Error fetching member data:", error);
  }
};
</script>
