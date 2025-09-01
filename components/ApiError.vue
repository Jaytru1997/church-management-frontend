<template>
  <div class="glass-card p-6 border-red-500/20 bg-red-500/5">
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <div
          class="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-6 h-6 text-red-400"
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
      </div>

      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold text-red-400 mb-2">
          {{ title || "Something went wrong" }}
        </h3>

        <p class="text-red-300 mb-4">
          {{
            message ||
            "An error occurred while processing your request. Please try again."
          }}
        </p>

        <div v-if="showDetails && error" class="mb-4">
          <button
            @click="showErrorDetails = !showErrorDetails"
            class="text-red-400 hover:text-red-300 text-sm underline"
          >
            {{ showErrorDetails ? "Hide" : "Show" }} error details
          </button>

          <div
            v-if="showErrorDetails"
            class="mt-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
          >
            <pre
              class="text-xs text-red-300 whitespace-pre-wrap overflow-x-auto"
              >{{ error }}</pre
            >
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <button
            v-if="retryable"
            @click="$emit('retry')"
            class="btn-primary text-sm"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>

          <button
            @click="$emit('dismiss')"
            class="btn-ghost text-sm text-red-400 hover:text-red-300"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  title?: string;
  message?: string;
  error?: any;
  showDetails?: boolean;
  retryable?: boolean;
}

interface Emits {
  (e: "retry"): void;
  (e: "dismiss"): void;
}

defineProps<Props>();
defineEmits<Emits>();

const showErrorDetails = ref(false);
</script>
