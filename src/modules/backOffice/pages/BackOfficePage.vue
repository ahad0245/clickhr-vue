<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md font-sans">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">Backoffice Management</h1>
      <p class="text-gray-500 max-w-md">Manage internal users, permissions, pending approvals, and system alerts.</p>
    </div>

    <!-- Tabs -->
    <div class="mb-6">
      <div class="flex space-x-4 border-b pb-2">
        <button @click="currentTab = 'users'"
                :class="['text-sm font-medium pb-1', currentTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600']">
          Users
        </button>
        <button @click="currentTab = 'approvals'"
                :class="['text-sm font-medium pb-1', currentTab === 'approvals' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600']">
          Approvals
        </button>
        <button @click="currentTab = 'alerts'"
                :class="['text-sm font-medium pb-1', currentTab === 'alerts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600']">
          Alerts
        </button>
        <button @click="currentTab = 'permissions'"
                :class="['text-sm font-medium pb-1', currentTab === 'permissions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600']">
          Permissions
        </button>
        <button @click="currentTab = 'reports'"
                :class="['text-sm font-medium pb-1', currentTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600']">
          Reports
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="transition-opacity duration-300 ease-in-out" :key="currentTab">
      <!-- Users Tab Content -->
      <div v-if="currentTab === 'users'">
        <div class="bg-white rounded-lg shadow p-6 space-y-4 mb-8">
          <h2 class="text-xl font-semibold text-gray-700">Filter & Search Users</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label for="userSearch" class="block text-sm font-medium text-gray-600">Search by Name/Email</label>
              <input type="text" id="userSearch" v-model="searchTerm" placeholder="e.g., Jane Doe, admin@example.com"
                     class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
            </div>
            <div>
              <label for="roleFilter" class="block text-sm font-medium text-gray-600">Role</label>
              <select id="roleFilter" v-model="filterRole"
                      class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                <option value="">All Roles</option>
                <option value="1">Admin</option>
                <option value="2">Editor</option>
                <option value="3">Viewer</option>
              </select>
            </div>
            <div>
              <label for="statusFilter" class="block text-sm font-medium text-gray-600">Status</label>
              <select id="statusFilter" v-model="filterStatus"
                      class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div>
              <label for="superAdminFilter" class="block text-sm font-medium text-gray-600">Super Admin</label>
              <select id="superAdminFilter" v-model="filterSuperAdmin"
                      class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                <option value="">All</option>
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 space-y-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-700">Backoffice Users ({{ filteredUsers.length }})</h2>
            <button @click="goToCreateUserPage" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md text-sm">
              Add New User
            </button>
          </div>

          <div v-if="filteredUsers.length === 0" class="text-center text-gray-500 py-10">
            <p>No back-office users match your current filters.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="user in filteredUsers" :key="user.id"
                 class="bg-gray-50 rounded-lg shadow-sm p-4 space-y-3 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-800 font-medium">
                    {{ user.first_name.charAt(0) }}{{ user.last_name.charAt(0) }}
                  </span>
                </div>
                <div class="flex-grow">
                  <h3 class="text-lg font-semibold text-gray-800">{{ user.first_name }} {{ user.last_name }}</h3>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
              </div>

              <div class="space-y-1 text-sm text-gray-600">
                <p><span class="font-medium">Role:</span> {{ getRoleName(user.role_id) }}</p>
                <div class="text-sm text-gray-600">
                  <span class="font-medium">Status:</span>
                  <span :class="['ml-1 px-2 py-0.5 rounded-full text-xs font-medium', getStatusClass(user.backoffice_users_status)]">
                    {{ user.backoffice_users_status }}
                  </span>
                </div>
                <p><span class="font-medium">Super Admin:</span> {{ user.is_super_admin ? 'Yes' : 'No' }}</p>
                <p class="text-sm text-gray-400">Last Login: {{ user.lastLogin }}</p>
              </div>

              <div class="pt-2 border-t border-gray-200 flex justify-end space-x-4">
                <button @click="viewUser(user)" class="text-blue-600 text-sm hover:underline">View/Edit</button>
                <button @click="deactivateUser(user.id, user.first_name)" class="text-red-500 text-sm hover:underline">Deactivate</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Approvals Tab Content -->
      <div v-if="currentTab === 'approvals'" class="bg-white p-6 rounded-lg shadow mb-8">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Pending Approvals</h3>
        <div v-if="pendingApprovals.length === 0" class="text-gray-500 py-4 text-center">
          No pending approvals at this time.
        </div>
        <ul v-else class="space-y-3">
          <li v-for="item in pendingApprovals" :key="item.id" class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-md border border-gray-200">
            <div class="flex-grow">
              <span class="font-medium text-gray-800">{{ item.title }}</span>
              <p class="text-sm text-gray-500">Requested by: {{ item.requestedBy }}</p>
            </div>
            <div class="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 flex space-x-2">
              <span class="text-gray-400 text-xs sm:text-sm">{{ item.date }}</span>
              <button @click="approveItem(item.id)" class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-xs">Approve</button>
              <button @click="rejectItem(item.id)" class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs">Reject</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Alerts Tab Content -->
      <div v-if="currentTab === 'alerts'" class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">System Alerts</h3>
        <div v-if="systemAlerts.length === 0" class="text-gray-500 py-4 text-center">
          No system alerts at this time.
        </div>
        <ul v-else class="space-y-3">
          <li v-for="alert in systemAlerts" :key="alert.id" class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-red-50 rounded-md border border-red-200 text-red-900">
            <span class="flex items-center">
              <svg class="h-5 w-5 mr-2 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.542 2.705-1.542 3.47 0l5.58 11.299A1.5 1.5 0 0117.371 18H2.629a1.5 1.5 0 01-1.319-2.102l5.58-11.299zM10 11a1 1 0 100-2 1 1 0 000 2zm1-4a1 1 0 10-2 0v4a1 1 0 102 0V7z" clip-rule="evenodd" />
              </svg>
              {{ alert.message }}
            </span>
            <button @click="resolveAlert(alert.id)" class="mt-2 sm:mt-0 px-3 py-1 bg-red-700 text-white rounded-md hover:bg-red-800 text-xs">Resolve</button>
          </li>
        </ul>
      </div>

      <!-- Permissions Tab Content -->
      <div v-if="currentTab === 'permissions'" class="bg-white p-6 rounded-lg shadow mb-8">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Permission Matrix</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm bg-white border border-gray-200 rounded-lg">
            <thead class="text-left text-gray-500 bg-gray-50">
              <tr>
                <th class="py-3 px-4 border-b">Role</th>
                <th class="py-3 px-4 border-b text-center">View</th>
                <th class="py-3 px-4 border-b text-center">Edit</th>
                <th class="py-3 px-4 border-b text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="perm in permissions" :key="perm.role" class="border-t border-gray-200 hover:bg-gray-50">
                <td class="py-3 px-4 font-medium text-gray-700">{{ perm.role }}</td>
                <td class="py-3 px-4 text-center"><input type="checkbox" v-model="perm.view" class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" /></td>
                <td class="py-3 px-4 text-center"><input type="checkbox" v-model="perm.edit" class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" /></td>
                <td class="py-3 px-4 text-center"><input type="checkbox" v-model="perm.delete" class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-6 text-right">
          <button @click="savePermissions" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md">
            Save Permissions
          </button>
        </div>
      </div>

      <!-- Reports Tab Content -->
      <div v-if="currentTab === 'reports'" class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Reports Dashboard</h3>
        <p class="text-gray-600">This section will contain various system reports and analytics.</p>
        <div class="py-8 text-center text-gray-500">
          <p>Reports functionality coming soon!</p>
          <p class="text-sm mt-2">Example reports: User Activity Log, Access Reports, Audit Trails.</p>
        </div>
      </div>
    </div>

    <!-- User Profile Modal -->
    <div v-if="showProfileModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-auto">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full my-8 relative">
        <button @click="closeProfileModal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedUser?.first_name }} {{ selectedUser?.last_name }}</h3>
        <p class="text-gray-600 text-lg mb-4">{{ selectedUser?.email }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
          <!-- Basic Information -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-800 mb-1">Basic Information</h4>
            <p><strong>Role:</strong> {{ getRoleName(selectedUser?.role_id) }}</p>
            <p><strong>Status:</strong> <span :class="['ml-1 px-2 py-0.5 rounded-full text-xs font-medium', getStatusClass(selectedUser?.backoffice_users_status)]">{{ selectedUser?.backoffice_users_status }}</span></p>
            <p><strong>Super Admin:</strong> {{ selectedUser?.is_super_admin ? 'Yes' : 'No' }}</p>
            <p v-if="selectedUser?.mobile_phone"><strong>Mobile Phone:</strong> {{ selectedUser?.mobile_phone }}</p>
            <p v-if="selectedUser?.city"><strong>City:</strong> {{ selectedUser?.city }}</p>
            <p v-if="selectedUser?.country"><strong>Country:</strong> {{ selectedUser?.country }}</p>
            <p><strong>Last Login:</strong> {{ selectedUser?.lastLogin }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button @click="closeProfileModal" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- General Message Modal -->
    <div v-if="showMessageModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full space-y-4 text-center">
        <h3 class="text-lg font-semibold text-gray-800">{{ messageModalTitle }}</h3>
        <p class="text-gray-600">{{ messageModalMessage }}</p>
        <button @click="closeMessageModal" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// Define a type for a back-office user profile
interface BackOfficeUser {
  id: string;
  email: string;
  password?: string; // Password should ideally not be displayed or fetched for overview
  first_name: string;
  last_name: string;
  role_id: string; // Stored as string to match select value
  backoffice_users_status: string;
  is_super_admin: boolean;
  mobile_phone?: string;
  city?: string;
  country?: string;
  lastLogin: string; // Added lastLogin
}

// Mock user data for demonstration
const users = ref<BackOfficeUser[]>([
  {
    id: 'user1',
    email: 'admin@example.com',
    first_name: 'John',
    last_name: 'Doe',
    role_id: '1', // Admin
    backoffice_users_status: 'active',
    is_super_admin: true,
    mobile_phone: '123-456-7890',
    city: 'New York',
    country: 'United States',
    lastLogin: '2025-06-18'
  },
  {
    id: 'user2',
    email: 'editor@example.com',
    first_name: 'Lisa',
    last_name: 'Ray',
    role_id: '2', // Editor
    backoffice_users_status: 'active',
    is_super_admin: false,
    mobile_phone: '987-654-3210',
    city: 'London',
    country: 'United Kingdom',
    lastLogin: '2025-06-10'
  },
  {
    id: 'user3',
    email: 'viewer@example.com',
    first_name: 'Tom',
    last_name: 'Jones',
    role_id: '3', // Viewer
    backoffice_users_status: 'inactive',
    is_super_admin: false,
    city: 'Berlin',
    country: 'Germany',
    lastLogin: '2025-06-17'
  },
  {
    id: 'user4',
    email: 'suspended@example.com',
    first_name: 'Alice',
    last_name: 'Smith',
    role_id: '1', // Admin
    backoffice_users_status: 'suspended',
    is_super_admin: false,
    city: 'Paris',
    country: 'France',
    lastLogin: '2025-06-01'
  }
]);

// Permissions data
const permissions = ref([
  { role: 'Admin', view: true, edit: true, delete: true },
  { role: 'Editor', view: true, edit: true, delete: false },
  { role: 'Viewer', view: true, edit: false, delete: false }
]);

// Pending Approvals data
const pendingApprovals = ref([
  { id: 1, title: 'Approve May Timesheet for John Doe', date: '2025-06-15', requestedBy: 'John Doe' },
  { id: 2, title: 'Contract Approval - Lisa Ray', date: '2025-06-14', requestedBy: 'Lisa Ray' }
]);

// System Alerts data
const systemAlerts = ref([
  { id: 1, message: 'Lisa Ray has an expired compliance document.' },
  { id: 2, message: 'John Doe has missing tax forms.' }
]);


// Tab management
const currentTab = ref('users'); // Default tab

// Search and Filter State for Users Tab
const searchTerm = ref('');
const filterRole = ref('');
const filterStatus = ref('');
const filterSuperAdmin = ref<boolean | ''>(''); // Use boolean or empty string

// Helper to get role name from ID
const getRoleName = (roleId: string | undefined) => {
  switch (roleId) {
    case '1': return 'Admin';
    case '2': return 'Editor';
    case '3': return 'Viewer';
    default: return 'Unknown';
  }
};

// Helper to get status class (for the status badge)
const getStatusClass = (status: string | undefined) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'inactive': return 'bg-gray-100 text-gray-800';
    case 'suspended': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Computed property for filtered users
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    // Search by name or email
    const matchesSearch = searchTerm.value === '' ||
      user.first_name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.value.toLowerCase());

    // Filter by role
    const matchesRole = filterRole.value === '' ||
      user.role_id === filterRole.value;

    // Filter by status
    const matchesStatus = filterStatus.value === '' ||
      user.backoffice_users_status === filterStatus.value;

    // Filter by super admin status
    const matchesSuperAdmin = filterSuperAdmin.value === '' ||
      user.is_super_admin === filterSuperAdmin.value;

    return matchesSearch && matchesRole && matchesStatus && matchesSuperAdmin;
  });
});

