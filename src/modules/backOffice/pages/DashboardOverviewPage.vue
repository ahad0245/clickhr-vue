<template>
  <div class="space-y-6">
      

    <!-- Top Message -->
    <div>
      <h1 class="text-3xl font-bold text-gray-700">Welcome Back!</h1>
      <p class="text-gray-600">Here's what's happening with your projects today.</p>
    </div>

    <!-- Layout Switcher -->
    <div class="flex items-center space-x-3">
      <button
        v-for="option in layoutOptions"
        :key="option"
        @click="changeLayout(option)"
        :class="[
          'px-3 py-1 text-sm rounded border transition',
          currentLayout === option ? 'bg-primary text-white' : 'bg-white text-gray-700 border-gray-300'
        ]"
      >
        {{ option }} View
      </button>
    </div>

    <!-- Dynamic Grid -->
    <draggable
      v-model="widgets"
      class="grid gap-4"
      :class="gridClass"
      item-key="id"
      handle=".drag-handle"
    >
      <template #item="{ element }">
        <div
          class="bg-white p-4 rounded shadow relative group"
          :class="{ 'col-span-2': element.fullWidth }"
        >
          <!-- Close Icon -->
          <button
            class="absolute top-2 right-2 text-gray-400 hover:text-red-500 hidden group-hover:block"
            @click="removeWidget(element.id)"
          >
            &times;
          </button>

          <!-- Resize Toggle -->
          <button
            class="absolute top-2 left-2 text-xs text-gray-500 hover:text-blue-600 hidden group-hover:block"
            @click="toggleFullWidth(element.id)"
          >
            ↔
          </button>

          <component :is="element.component" />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent } from 'vue';
import { useStorage } from '@vueuse/core';
import draggable from 'vuedraggable';
import Calender from '../components/Calender.vue';
import BellIcon from '../icons/BellIcon.vue';

const layoutOptions = ['3-Column', '2-Column', '1-Column'];
const currentLayout = useStorage('dashboard-layout', '3-Column');

function changeLayout(option: string) {
  currentLayout.value = option;
}

const gridClass = computed(() => {
  switch (currentLayout.value) {
    case '1-Column':
      return 'grid-cols-1';
    case '2-Column':
      return 'grid-cols-1 md:grid-cols-2';
    case '3-Column':
    default:
      return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
  }
});

const widgets = ref([
  {
    id: 'calendar',
    component: Calender,
    fullWidth: false
  },
  {
    id: 'activity',
    component: defineAsyncComponent(() => import('../components/RecentActivity.vue')),
    fullWidth: false
  },
  {
    id: 'scoreboard',
    component: defineAsyncComponent(() => import('../components/Scoreboard.vue')),
    fullWidth: false
  },
  {
    id: 'recruiting',
    component: defineAsyncComponent(() => import('../components/RecruitingStats.vue')),
    fullWidth: false
  },
  {
    id: 'jobMonitor',
    component: defineAsyncComponent(() => import('../components/JobMonitor.vue')),
    fullWidth: false
  }
]);

function toggleFullWidth(id: string) {
  const widget = widgets.value.find(w => w.id === id);
  if (widget) widget.fullWidth = !widget.fullWidth;
}

function removeWidget(id: string) {
  widgets.value = widgets.value.filter(w => w.id !== id);
}
</script>

<style scoped>
.bg-primary {
  background-color: #2563eb;
}
.text-primary {
  color: #2563eb;
}
</style>
