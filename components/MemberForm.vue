<template>
  <div class="glass-card p-6">
    <div class="mb-6">
      <h3 class="text-xl font-semibold gradient-text">
        {{ isEditing ? "Edit Member" : "Add New Member" }}
      </h3>
      <p class="mt-2 text-white/70">
        {{
          isEditing
            ? "Update member information"
            : "Create a new church member profile"
        }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Basic Information</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- First Name -->
          <div>
            <label for="firstName" class="form-label">
              <i class="fas fa-user mr-2"></i>First Name *
            </label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.firstName }"
              placeholder="Enter first name"
            />
            <p v-if="errors.firstName" class="mt-1 text-sm text-red-400">
              {{ errors.firstName }}
            </p>
          </div>

          <!-- Last Name -->
          <div>
            <label for="lastName" class="form-label">
              <i class="fas fa-user mr-2"></i>Last Name *
            </label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.lastName }"
              placeholder="Enter last name"
            />
            <p v-if="errors.lastName" class="mt-1 text-sm text-red-400">
              {{ errors.lastName }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="form-label">
              <i class="fas fa-envelope mr-2"></i>Email *
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.email }"
              placeholder="Enter email address"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-400">
              {{ errors.email }}
            </p>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="form-label">
              <i class="fas fa-phone mr-2"></i>Phone
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="form-input"
              :class="{ 'border-red-400/50': errors.phone }"
              placeholder="Enter phone number"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-400">
              {{ errors.phone }}
            </p>
          </div>

          <!-- Date of Birth -->
          <div>
            <label for="dateOfBirth" class="form-label">
              <i class="fas fa-calendar mr-2"></i>Date of Birth
            </label>
            <input
              id="dateOfBirth"
              v-model="form.dateOfBirth"
              type="date"
              class="form-input"
            />
          </div>

          <!-- Gender -->
          <div>
            <label for="gender" class="form-label">
              <i class="fas fa-venus-mars mr-2"></i>Gender
            </label>
            <select v-model="form.gender" class="form-input">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Marital Status -->
          <div>
            <label for="maritalStatus" class="form-label">
              <i class="fas fa-heart mr-2"></i>Marital Status
            </label>
            <select v-model="form.maritalStatus" class="form-input">
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          <!-- Occupation -->
          <div>
            <label for="occupation" class="form-label">
              <i class="fas fa-briefcase mr-2"></i>Occupation
            </label>
            <input
              id="occupation"
              v-model="form.occupation"
              type="text"
              class="form-input"
              placeholder="Enter occupation"
            />
          </div>
        </div>
      </div>

      <!-- Address Information -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Address Information</h4>

        <div>
          <label for="address" class="form-label">
            <i class="fas fa-map-marker-alt mr-2"></i>Address
          </label>
          <textarea
            id="address"
            v-model="form.address"
            rows="3"
            class="form-input"
            placeholder="Enter full address"
          ></textarea>
        </div>
      </div>

      <!-- Church Information -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-white">Church Information</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Membership Date -->
          <div>
            <label for="membershipDate" class="form-label">
              <i class="fas fa-calendar-check mr-2"></i>Membership Date *
            </label>
            <input
              id="membershipDate"
              v-model="form.membershipDate"
              type="date"
              required
              class="form-input"
              :class="{ 'border-red-400/50': errors.membershipDate }"
            />
            <p v-if="errors.membershipDate" class="mt-1 text-sm text-red-400">
              {{ errors.membershipDate }}
            </p>
          </div>

          <!-- Role -->
          <div>
            <label for="role" class="form-label">
              <i class="fas fa-user-tag mr-2"></i>Role
            </label>
            <select v-model="form.role" class="form-input">
              <option value="member">Church Member</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Church Administrator</option>
            </select>
          </div>
        </div>

        <!-- Status Checkboxes -->
        <div class="space-y-3">
          <div class="flex items-center">
            <input
              id="isActive"
              v-model="form.isActive"
              type="checkbox"
              class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
            />
            <label for="isActive" class="ml-2 text-sm text-white/80">
              Active Member
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="isFirstTimer"
              v-model="form.isFirstTimer"
              type="checkbox"
              class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
            />
            <label for="isFirstTimer" class="ml-2 text-sm text-white/80">
              First Timer
            </label>
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
            {{ isEditing ? "Update Member" : "Create Member" }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useMemberStore } from "~/stores/member";
