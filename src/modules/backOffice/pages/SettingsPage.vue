<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">Settings</h1>
      <p class="text-gray-500 max-w-md">Manage your account preferences and system configurations.</p>
    </div>

    <!-- Account Settings Section -->
    <div class="bg-white rounded-lg shadow p-6 space-y-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-700">Account Settings</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Full Name</label>
          <input v-model="settings.fullName" type="text" class="mt-1 p-2 border rounded w-full" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600">Email Address</label>
          <input v-model="settings.email" type="email" class="mt-1 p-2 border rounded w-full" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600">Language</label>
          <select v-model="settings.language" class="mt-1 p-2 border rounded w-full">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600">Timezone</label>
          <select v-model="settings.timezone" class="mt-1 p-2 border rounded w-full">
            <option value="UTC">UTC</option>
            <option value="America/New_York">New York (EST)</option>
            <option value="Asia/Kolkata">India (IST)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Notification Preferences -->
    <div class="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 class="text-xl font-semibold text-gray-700">Notification Preferences</h2>

      <div class="space-y-4">
        <label class="flex items-center space-x-2">
          <input v-model="settings.notifyEmail" type="checkbox" class="form-checkbox text-blue-600" />
          <span>Email Notifications</span>
        </label>

        <label class="flex items-center space-x-2">
          <input v-model="settings.notifySMS" type="checkbox" class="form-checkbox text-blue-600" />
          <span>SMS Alerts</span>
        </label>

        <label class="flex items-center space-x-2">
          <input v-model="settings.notifyInApp" type="checkbox" class="form-checkbox text-blue-600" />
          <span>In-App Notifications</span>
        </label>
      </div>
    </div>

    <!-- Save Button -->
    <div class="mt-6">
      <button @click="saveSettings" class="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
        Save Settings
      </button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const settings = ref({
  fullName: 'John Doe',
  email: 'john@example.com',
  language: 'en',
  timezone: 'UTC',
  notifyEmail: true,
  notifySMS: false,
  notifyInApp: true
})

const saveSettings = () => {
  alert('Settings saved successfully!')
  // You can replace this with API submission logic.
}
</script>
