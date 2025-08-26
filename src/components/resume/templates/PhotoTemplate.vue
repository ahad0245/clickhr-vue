<template>
  <div class="p-4 bg-white border rounded shadow-lg">
    <div class="flex items-center space-x-4 mb-4">
      <img v-if="resume.personal.profile_photo_url" :src="resume.personal.profile_photo_url as string" alt="Profile Photo" class="h-20 w-20 rounded-full object-cover border-2 border-gray-200">
      <div v-else class="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
      </div>
      <div>
        <h1 class="text-2xl font-bold">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h1>
        <h2 class="text-lg text-gray-600">{{ resume.personal.headline || '' }}</h2>
        <p class="text-sm text-gray-500">{{ resume.personal.city || '' }}, {{ resume.personal.state_province_region || '' }}</p>
      </div>
    </div>
    <p class="text-sm text-gray-500 mb-4">Email: {{ resume.personal.email_0 || '' }} | Phone: {{ resume.personal.mobile_phone || '' }}</p>

    <h3 class="text-md font-semibold mt-4 border-b pb-1">Summary</h3>
    <p class="text-sm mt-2">{{ resume.additional.resume_text || 'N/A' }}</p>

    <h3 class="text-md font-semibold mt-4 border-b pb-1">Experience</h3>
    <div v-for="(job, index) in resume.history.work_history" :key="index" class="mt-2">
      <p class="font-bold">{{ job.job_title || '' }}</p>
      <p class="text-sm text-gray-700"><strong>{{ job.company_name || '' }}</strong> ({{ job.start_date || '' }} - {{ job.end_date || 'Present' }})</p>
      <p class="text-sm text-gray-600">{{ job.job_description || 'N/A' }}</p>
    </div>

    <h3 class="text-md font-semibold mt-4 border-b pb-1">Education</h3>
    <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-2">
      <div class="flex items-center space-x-2">
          <div>
            <p class="font-bold">{{ edu.degree || '' }} in {{ edu.field_of_study || '' }}</p>
            <p class="text-sm text-gray-700"><strong>{{ edu.institution_name || '' }}</strong> ({{ edu.start_date || '' }} - {{ edu.end_date || 'Present' }})</p>
          </div>
          <img v-if="edu.degree_image_url" :src="edu.degree_image_url as string" class="h-16 object-contain" alt="Degree Image">
      </div>
    </div>

    <h3 class="text-md font-semibold mt-4 border-b pb-1">Certifications</h3>
    <div v-for="(cert, index) in resume.certifications" :key="index" class="mt-2">
      <p class="text-sm text-gray-700"><strong>{{ cert.certification_name }}</strong> from {{ cert.certification_body }}</p>
      <p class="text-xs text-gray-500">Date: {{ cert.certification_date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
defineProps<{
  resume: FormData;
}>();
</script>