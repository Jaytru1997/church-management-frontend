<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// App-level setup
useHead({
  title: "Church Management System",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive church management system for managing members, donations, and campaigns.",
    },
  ],
});
</script>
