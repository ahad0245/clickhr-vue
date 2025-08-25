<template>
  <header class="sticky top-0 z-50">
    <!-- Primary Menu Row -->
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto flex items-center justify-between px-4 py-2">
        <!-- Left: Logo -->
        <div class="text-lg font-bold text-primary tracking-wide">
          <!-- Placeholder for logo image, replace with your actual logo URL -->
          <img src="../../../assets/logo.png" class="w-28 h-auto" alt="Company Logo" />
        </div>

        <!-- Hamburger Icon for Mobile/Tablet -->
        <div class="lg:hidden">
          <button @click="toggleSidebar" class="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Center: Navigation Tabs (Desktop) -->
        <nav class=" hidden lg:flex space-x-4">
          <button
            v-for="item in topMenus"
            :key="item.key"
            @click="setActiveMainAndNavigate(item.key)"
            class=" custom-ahad-ahad px-3 py-2 text-sm font-medium rounded-t-md transition-all duration-200"
            :class="{
              'text-white bg-blue-600': activeMain === item.key,
              'text-gray-700 hover:text-blue-600 hover:bg-gray-100': activeMain !== item.key
            }"
          >
            {{ item.label }}
          </button>
        </nav>

        <!-- Right: Search + Notifications + Profile (Desktop) -->
        <div class="hidden lg:flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search..."
            class="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-40 sm:w-56"
          />
          <!-- Assuming NotificationDropdown and UserProfileDropdown are correctly imported and styled externally -->
          <NotificationDropdown />
          <UserProfileDropdown />
        </div>
      </div>
    </div>

    <!-- Secondary Submenu Row (Desktop) -->
    <div
      v-if="activeSubmenus.length && !sidebarOpen"
      class="custom-ahad bg-blue-600 text-white text-sm px-4 hidden lg:block"
    >
      <div class="container mx-auto flex space-x-6 py-2 overflow-x-auto">
        <router-link
          v-for="sub in activeSubmenus"
          :key="sub.path"
          :to="sub.path"
          class="hover:underline transition-colors duration-150"
          :class="{
            'font-semibold text-blue-200': $route.path === sub.path
          }"
        >
          {{ sub.label }}
        </router-link>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <transition name="slide-fade">
      <div v-if="sidebarOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 lg:hidden">
        <div class="relative w-64 bg-white h-full shadow-lg overflow-y-auto p-4 flex flex-col">
          <!-- Sidebar Header -->
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div class="text-lg font-bold text-blue-600 tracking-wide">
              <img src="../../../assets/logo.png" class="w-28 h-auto" alt="Company Logo" />
            </div>
            <button @click="closeSidebar" class="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Mobile Search, Notifications, Profile -->
          <div class="flex items-center space-x-3 mb-6 border-b pb-4 border-gray-200">
            <input
              type="search"
              placeholder="Search..."
              class="flex-grow px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-500 focus:outline-none"
            />
            <NotificationDropdown />
            <UserProfileDropdown />
          </div>

          <!-- Main Navigation (Mobile) -->
          <nav class="flex flex-col space-y-2 mb-6">
            <button
              v-for="item in topMenus"
              :key="item.key"
              @click="setActiveMainAndNavigate(item.key, true)"
              class="px-4 py-2 text-left text-sm font-medium rounded-md transition-all duration-200"
              :class="{
                'bg-blue-100 text-blue-800': activeMain === item.key,
                'text-gray-700 hover:bg-gray-50': activeMain !== item.key
              }"
            >
              {{ item.label }}
            </button>
          </nav>

          <!-- Submenus (Mobile) -->
          <div v-if="activeSubmenus.length" class="flex flex-col space-y-2 border-t pt-4 border-gray-200">
            <h3 class="text-sm font-semibold text-gray-600 px-2 mb-1">Sub-Navigation</h3>
            <router-link
              v-for="sub in activeSubmenus"
              :key="sub.path"
              :to="sub.path"
              @click="closeSidebar"
              class="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
              :class="{
                'font-semibold text-blue-700 bg-blue-50': $route.path === sub.path
              }"
            >
              {{ sub.label }}
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Assuming these are correctly imported from your project structure
// import BellIcon from '../icons/BellIcon.vue';
// import UserCircleIcon from '../icons/UserCircleIcon.vue';
import { useAuthStore } from '../../../stores/useAuthStore';
import NotificationDropdown from '.components/NotificationDropdown.vue';
import UserProfileDropdown from './UserProfileDropdown.vue';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore(); // Assuming useAuthStore provides userRole

const sidebarOpen = ref(false);
const activeMain = ref('dashboard'); // Default active main menu item

// Top-level tabs
const topMenus = [
  { key: 'dashboard', label: 'Dashboard', defaultPath: '/dashboard'  },
  { key: 'jobs', label: 'Jobs', defaultPath: '/jobs' },
  { key: 'talent', label: 'Talent', defaultPath: '/dashboard/talentoverview' },
  { key: 'timesheet', label: 'Timesheet', defaultPath: '/timesheet' },
  { key: 'companies', label: 'Companies', defaultPath: '/companies' },
  { key: 'documents', label: 'Documents', defaultPath: '/documents' }
];

