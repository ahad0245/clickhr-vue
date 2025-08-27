<template>
  <header class="sticky top-0 z-50">
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto flex items-center justify-between px-4 py-2">
        <div class="text-lg font-bold text-primary tracking-wide">
          <img src="../../../assets/logo.png" class="w-28 h-auto" alt="Company Logo" />
        </div>

        <div class="lg:hidden">
          <button @click="toggleSidebar" class="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <nav class="hidden lg:flex space-x-4">
          <button
            v-for="item in visibleTopMenus"
            :key="item.key"
            @click="handleMainMenuClick(item.key)"
            class="custom-ahad-ahad px-3 py-2 text-sm font-medium rounded-t-md transition-all duration-200"
            :class="{
              'text-white bg-blue-600': activeMain === item.key,
              'text-gray-700 hover:text-blue-600 hover:bg-gray-100': activeMain !== item.key
            }"
          >
            {{ item.label }}
          </button>
        </nav>

        <div class="hidden lg:flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search..."
            class="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-40 sm:w-56"
          />
          <NotificationDropdown />
          <UserProfileDropdown />
        </div>
      </div>
    </div>

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

    <transition name="slide-fade">
      <div v-if="sidebarOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 lg:hidden">
        <div class="relative w-64 bg-white h-full shadow-lg overflow-y-auto p-4 flex flex-col">
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

          <div class="flex items-center space-x-3 mb-6 border-b pb-4 border-gray-200">
            <input
              type="search"
              placeholder="Search..."
              class="flex-grow px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-500 focus:outline-none"
            />
            <NotificationDropdown />
            <UserProfileDropdown />
          </div>

          <nav class="flex flex-col space-y-2 mb-6">
            <button
              v-for="item in visibleTopMenus"
              :key="item.key"
              @click="handleMainMenuClick(item.key)"
              class="px-4 py-2 text-left text-sm font-medium rounded-md transition-all duration-200"
              :class="{
                'bg-blue-100 text-blue-800': activeMain === item.key,
                'text-gray-700 hover:bg-gray-50': activeMain !== item.key
              }"
            >
              {{ item.label }}
            </button>
          </nav>

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
// 1. Import 'useRouter'
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/useAuthStore';
import NotificationDropdown from './NotificationDropdown.vue';
import UserProfileDropdown from './UserProfileDropdown.vue';

const route = useRoute();
const auth = useAuthStore();
// 2. Instantiate the router
const router = useRouter();

const sidebarOpen = ref(false);
const activeMain = ref('dashboard');

// --- DATA STRUCTURES FOR NAVIGATION (No changes here) ---
const topMenus = [
  { key: 'dashboard', label: 'Dashboard', defaultPath: '/dashboard', roles: ['admin', 'recruiter', 'viewer'] },
  { key: 'jobs', label: 'Jobs', defaultPath: '/dashboard/jobs', roles: ['recruiter', 'viewer'] },
   { key: 'talent', label: 'Talent', defaultPath: '/candidate/create-resume', roles: ['recruiter', 'viewer'] }, 
  { key: 'timesheet', label: 'Timesheet', defaultPath: '/timesheet', roles: ['recruiter'] },
  { key: 'companies', label: 'Companies', defaultPath: '/dashboard/companies', roles: ['recruiter'] },
  { key: 'documents', label: 'Documents', defaultPath: '/dashboard/documents', roles: ['recruiter'] }
];

