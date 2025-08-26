<template>
  <div class="p-4 bg-white border rounded shadow-lg">
    <h1 class="text-2xl font-bold">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h1>
    <h2 class="text-lg text-gray-600">{{ resume.personal.headline || '' }}</h2>
    <p class="text-sm text-gray-500">{{ resume.personal.city || '' }}, {{ resume.personal.state_province_region || '' }}</p>
    <p class="text-sm text-gray-500">Email: {{ resume.personal.email_0 || '' }} | Phone: {{ resume.personal.mobile_phone || '' }}</p>

    <h3 class="text-md font-semibold mt-4 border-b pb-1">Summary</h3>
    <p class="text-sm mt-2">{{ resume.additional.resume_text || 'N/A' }}</p>

    <h3 class="text-md font-semibold mt-4 border-b pb-1">Skills</h3>
    <p class="text-sm mt-2">{{ resume.employment.applicant_tags || 'N/A' }}</p>

    <h3 class="text-md font-semibold mt-4 border-b pb-1">Experience</h3>
    <div v-for="(job, index) in resume.history.work_history" :key="index" class="mt-2">
      <p class="font-bold">{{ job.job_title || '' }}</p>
      <p class="text-sm text-gray-700"><strong>{{ job.company_name || '' }}</strong> ({{ job.start_date || '' }} - {{ job.end_date || 'Present' }})</p>
      <p class="text-sm text-gray-600">{{ job.job_description || 'N/A' }}</p>
    </div>

    <h3 class="text-md font-semibold mt-4 border-b pb-1">Education</h3>
    <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-2">
      <p class="font-bold">{{ edu.degree || '' }} in {{ edu.field_of_study || '' }}</p>
      <p class="text-sm text-gray-700"><strong>{{ edu.institution_name || '' }}</strong> ({{ edu.start_date || '' }} - {{ edu.end_date || 'Present' }})</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
defineProps<{
  resume: FormData;
}>();
</script>