import { defineStore } from "pinia";
import { reactive, computed, toRefs } from "vue";

interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  maritalStatus?: "single" | "married" | "divorced" | "widowed";
  occupation?: string;
  churchId: string;
  membershipDate: string;
  isActive: boolean;
  isFirstTimer: boolean;
  baptismDate?: string;
  volunteerTeams?: string[];
  createdAt: string;
  updatedAt: string;
}

interface Attendance {
  _id: string;
  memberId: string;
  serviceId: string;
  date: string;
  status: "present" | "absent" | "late";
  notes?: string;
}

interface MemberState {
  members: Member[];
  currentMember: Member | null;
  attendance: Attendance[];
  loading: boolean;
  error: string | null;
}

export const useMemberStore = defineStore("member", () => {
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000/api";

  const state = reactive<MemberState>({
    members: [],
    currentMember: null,
    attendance: [],
    loading: false,
    error: null,
  });

  // Getters
  const activeMembers = computed(() =>
    state.members.filter((member) => member.isActive)
  );

  const firstTimers = computed(() =>
    state.members.filter((member) => member.isFirstTimer)
  );

  const baptizedMembers = computed(() =>
    state.members.filter((member) => member.baptismDate)
  );

  const memberCount = computed(() => state.members.length);

  // Actions
  const fetchMembers = async (
    churchId: string,
    filters?: {
      search?: string;
      isActive?: boolean;
      isFirstTimer?: boolean;
      volunteerTeamId?: string;
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
        `${apiBaseUrl}/members/church/${churchId}?${queryParams.toString()}`
      )) as { members: Member[] };

      state.members = response.members;
      return response.members;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch members";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const fetchMember = async (memberId: string) => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/members/${memberId}`)) as {
        member: Member;
      };
      state.currentMember = response.member;
      return state.currentMember;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch member";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const createMember = async (memberData: Partial<Member>) => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/members`, {
        method: "POST",
        body: memberData,
      })) as { member: Member };

      const newMember = response.member;
      state.members.push(newMember);
      return newMember;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create member";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const updateMember = async (
    memberId: string,
    updateData: Partial<Member>
  ) => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/members/${memberId}`, {
        method: "PUT",
        body: updateData,
      })) as { member: Member };

      const updatedMember = response.member;

      // Update in members array
      const index = state.members.findIndex((m) => m._id === memberId);
      if (index !== -1) {
        state.members[index] = updatedMember;
      }

      // Update current member if it's the one being updated
      if (state.currentMember?._id === memberId) {
        state.currentMember = updatedMember;
      }

      return updatedMember;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to update member";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const deleteMember = async (memberId: string) => {
    state.loading = true;
    try {
      await $fetch(`${apiBaseUrl}/members/${memberId}`, { method: "DELETE" });

      // Remove from members array
      state.members = state.members.filter((m) => m._id !== memberId);

      // Clear current member if it's the one being deleted
      if (state.currentMember?._id === memberId) {
        state.currentMember = null;
      }

      return true;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to delete member";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const addAttendance = async (
    memberId: string,
    attendanceData: {
      serviceId: string;
      date: string;
      status: "present" | "absent" | "late";
      notes?: string;
    }
  ) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/members/${memberId}/attendance`,
        {
          method: "POST",
          body: attendanceData,
        }
      )) as { attendance: Attendance };

      state.attendance.push(response.attendance);
      return response.attendance;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to add attendance";
      throw error;
    }
  };

  const addToVolunteerTeam = async (memberId: string, teamId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/members/${memberId}/volunteer-teams`,
        {
          method: "POST",
          body: { teamId },
        }
      )) as { member: Member };

      // Update member in store
      const index = state.members.findIndex((m) => m._id === memberId);
      if (index !== -1) {
        state.members[index] = response.member;
      }

      if (state.currentMember?._id === memberId) {
        state.currentMember = response.member;
      }

      return response.member;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to add to volunteer team";
      throw error;
    }
  };

  const markAsFirstTimer = async (memberId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/members/${memberId}/first-timer`,
        {
          method: "POST",
        }
      )) as { member: Member };

      // Update member in store
      const index = state.members.findIndex((m) => m._id === memberId);
      if (index !== -1) {
        state.members[index] = response.member;
      }

      if (state.currentMember?._id === memberId) {
        state.currentMember = response.member;
      }

      return response.member;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to mark as first timer";
      throw error;
    }
  };

  const recordBaptism = async (
    memberId: string,
    baptismData: { date: string; notes?: string }
  ) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/members/${memberId}/baptism`,
        {
          method: "POST",
          body: baptismData,
        }
      )) as { member: Member };

      // Update member in store
      const index = state.members.findIndex((m) => m._id === memberId);
      if (index !== -1) {
        state.members[index] = response.member;
      }

      if (state.currentMember?._id === memberId) {
        state.currentMember = response.member;
      }

      return response.member;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to record baptism";
      throw error;
    }
  };

  const bulkImportMembers = async (membersData: Partial<Member>[]) => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/members/bulk-import`, {
        method: "POST",
        body: { members: membersData },
      })) as { members: Member[]; imported: number; failed: number };

      // Add imported members to store
      state.members.push(...response.members);

      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to import members";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const clearError = () => {
    state.error = null;
  };

  return {
    // State
    ...toRefs(state),

    // Getters
    activeMembers,
    firstTimers,
    baptizedMembers,
    memberCount,

    // Actions
    fetchMembers,
    fetchMember,
    createMember,
    updateMember,
    deleteMember,
    addAttendance,
    addToVolunteerTeam,
    markAsFirstTimer,
    recordBaptism,
    bulkImportMembers,
    clearError,
  };
});
