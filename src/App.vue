<template>
  <router-view />
</template>

<script setup lang="ts">
// This is the main App component. It simply renders the current route's component.
import { useAuthStore } from './stores/useAuthStore.ts';
const auth = useAuthStore();
</script>

<style>
/* Global styles can be added here or in a separate CSS file imported in main.ts */
body {
  font-family: 'Inter', sans-serif; /* Example: Adding a modern sans-serif font */
}

/* Add a smooth transition for route changes if desired */
/* .fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
} */
</style>