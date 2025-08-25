<template>
  <div :class="[`${bgColor}`, 'p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out']">
    <div class="flex items-center justify-between">
      <div :class="[`p-3 rounded-full ${iconColor}`, bgColor === 'bg-white' || !bgColor ? 'bg-primary bg-opacity-10' : 'bg-white bg-opacity-30']">
        <component :is="icon" class="h-8 w-8" aria-hidden="true" />
      </div>
      <div v-if="trend" :class="['text-sm font-semibold', trendColor || 'text-green-500']">
        {{ trend }}
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm text-gray-500">{{ title }}</p>
      <p class="text-3xl font-bold text-gray-800">{{ value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: Component; // Vue component type for the icon
  trend?: string;
  trendColor?: 'text-green-500' | 'text-red-500' | string; // Allow any string for flexibility
  bgColor?: string;
  iconColor?: string;
}

// Define props with default values
const props = withDefaults(defineProps<DashboardCardProps>(), {
  trendColor: 'text-green-500',
  bgColor: 'bg-white',
  iconColor: 'text-primary',
});
</script>

<style scoped>
/* Scoped styles for the card if needed */
</style>