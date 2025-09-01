<template>
  <div>
    <!-- Error State -->
    <div
      v-if="hasError"
      class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4"
    >
      <div class="max-w-lg w-full">
        <div class="glass-card p-8 text-center">
          <div
            class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-10 h-10 text-red-400"
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

          <h1 class="text-2xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h1>

          <p class="text-white/70 mb-6">
            We're sorry, but something unexpected happened. Our team has been
            notified and is working to fix this issue.
          </p>

          <div class="space-y-3">
            <button @click="retry" class="w-full btn-primary">
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>

            <button @click="goHome" class="w-full btn-ghost">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </button>
          </div>

          <!-- Error Details (Development Only) -->
          <div
            v-if="showDetails && error"
            class="mt-8 pt-6 border-t border-white/10"
          >
            <button
              @click="showErrorDetails = !showErrorDetails"
              class="text-white/60 hover:text-white text-sm underline mb-4"
            >
              {{ showErrorDetails ? "Hide" : "Show" }} technical details
            </button>

            <div v-if="showErrorDetails" class="text-left">
              <div
                class="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
              >
                <h4 class="text-red-400 font-medium mb-2">Error Details:</h4>
                <pre
                  class="text-xs text-red-300 whitespace-pre-wrap overflow-x-auto"
                  >{{ error.stack || error }}</pre
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Normal Content -->
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const hasError = ref(false);
const error = ref<any>(null);
const showErrorDetails = ref(false);

// Show error details only in development
const showDetails = ref(process.env.NODE_ENV === "development");

const retry = () => {
  hasError.value = false;
  error.value = null;
  // Force a reload of the current route
  router.go(0);
};

const goHome = () => {
  router.push("/");
};

const handleError = (err: any) => {
  hasError.value = true;
  error.value = err;

  // Log error for monitoring/debugging
  console.error("ErrorBoundary caught an error:", err);

  // Here you could send the error to an error reporting service
  // Example: errorReportingService.captureException(err);
};

// Capture errors from child components
onErrorCaptured(handleError);
</script>
