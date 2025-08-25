<!-- NotificationDropdown.vue -->
<template>
  <div class="relative" ref="dropdownRef">
    <!-- Bell Icon with Badge -->
    <button @click="handleToggleDropdown" class="relative focus:outline-none">
      <BellIcon class="h-6 w-6 text-gray-600 cursor-pointer" />
      <span v-if="unreadCount" class="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {{ unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <div v-if="show" class="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg z-50">
      <div class="p-4 border-b flex items-center justify-between">
        <h3 class="text-sm font-semibold text-gray-700">USER NOTIFICATIONS</h3>
        <router-link to="/notifications" class="text-xs text-primary hover:underline">See All</router-link>
      </div>
      <div class="flex space-x-4 px-4 pt-3 pb-2 text-sm border-b">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
          class="font-medium pb-1"
          :class="activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'">
          {{ tab }}
          <span v-if="tab === 'Logs'" class="ml-1 bg-primary text-white rounded-full text-xs px-2">{{ logs.length }}</span>
        </button>
      </div>
      <ul class="max-h-64 overflow-y-auto divide-y">
        <li v-for="item in filteredItems" :key="item.id" class="flex items-start space-x-3 p-4 hover:bg-gray-50">
          <span class="mt-1 text-green-600">
            <MessageIcon class="h-5 w-5" />
          </span>
          <div>
            <p class="text-sm text-gray-800">{{ item.message }}</p>
            <p class="text-xs text-gray-500">{{ item.timeAgo }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import BellIcon from '../../../assets/icons/BellIcon.vue';
// import MessageIcon from '../icons/MessageIcon.vue';

const show = ref(false);
const tabs = ['Alerts', 'Task', 'Logs'];
const activeTab = ref('Logs');
const dropdownRef = ref<HTMLElement | null>(null);

const handleToggleDropdown = () => {
  show.value = !show.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    show.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});

const logs = [
  { id: 1, message: 'Education details in your profile have been updated', timeAgo: '2 days ago', type: 'Logs' },
  { id: 2, message: 'Your address information was updated', timeAgo: '2 days ago', type: 'Logs' },
  { id: 3, message: 'Your address information was updated', timeAgo: '2 days ago', type: 'Logs' },
  { id: 4, message: 'Your address information was updated', timeAgo: '2 days ago', type: 'Logs' }
];

const filteredItems = computed(() => logs.filter(item => item.type === activeTab.value));
const unreadCount = computed(() => logs.length);
</script>

<style scoped>
.text-primary {
  color: #2563eb;
}
.bg-primary {
  background-color: #2563eb;
}
</style>
