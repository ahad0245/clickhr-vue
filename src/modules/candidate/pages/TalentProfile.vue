<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
    <div class="max-w-7xl mx-auto">
      <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Talent Profile Management</h1>
          <p class="text-gray-500 mt-1">
            {{ talent.first_name || '[New Talent]' }}
          </p>
        </div>
        <button class="w-full sm:w-auto mt-4 sm:mt-0 bg-primary text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
          Save Changes
        </button>
      </div>

      <div class="mb-6 border-b border-gray-200">
        <nav class="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-lg">
        <!-- TABS CONTENT HERE (UNCHANGED) -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Talent {
  talent_id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  headline: string;
  mobile_phone: string;
  work_phone: string;
  country: string;
  address_1: string;
  city: string;
  state_province_region: string;
  zip_postal_code: string;
  employment_type: string;
  talent_status: string;
  applicant_source: string;
  applicant_tags: string;
  details_notes: string;
  add_to_hotlist: boolean;
  work_history: any[];
  education_history: any[];
  skills: any[];
  certifications: any[];
  profiles: {
    job_board: any;
    social_media: any;
    vcs: any;
  };
}

const activeTab = ref('profile');

const tabs = [
  { id: 'profile', name: 'Profile' },
  { id: 'experience', name: 'Experience' },
  { id: 'skills', name: 'Skills & Certifications' },
  { id: 'presence', name: 'Online Presence' },
  { id: 'admin', name: 'Admin & Notes' },
];

const talent = reactive<Talent>({
  talent_id: null,
  first_name: 'nanme',
  last_name: '',
  email: '',
  headline: '',
  mobile_phone: '',
  work_phone: '',
  country: '',
  address_1: '',
  city: '',
  state_province_region: '',
  zip_postal_code: '',
  employment_type: '',
  talent_status: '',
  applicant_source: '',
  applicant_tags: '',
  details_notes: '',
  add_to_hotlist: false,
  work_history: [],
  education_history: [],
  skills: [],
  certifications: [],
  profiles: {
    job_board: {},
    social_media: {},
    vcs: {}
  }
});
</script>

<style scoped>
.form-input {
  @apply block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition;
}
.form-checkbox {
  @apply h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500;
}
.form-button-secondary {
  @apply bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors;
}
</style>