import { useChurchStore } from "~/stores/church";

interface Props {
  member?: any;
  isEditing?: boolean;
}

interface Emits {
  (e: "success", member: any): void;
  (e: "cancel"): void;
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
});

const emit = defineEmits<Emits>();

const memberStore = useMemberStore();
const churchStore = useChurchStore();

const loading = computed(() => memberStore.loading);
const currentChurch = computed(() => churchStore.currentChurch);

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  maritalStatus: "",
  occupation: "",
  address: "",
  membershipDate: "",
  role: "member",
  isActive: true,
  isFirstTimer: false,
});

const errors = ref<Record<string, string>>({});
const submitError = ref("");

// Watch for member prop changes (for editing)
watch(
  () => props.member,
  (newMember) => {
    if (newMember && props.isEditing) {
      form.value = {
        firstName: newMember.firstName || "",
        lastName: newMember.lastName || "",
        email: newMember.email || "",
        phone: newMember.phone || "",
        dateOfBirth: newMember.dateOfBirth || "",
        gender: newMember.gender || "",
        maritalStatus: newMember.maritalStatus || "",
        occupation: newMember.occupation || "",
        address: newMember.address || "",
        membershipDate: newMember.membershipDate
          ? newMember.membershipDate.split("T")[0]
          : "",
        role: "member", // Default role
        isActive: newMember.isActive ?? true,
        isFirstTimer: newMember.isFirstTimer ?? false,
      };
    }
  },
  { immediate: true }
);

// Methods
const validateForm = () => {
  errors.value = {};

  if (!form.value.firstName.trim()) {
    errors.value.firstName = "First name is required";
  } else if (form.value.firstName.length < 2) {
    errors.value.firstName = "First name must be at least 2 characters";
  }

  if (!form.value.lastName.trim()) {
    errors.value.lastName = "Last name is required";
  } else if (form.value.lastName.length < 2) {
    errors.value.lastName = "Last name must be at least 2 characters";
  }

  if (!form.value.email.trim()) {
    errors.value.email = "Email is required";
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = "Please enter a valid email address";
  }

  if (form.value.phone && !isValidPhone(form.value.phone)) {
    errors.value.phone = "Please enter a valid phone number";
  }

  if (!form.value.membershipDate) {
    errors.value.membershipDate = "Membership date is required";
  }

  return Object.keys(errors.value).length === 0;
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string) => {
  const internationalPhoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const localPhoneRegex = /^0[789][01]\d{8}$/;
  return (
    internationalPhoneRegex.test(phone.replace(/\s/g, "")) ||
    localPhoneRegex.test(phone.replace(/\s/g, ""))
  );
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  submitError.value = "";

  try {
    const memberData = {
      ...form.value,
      churchId: currentChurch.value?._id,
      // Convert empty strings to undefined for optional fields
      phone: form.value.phone || undefined,
      dateOfBirth: form.value.dateOfBirth || undefined,
      gender: (form.value.gender as "male" | "female" | "other") || undefined,
      maritalStatus:
        (form.value.maritalStatus as
          | "single"
          | "married"
          | "divorced"
          | "widowed") || undefined,
      occupation: form.value.occupation || undefined,
      address: form.value.address || undefined,
    };

    let result;
    if (props.isEditing && props.member) {
      result = await memberStore.updateMember(props.member._id, memberData);
    } else {
      result = await memberStore.createMember(memberData);
    }

    emit("success", result);
  } catch (error: any) {
    submitError.value =
      error.data?.message ||
      `Failed to ${props.isEditing ? "update" : "create"} member`;
  }
};
</script>
