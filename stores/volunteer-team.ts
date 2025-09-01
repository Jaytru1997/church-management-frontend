import { defineStore } from "pinia";
import { reactive, computed, toRefs } from "vue";

interface VolunteerTeam {
  _id: string;
  name: string;
  description?: string;
  churchId: string;
  leaderId?: string;
  leader?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  memberIds: string[];
  members?: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TeamSchedule {
  _id: string;
  teamId: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  assignments: Array<{
    memberId: string;
    role: string;
    member?: {
      _id: string;
      firstName: string;
      lastName: string;
    };
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VolunteerTeamState {
  teams: VolunteerTeam[];
  currentTeam: VolunteerTeam | null;
  schedules: TeamSchedule[];
  loading: boolean;
  error: string | null;
}

export const useVolunteerTeamStore = defineStore("volunteerTeam", () => {
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000/api";

  const state = reactive<VolunteerTeamState>({
    teams: [],
    currentTeam: null,
    schedules: [],
    loading: false,
    error: null,
  });

  // Getters
  const activeTeams = computed(() =>
    state.teams.filter((team) => team.isActive)
  );

  const teamsWithLeaders = computed(() =>
    state.teams.filter((team) => team.leaderId)
  );

  const teamCount = computed(() => state.teams.length);

  // Actions
  const fetchTeams = async (churchId: string) => {
    state.loading = true;
    state.error = null;

    try {
      const response = (await $fetch(
        `${apiBaseUrl}/volunteer-teams/church/${churchId}`
      )) as { teams: VolunteerTeam[] };

      state.teams = response.teams;
      return response.teams;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch volunteer teams";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const fetchTeam = async (teamId: string) => {
    state.loading = true;
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/volunteer-teams/${teamId}`
      )) as { team: VolunteerTeam };

      state.currentTeam = response.team;
      return state.currentTeam;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch volunteer team";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const createTeam = async (teamData: Partial<VolunteerTeam>) => {
    state.loading = true;
    try {
      const response = (await $fetch(`${apiBaseUrl}/volunteer-teams`, {
        method: "POST",
        body: teamData,
      })) as { team: VolunteerTeam };

      const newTeam = response.team;
      state.teams.push(newTeam);
      return newTeam;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create volunteer team";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const updateTeam = async (
    teamId: string,
    updateData: Partial<VolunteerTeam>
  ) => {
    state.loading = true;
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/volunteer-teams/${teamId}`,
        {
          method: "PUT",
          body: updateData,
        }
      )) as { team: VolunteerTeam };

      const updatedTeam = response.team;

      // Update in teams array
      const index = state.teams.findIndex((t) => t._id === teamId);
      if (index !== -1) {
        state.teams[index] = updatedTeam;
      }

      // Update current team if it's the one being updated
      if (state.currentTeam?._id === teamId) {
        state.currentTeam = updatedTeam;
      }

      return updatedTeam;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to update volunteer team";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const deleteTeam = async (teamId: string) => {
    state.loading = true;
    try {
      await $fetch(`${apiBaseUrl}/volunteer-teams/${teamId}`, {
        method: "DELETE",
      });

      // Remove from teams array
      state.teams = state.teams.filter((t) => t._id !== teamId);

      // Clear current team if it's the one being deleted
      if (state.currentTeam?._id === teamId) {
        state.currentTeam = null;
      }

      return true;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to delete volunteer team";
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const addTeamMember = async (teamId: string, memberId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/volunteer-teams/${teamId}/members`,
        {
          method: "POST",
          body: { memberId },
        }
      )) as { team: VolunteerTeam };

      // Update team in store
      const index = state.teams.findIndex((t) => t._id === teamId);
      if (index !== -1) {
        state.teams[index] = response.team;
      }

      if (state.currentTeam?._id === teamId) {
        state.currentTeam = response.team;
      }

      return response.team;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to add team member";
      throw error;
    }
  };

  const removeTeamMember = async (teamId: string, memberId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/volunteer-teams/${teamId}/members/${memberId}`,
        {
          method: "DELETE",
        }
      )) as { team: VolunteerTeam };

      // Update team in store
      const index = state.teams.findIndex((t) => t._id === teamId);
      if (index !== -1) {
        state.teams[index] = response.team;
      }

      if (state.currentTeam?._id === teamId) {
        state.currentTeam = response.team;
      }

      return response.team;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to remove team member";
      throw error;
    }
  };

  const updateTeamLeader = async (teamId: string, leaderId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/volunteer-teams/${teamId}/leader`,
        {
          method: "PUT",
          body: { leaderId },
        }
      )) as { team: VolunteerTeam };

      // Update team in store
      const index = state.teams.findIndex((t) => t._id === teamId);
      if (index !== -1) {
        state.teams[index] = response.team;
      }

      if (state.currentTeam?._id === teamId) {
        state.currentTeam = response.team;
      }

      return response.team;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to update team leader";
      throw error;
    }
  };

  const fetchTeamSchedules = async (teamId: string) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/volunteer-teams/${teamId}/schedule`
      )) as { schedules: TeamSchedule[] };

      state.schedules = response.schedules;
      return response.schedules;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to fetch team schedules";
      throw error;
    }
  };

  const createTeamSchedule = async (
    teamId: string,
    scheduleData: {
      title: string;
      description?: string;
      date: string;
      startTime: string;
      endTime: string;
      location?: string;
    }
  ) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/volunteer-teams/${teamId}/schedule`,
        {
          method: "POST",
          body: scheduleData,
        }
      )) as { schedule: TeamSchedule };

      state.schedules.push(response.schedule);
      return response.schedule;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to create team schedule";
      throw error;
    }
  };

  const assignMemberToSchedule = async (
    teamId: string,
    scheduleId: string,
    assignmentData: {
      memberId: string;
      role: string;
    }
  ) => {
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/volunteer-teams/${teamId}/schedule/${scheduleId}/assign`,
        {
          method: "POST",
          body: assignmentData,
        }
      )) as { schedule: TeamSchedule };

      // Update schedule in store
      const index = state.schedules.findIndex((s) => s._id === scheduleId);
      if (index !== -1) {
        state.schedules[index] = response.schedule;
      }

      return response.schedule;
    } catch (error: any) {
      state.error =
        error.data?.message || "Failed to assign member to schedule";
      throw error;
    }
  };

  const bulkImportTeams = async (teamsData: Partial<VolunteerTeam>[]) => {
    state.loading = true;
    try {
      const response = (await $fetch(
        `${apiBaseUrl}/volunteer-teams/bulk-import`,
        {
          method: "POST",
          body: { teams: teamsData },
        }
      )) as { teams: VolunteerTeam[]; imported: number; failed: number };

      // Add imported teams to store
      state.teams.push(...response.teams);

      return response;
    } catch (error: any) {
      state.error = error.data?.message || "Failed to import teams";
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
    activeTeams,
    teamsWithLeaders,
    teamCount,

    // Actions
    fetchTeams,
    fetchTeam,
    createTeam,
    updateTeam,
    deleteTeam,
    addTeamMember,
    removeTeamMember,
    updateTeamLeader,
    fetchTeamSchedules,
    createTeamSchedule,
    assignMemberToSchedule,
    bulkImportTeams,
    clearError,
  };
});