const submenus: Record<string, { label: string; path: string; roles: string[] }[]> = {
  dashboard: [
    { label: 'Overview', path: '/dashboard', roles: ['recruiter'] },
    { label: 'Overview', path: '/candidate', roles: ['viewer'] },
    { label: 'Admin Overview', path: '/backoffice', roles: ['admin'] },
    { label: 'Create Backoffice User', path: '/backoffice/createuser', roles: ['admin'] },
    { label: 'Setup', path: '/backoffice/setup', roles: ['admin'] },
    { label: 'Tasks', path: '/dashboard/tasks', roles: ['recruiter'] },
    { label: 'Application Config', path: '/dashboard/app-config', roles: ['recruiter'] },
    { label: 'Add Users', path: '/dashboard/users', roles: ['recruiter'] },
    { label: 'Setting', path: '/dashboard/settings', roles: ['viewer', 'recruiter'] }
  ],
  jobs: [
    { label: 'Job Board', path: '/dashboard/jobs', roles: ['recruiter'] },
    { label: 'My Jobs', path: '/candidate/jobs', roles: ['viewer'] },
    { label: 'My Applications', path: '/dashboard/jobs/my-applications', roles: ['recruiter'] },
    { label: 'Create Job', path: '/dashboard/jobs/create', roles: ['recruiter'] }
  ],
  talent: [
    { label: 'Talent Overview', path: '/dashboard/talentoverview', roles: ['recruiter'] },
    { label: 'Add Talent', path: '/dashboard/addtalent', roles: ['recruiter'] },
    { label: 'Create Resume', path: '/candidate/create-resume', roles: ['viewer'] },
    { label: 'Resume', path: '/candidate/resume', roles: ['viewer'] }
  ],
  timesheet: [
    { label: 'My Timesheets', path: '/timesheet', roles: ['recruiter'] },
    { label: 'Submit Timesheet', path: '/timesheet/submit', roles: ['recruiter'] }
  ],
  companies: [
    { label: 'Companies List', path: '/dashboard/companies', roles: ['recruiter'] },
    { label: 'Add Companies', path: '/dashboard/addcompanies', roles: ['recruiter'] }
  ],
  documents: [
    { label: 'My Documents', path: '/dashboard/documents', roles: ['recruiter'] },
    { label: 'Upload Document', path: '/dashboard/documents/upload', roles: ['recruiter'] }
  ]
};


// --- COMPUTED PROPERTIES FOR DYNAMIC UI (No changes here) ---

const visibleTopMenus = computed(() => {
  const userRole = auth.userRole || 'viewer';
  return topMenus.filter(item => !item.roles || item.roles.includes(userRole));
});

const activeSubmenus = computed(() => {
  const userRole = auth.userRole || 'viewer';
  const items = submenus[activeMain.value] || [];
  return items.filter(item => !item.roles || item.roles.includes(userRole));
});

// --- HELPER FUNCTIONS (No changes here) ---

const getActiveMainFromRoute = (currentPath: string): string => {
  let bestMatch = { key: '', length: -1 };
  for (const menu of visibleTopMenus.value) {
    const associatedSubmenus = submenus[menu.key] || [];
    for (const sub of associatedSubmenus) {
      if (currentPath.startsWith(sub.path) && sub.path.length > bestMatch.length) {
        bestMatch = { key: menu.key, length: sub.path.length };
      }
    }
  }
  if (bestMatch.key) {
    return bestMatch.key;
  }
  for (const menu of visibleTopMenus.value) {
    if (menu.defaultPath && currentPath === menu.defaultPath) {
      return menu.key;
    }
  }
  return visibleTopMenus.value[0]?.key || 'dashboard';
};

// --- HANDLERS ---

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
  sidebarOpen.value = false;
}

/**
 * 3. MODIFIED: When a main menu item is clicked, this function now navigates
 * to the first available submenu link for the current user's role.
 */
function handleMainMenuClick(menuKey: string) {
  // Set the clicked menu as active
  activeMain.value = menuKey;

  // Find all potential submenus for the clicked menu
  const potentialSubmenus = submenus[menuKey] || [];
  const userRole = auth.userRole || 'viewer';

  // Filter them to get only the ones the user has permission to see
  const accessibleSubmenus = potentialSubmenus.filter(sub =>
    !sub.roles || sub.roles.includes(userRole)
  );

  // If there are accessible submenus, navigate to the path of the first one
  if (accessibleSubmenus.length > 0) {
    const firstSubmenuPath = accessibleSubmenus[0].path;
    router.push(firstSubmenuPath);
  }
}


// --- LIFECYCLE & WATCHERS (No changes here) ---

onMounted(() => {
  activeMain.value = getActiveMainFromRoute(route.path);
});

watch(() => route.path, (newPath) => {
  activeMain.value = getActiveMainFromRoute(newPath);
});

watch(() => window.innerWidth, (newWidth) => {
  if (newWidth >= 1024 && sidebarOpen.value) {
    closeSidebar();
  }
}, { immediate: true });
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

.custom-ahad {
  margin-top: -13px;
}
.custom-ahad-ahad {
  padding-bottom: 10px;
}
</style>