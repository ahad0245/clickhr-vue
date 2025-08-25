<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">User Analytics</h1>
      <p class="text-gray-500 max-w-md">Overview of platform user activity and role distribution.</p>
    </div>

    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-4 rounded-lg shadow text-center">
        <h2 class="text-sm text-gray-500">Total Users</h2>
        <p class="text-2xl font-bold text-primary">{{ totalUsers }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow text-center">
        <h2 class="text-sm text-gray-500">Admins</h2>
        <p class="text-2xl font-bold text-blue-600">{{ roleCounts['Super Admin'] }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow text-center">
        <h2 class="text-sm text-gray-500">Managers</h2>
        <p class="text-2xl font-bold text-green-600">{{ roleCounts['Manager'] }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow text-center">
        <h2 class="text-sm text-gray-500">Employees</h2>
        <p class="text-2xl font-bold text-pink-600">{{ roleCounts['Employee'] }}</p>
      </div>
    </div>

    <!-- Calendar Placeholder -->
    <!-- <div class="bg-white rounded-lg shadow p-6 min-h-[300px] flex items-center justify-center text-gray-400">
      Calendar view for task tracking would appear here.
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Mock user data (replace with API data as needed)
const users = ref([
  { name: 'Alice', role: 'Super Admin' },
  { name: 'Bob', role: 'Manager' },
  { name: 'Charlie', role: 'Employee' },
  { name: 'Daisy', role: 'Manager' },
  { name: 'Eve', role: 'Employee' }
]);

const totalUsers = computed(() => users.value.length);

const roleCounts = computed(() => {
  const counts: Record<string, number> = {
    'Super Admin': 0,
    'Manager': 0,
    'Company Manager': 0,
    'Employee': 0
  };
  users.value.forEach(user => {
    if (counts[user.role] !== undefined) {
      counts[user.role]++;
    }
  });
  return counts;
});
</script>
