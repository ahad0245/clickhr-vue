<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-700 mb-3">Recent Activity</h3>
    <ul class="space-y-3">
      <li v-for="i in 5" :key="i" class="flex items-center space-x-3">
        <div class="p-2 bg-primary bg-opacity-10 rounded-full">
          <span class="inline-block w-2 h-2 bg-primary rounded-full"></span>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-700">Activity {{ i }}</p>
          <p class="text-xs text-gray-500">Details for recent activity {{ i }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
// No script logic needed
</script>

<style scoped>
.bg-primary {
  background-color: #2563eb;
}
.text-primary {
  color: #2563eb;
}
</style>