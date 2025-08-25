<template>
  <div class="w-64 h-screen bg-sidebar-bg text-sidebar-text flex flex-col fixed">
    <div class="p-6">
      <router-link to="/dashboard" class="text-2xl font-semibold text-white hover:text-gray-200 transition-colors">Click - HR</router-link>
    </div>
    <nav class="flex-grow">
      <ul>
        <li v-for="item in NAV_ITEMS" :key="item.path" class="px-2">
          <router-link
            :to="item.path"
            custom
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <a
              :href="href"
              @click="navigate"
              :class="[
                'flex items-center space-x-3 p-3 my-1 rounded-md transition-colors duration-200 ease-in-out',
                (item.exact ? isExactActive : isActive)
                  ? 'bg-sidebar-active-bg text-white shadow-md'
                  : 'text-sidebar-text hover:bg-sidebar-hover-bg hover:text-white'
              ]"
              :aria-current="(item.exact ? isExactActive : isActive) ? 'page' : undefined"
            >
              <component :is="item.icon" class="h-5 w-5" aria-hidden="true" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="p-4 border-t border-gray-700">
      <p class="text-xs text-gray-500">&copy; {{ new Date().getFullYear() }} Click-HR</p>                                                                                                    
    </div>
  </div>
</template>

<script setup lang="ts">
import { NAV_ITEMS } from '../constants';
// Icon components are dynamically rendered using <component :is="item.icon">
// They are imported in constants.ts and passed through NAV_ITEMS
</script>

<style scoped>
/* Scoped styles for the sidebar if needed */
</style>