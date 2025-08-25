<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen  p-8 bg-white rounded-lg shadow-md min-h-[300px]">
    <!-- Page Title -->
    <div>
      <h1 class="text-3xl font-semibold text-gray-700 mb-3">User Management</h1>
      <p class="text-gray-500 max-w-md">Add new users or update their roles below.</p>
    </div>

    <!-- Add User Form -->
    <div class="bg-white shadow-md p-6 rounded-lg space-y-4">
      <h2 class="text-xl font-semibold">Add New User</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="newUser.name" type="text" placeholder="Full Name" class="border p-2 rounded" />
        <input v-model="newUser.email" type="email" placeholder="Email Address" class="border p-2 rounded" />
        <select v-model="newUser.role" class="border p-2 rounded col-span-1 md:col-span-2">
          <option disabled value="">Select Role</option>
          <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>
      </div>
      <button @click="addUser" class="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
        Add User
      </button>
    </div>

    <!-- Update User Role -->
    <div class="bg-white shadow-md p-6 rounded-lg space-y-4">
      <h2 class="text-xl font-semibold">Update User Role</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="selectedUser.email" type="email" placeholder="User Email" class="border p-2 rounded" />
        <select v-model="selectedUser.newRole" class="border p-2 rounded">
          <option disabled value="">Select New Role</option>
          <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>
      </div>
      <button @click="updateUserRole" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Update Role
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const roles = ['Super Admin', 'Manager', 'Company Manager', 'Employee'];

const newUser = ref({
  name: '',
  email: '',
  role: ''
});

const selectedUser = ref({
  email: '',
  newRole: ''
});

const addUser = () => {
  if (!newUser.value.name || !newUser.value.email || !newUser.value.role) {
    alert('Please fill out all fields to add a new user.');
    return;
  }
  // Replace this with actual user creation logic
  alert(`User ${newUser.value.name} (${newUser.value.email}) added as ${newUser.value.role}.`);
  newUser.value = { name: '', email: '', role: '' };
};

const updateUserRole = () => {
  if (!selectedUser.value.email || !selectedUser.value.newRole) {
    alert('Please fill out all fields to update the user role.');
    return;
  }
  // Replace this with actual role update logic
  alert(`User with email ${selectedUser.value.email} role updated to ${selectedUser.value.newRole}.`);
  selectedUser.value = { email: '', newRole: '' };
};
</script>

<style scoped>

</style>
