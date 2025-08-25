<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">System & Application Configuration</h1>
      <p class="text-gray-500 max-w-md">Manage skills, categories, tags, and other dropdown-level application settings.</p>
    </div>

    <!-- Config Navigation -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Nav -->
      <div class="bg-white p-4 rounded-lg shadow h-fit">
        <ul class="space-y-2 text-sm font-medium text-gray-700">
          <li><button class="hover:text-primary">Skills</button></li>
          <li><button class="hover:text-primary">Skill Categories</button></li>
          <li><button class="hover:text-primary">Application Tags</button></li>
          <li><button class="hover:text-primary">Other Configs</button></li>
        </ul>
      </div>

      <!-- Main Config Panel -->
      <div class="lg:col-span-3 space-y-8">
        <!-- Skills Table -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-700">Skill Management</h2>
            <button class="bg-primary text-white px-4 py-1 rounded">+ Add Skill</button>
          </div>
          <table class="w-full text-sm">
            <thead class="text-left text-gray-500">
              <tr>
                <th class="py-2 px-4">Skill</th>
                <th class="py-2 px-4">Category</th>
                <th class="py-2 px-4">Status</th>
                <th class="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="skill in skills" :key="skill.id" class="border-t">
                <td class="py-2 px-4">{{ skill.name }}</td>
                <td class="py-2 px-4">{{ skill.category }}</td>
                <td class="py-2 px-4">
                  <span :class="skill.active ? 'text-green-600' : 'text-red-500'">
                    {{ skill.active ? 'Enabled' : 'Disabled' }}
                  </span>
                </td>
                <td class="py-2 px-4 space-x-2">
                  <button class="text-blue-600 hover:underline">Edit</button>
                  <button class="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Skill Categories -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-700">Skill Categories</h2>
            <button class="bg-primary text-white px-4 py-1 rounded">+ Add Category</button>
          </div>
          <ul class="text-sm space-y-1">
            <li v-for="cat in skillCategories" :key="cat.id" class="flex justify-between">
              <span>{{ cat.name }}</span>
              <span class="text-gray-400 text-xs">#{{ cat.colorCode }}</span>
            </li>
          </ul>
        </div>

        <!-- Application Tags -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-700">Application Tags</h2>
            <button class="bg-primary text-white px-4 py-1 rounded">+ Add Tag</button>
          </div>
          <table class="w-full text-sm">
            <thead class="text-left text-gray-500">
              <tr>
                <th class="py-2 px-4">Tag</th>
                <th class="py-2 px-4">Description</th>
                <th class="py-2 px-4">Visible</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tag in tags" :key="tag.id" class="border-t">
                <td class="py-2 px-4">{{ tag.name }}</td>
                <td class="py-2 px-4">{{ tag.description }}</td>
                <td class="py-2 px-4">
                  <span :class="tag.visible ? 'text-green-600' : 'text-red-500'">
                    {{ tag.visible ? 'Yes' : 'No' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Optional Configs -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Other Configs</h2>
          <ul class="text-sm space-y-2 text-gray-600">
            <li>Job Titles</li>
            <li>Applicant Sources</li>
            <li>Experience Levels</li>
            <li>Citizenship / Document Types</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const skills = ref([
  { id: 1, name: 'Vue.js', category: 'Frontend', active: true },
  { id: 2, name: 'Node.js', category: 'Backend', active: true },
  { id: 3, name: 'Figma', category: 'Design', active: false }
]);

const skillCategories = ref([
  { id: 1, name: 'Frontend', colorCode: 'FFB347' },
  { id: 2, name: 'Backend', colorCode: '6A5ACD' },
  { id: 3, name: 'Design', colorCode: '48D1CC' }
]);

const tags = ref([
  { id: 1, name: 'Remote', description: 'Can work remotely', visible: true },
  { id: 2, name: 'Urgent Hire', description: 'Needs to be hired this week', visible: false }
]);
</script>
