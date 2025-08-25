<template>
  <div class="relative inline-block" ref="dropdownRef">
    <button @click="toggleDropdown" class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-all duration-200">
      <img src="https://i.pravatar.cc/150?img=68" class="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200" alt="User Avatar" />
    </button>

    <transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="dropdownOpen"
           class="absolute right-0 mt-3 w-56 origin-top-right bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4 space-y-2"
           role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">

        <div class="pb-2 border-b border-gray-100">
          <p class="text-gray-900 font-semibold text-base">John Doe</p>
          <p class="text-sm text-gray-500">johndoe@example.com</p>
        </div>

        <router-link to="/profile" class="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150" role="menuitem" tabindex="-1">
          Profile
        </router-link>
        <router-link to="/settings" class="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150" role="menuitem" tabindex="-1">
          Settings
        </router-link>

        <button @click="logout"
                class="w-full text-left px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                role="menuitem" tabindex="-1">
          Logout
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const dropdownOpen = ref(false);
const router = useRouter();

// Create a ref to attach to the dropdown's root element
const dropdownRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function closeDropdown() {
  dropdownOpen.value = false;
}

function logout() {
  console.log('User logged out');
  router.push('/');
  closeDropdown();
}

// Function to handle clicks anywhere on the document
const handleClickOutside = (event: MouseEvent) => {
  // If the click is outside the dropdownRef element, close the dropdown
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

// Add event listener when the component is mounted
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Remove event listener when the component is unmounted to prevent memory leaks
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* No additional styles needed, Tailwind handles it */
</style>