// Submenus with optional role filtering
// Note: Changed paths for consistency (e.g., /jobs instead of /dashboard/jobs)
// You might need to adjust these paths to match your actual router setup.
const submenus = {
  dashboard: [
    { label: 'Overview', path: '/dashboard', roles: ['recruiter', 'viewer'] },
    { label: 'Overview', path: '/backoffice', roles: ['admin'] },
    { label: 'Create Backoffice User', path: '/backoffice/createuser', roles: ['admin'] },
    { label: 'Setup', path: '/backoffice/setup', roles: ['admin'] },


    { label: 'Tasks', path: '/dashboard/tasks', roles: [ 'recruiter', 'viewer'] },
    // { label: 'Back Office', path: '/dashboard/backoffice', roles: ['admin'] },
    { label: 'Application Config', path: '/dashboard/app-config', roles: ['viewer', 'recruiter'] },
    { label: 'Add Users', path: '/dashboard/users', roles: ['recruiter'] },
    { label: 'Setting', path: '/dashboard/settings', roles: ['viewer', 'recruiter'] }
  ],
  jobs: [
    { label: 'Job Board', path: '/dashboard/jobs', roles: ['recruiter'] },
    { label: 'My Applications', path: '/dashboard/jobs/my-applications' , roles: ['recruiter'] },
    { label: 'Create Job', path: '/dashboard/jobs/create' , roles: ['recruiter']}
  ],
  talent: [
    { label: 'Talent Overview', path: '/dashboard/talentoverview'  ,  roles: ['recruiter'] },
    { label: 'Add Talent', path: '/dashboard/addtalent' ,  roles: ['recruiter']}
  ],
  timesheet: [
    { label: 'My Timesheets', path: '/timesheet'  ,  roles: ['recruiter'] },
    { label: 'Submit Timesheet', path: '/timesheet/submit'   ,  roles: ['recruiter'] }
  ],
  companies: [
    { label: 'Companies List', path: '/dashboard/companies'  , roles: ['recruiter'] },
    { label: 'Add Companies', path: '/dashboard/addcompanies'  , roles: ['recruiter']}
  ],
  documents: [
    { label: 'My Documents', path: '/dashboard/documents' ,roles: ['recruiter'] },
    { label: 'Upload Document', path: '/dashboard/documents/upload',roles: ['recruiter'] }
  ]
};

// Only return submenu items allowed for the current user role
const activeSubmenus = computed(() => {
  const items = submenus[activeMain.value] || [];
  return items.filter(item => {
    // Assuming auth.userRole is a string that exists
    return !item.roles || item.roles.includes(auth.userRole || 'viewer'); // Default to viewer if role is null/undefined
  });
});

// Helper to determine activeMain based on current route path
const getActiveMainFromRoute = (currentPath: string) => {
  for (const menu of topMenus) {
    // Check if current path directly matches default path of a top menu
    if (menu.defaultPath && currentPath === menu.defaultPath) {
      return menu.key;
    }
    // Check if current path starts with a submenu path of this top menu
    const matchingSub = submenus[menu.key]?.find(sub => currentPath.startsWith(sub.path));
    if (matchingSub) {
      return menu.key;
    }
  }
  return 'dashboard'; // Fallback default
};

// --- Handlers ---

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
  sidebarOpen.value = false;
}

// Handler for main menu clicks (both desktop and mobile)
function setActiveMainAndNavigate(menuKey: string, keepSidebarOpen = false) {
  activeMain.value = menuKey;
  // Removed direct router.push() calls from here.
  // Navigation will now solely happen via router-link elements in submenus.

  // Close sidebar only if triggered by desktop main menu click (keepSidebarOpen is false)
  // OR if on mobile AND the clicked main menu doesn't reveal submenus.
  if (!keepSidebarOpen || !activeSubmenus.value.length) {
    closeSidebar();
  }
}

// --- Lifecycle Hooks ---

// Initialize activeMain based on current route on component mount
onMounted(() => {
  activeMain.value = getActiveMainFromRoute(route.path);
});

// Watch for route changes to update activeMain
watch(() => route.path, (newPath) => {
  activeMain.value = getActiveMainFromRoute(newPath);
});

// Optional: Close sidebar if screen resizes to desktop view
watch(() => window.innerWidth, (newWidth) => {
  if (newWidth >= 1024 && sidebarOpen.value) { // 1024px is Tailwind's 'lg' breakpoint
    closeSidebar();
  }
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
}

.nav-tab-base {
  @apply px-3 py-2 text-sm font-medium rounded-t-md transition-all duration-200;
}

.nav-tab-active {
  @apply text-white bg-blue-600;
}

.nav-tab-inactive {
  @apply text-gray-700 hover:text-blue-600 hover:bg-gray-100;
}

.custom-ahad{
margin-top: -13px;
}
.custom-ahad-ahad{
  padding-bottom: 10px;
}
</style> 