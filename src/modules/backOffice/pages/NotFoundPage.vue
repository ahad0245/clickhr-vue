<template>
  <div class="min-h-screen bg-content-bg flex flex-col items-center justify-center text-center p-6">
    <component :is="ExclamationTriangleIcon" class="h-24 w-24 text-red-500 mx-auto mb-6" />
    <h1 class="text-6xl font-extrabold text-primary mb-4">404</h1>
    <h2 class="text-3xl font-semibold text-gray-700 mb-3">Page Not Found</h2>
    <p class="text-gray-500 max-w-md mb-8">
      Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
    </p>
    <router-link 
      to="/dashboard" 
      class="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300"
    >
      Go to Dashboard
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const ExclamationTriangleIcon = defineAsyncComponent(() => import('../../../assets/icons/ExclamationTriangleIcon.vue'));
</script>