// User Profile Modal State and Functions
const showProfileModal = ref(false);
const selectedUser = ref<BackOfficeUser | null>(null);

const viewUser = (user: BackOfficeUser) => {
  selectedUser.value = user;
  showProfileModal.value = true;
};

const closeProfileModal = () => {
  showProfileModal.value = false;
  selectedUser.value = null;
};

// Create User Form Modal State and Functions
// Removed showCreateUserFormModal and newUserData as they are no longer needed here.
// The "Add New User" button will now navigate to a new page.

const goToCreateUserPage = () => {
  // Navigate to the specified link
  window.location.href = '#/backoffice/createuser';
};


// Actions for Approvals and Alerts
const approveItem = (id: number) => {
  pendingApprovals.value = pendingApprovals.value.filter(item => item.id !== id);
  openMessageModal('Success', `Approval item ${id} approved.`);
};

const rejectItem = (id: number) => {
  pendingApprovals.value = pendingApprovals.value.filter(item => item.id !== id);
  openMessageModal('Success', `Approval item ${id} rejected.`);
};

const resolveAlert = (id: number) => {
  systemAlerts.value = systemAlerts.value.filter(alert => alert.id !== id);
  openMessageModal('Success', `Alert ${id} resolved.`);
};

const deactivateUser = (id: string, name: string) => {
  const userIndex = users.value.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users.value[userIndex].backoffice_users_status = 'inactive';
    openMessageModal('Success', `${name} has been deactivated.`);
  }
};

const savePermissions = () => {
  console.log("Permissions saved:", JSON.parse(JSON.stringify(permissions.value)));
  openMessageModal('Success', 'Permissions updated successfully!');
};

// General Message Modal (replaces alert)
const showMessageModal = ref(false);
const messageModalTitle = ref('');
const messageModalMessage = ref('');

const openMessageModal = (title: string, message: string) => {
  messageModalTitle.value = title;
  messageModalMessage.value = message;
  showMessageModal.value = true;
};

const closeMessageModal = () => {
  showMessageModal.value = false;
  messageModalTitle.value = '';
  messageModalMessage.value = '';
};

</script>

<style scoped>
/* Base font for consistency with design reference */
.font-sans {
  font-family: 'Inter', sans-serif;
}
/* Optional: Add a subtle transition for tab content */
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
</style>
