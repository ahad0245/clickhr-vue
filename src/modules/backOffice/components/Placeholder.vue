<template>
  <div class="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-lg shadow-md min-h-[300px]">
    <div v-if="icon" class="text-primary mb-6">
      <component :is="icon" class="h-16 w-16" aria-hidden="true" />
    </div>
    <h2 class="text-3xl font-semibold text-gray-700 mb-3">{{ title }}</h2>
    <p class="text-gray-500 max-w-md">{{ message }}</p>
    <div class="mt-6">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

interface PlaceholderProps {
  title: string;
  message: string;
  icon?: Component; // Vue component type for the icon
}

defineProps<PlaceholderProps>();
</script>

<style scoped>
/* Scoped styles for placeholder if needed */
</style>