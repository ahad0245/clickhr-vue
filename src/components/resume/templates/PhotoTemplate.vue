<template>
  <div class="p-8 bg-white border rounded shadow-lg font-serif text-gray-800">
    <div class="flex items-center space-x-6 pb-4 mb-4 border-b-2 border-amber-300">
      <img v-if="resume.personal.profile_photo_url" :src="resume.personal.profile_photo_url as string" alt="Profile Photo" class="h-24 w-24 object-cover rounded-full border-2 border-amber-400">
      <div v-else class="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 border-2 border-amber-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
      </div>
      <div>
        <h1 class="text-3xl font-bold text-amber-800">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h1>
        <h2 class="text-xl text-amber-700">{{ resume.personal.headline || '' }}</h2>
        <p class="text-sm text-gray-600 mt-2">Email: {{ resume.personal.email_0 || '' }} | Phone: {{ resume.personal.mobile_phone || '' }} | {{ resume.personal.city || '' }}, {{ resume.personal.state_province_region || '' }}</p>
      </div>
    </div>

    <section class="mb-4">
      <h3 class="text-lg font-semibold text-amber-800 border-b border-gray-300 pb-1">Summary</h3>
      <p class="text-sm text-gray-700 mt-2">{{ resume.additional.resume_text || 'N/A' }}</p>
    </section>

    <section class="mb-4">
      <h3 class="text-lg font-semibold text-amber-800 border-b border-gray-300 pb-1">Experience</h3>
      <div v-for="(job, index) in resume.history.work_history" :key="index" class="mt-2">
        <h4 class="font-bold text-md text-amber-700">{{ job.job_title || '' }} at {{ job.company_name || '' }}</h4>
        <p class="text-sm text-gray-600">({{ job.start_date || '' }} - {{ job.end_date || 'Present' }})</p>
        <p class="text-sm text-gray-700 mt-1">{{ job.job_description || 'N/A' }}</p>
      </div>
    </section>

    <section class="mb-4">
      <h3 class="text-lg font-semibold text-amber-800 border-b border-gray-300 pb-1">Education</h3>
      <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-2">
        <h4 class="font-bold text-md text-amber-700">{{ edu.degree || '' }} in {{ edu.field_of_study || '' }}</h4>
        <p class="text-sm text-gray-600">at {{ edu.institution_name || '' }}</p>
        <p class="text-xs text-gray-500">({{ edu.start_date || '' }} - {{ edu.end_date || 'Present' }})</p>
        <img v-if="edu.degree_image_url" :src="edu.degree_image_url as string" class="mt-2 h-16 object-contain" alt="Degree Image">
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
defineProps<{
  resume: FormData;
}>();
</script>