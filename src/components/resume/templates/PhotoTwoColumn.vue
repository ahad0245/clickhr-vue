<template>
  <div class="photo-two-column-template flex font-sans border rounded-lg overflow-hidden shadow-lg">
    <div class="sidebar w-1/3 bg-gray-800 text-white p-6">
      <div class="flex flex-col items-center mb-6">
        <img v-if="resume.personal.profile_photo_url" :src="resume.personal.profile_photo_url as string" alt="Profile Photo" class="w-24 h-24 object-cover rounded-full mb-3 border-2 border-gray-400">
        <div v-else class="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 mb-3 border-2 border-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
        </div>
        <h2 class="text-2xl font-bold">{{ resume.personal.first_name }} {{ resume.personal.last_name }}</h2>
        <p class="text-md text-gray-300">{{ resume.personal.headline }}</p>
      </div>
      <hr class="border-gray-600 mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-200 mb-2">Details</h3>
        <p class="text-sm text-gray-400">{{ resume.personal.city }}, {{ resume.personal.state_province_region }}</p>
        <p class="text-sm text-gray-400 mt-1">Phone: {{ resume.personal.mobile_phone }}</p>
        <p class="text-sm text-gray-400 mt-1">Email: {{ resume.personal.email_0 }}</p>
      </div>
      <div class="mt-8">
        <h3 class="text-lg font-semibold text-gray-200 mb-2">Skills</h3>
        <p class="text-sm text-gray-400">{{ resume.employment.applicant_tags }}</p>
      </div>
    </div>

    <div class="main-content flex-1 p-6 bg-white">
      <section class="pb-6 mb-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Profile</h3>
        <p class="text-sm text-gray-700">{{ resume.additional.resume_text }}</p>
      </section>

      <section class="pb-6 mb-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Employment History</h3>
        <div v-for="(job, index) in resume.history.work_history" :key="index" class="mb-4">
          <h4 class="font-bold text-md text-gray-800">{{ job.job_title }} at {{ job.company_name }}</h4>
          <p class="text-xs text-gray-600">{{ job.start_date }} - {{ job.end_date || 'Present' }}</p>
          <p class="text-sm mt-1 text-gray-700">{{ job.job_description }}</p>
        </div>
      </section>

      <section>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Education</h3>
        <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mb-4">
          <h4 class="font-bold text-md text-gray-800">{{ edu.degree }} in {{ edu.field_of_study }}</h4>
          <p class="text-xs text-gray-600">{{ edu.institution_name }} ({{ edu.start_date }} - {{ edu.end_date || 'Present' }})</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
defineProps<{ resume: FormData }>();
</script>