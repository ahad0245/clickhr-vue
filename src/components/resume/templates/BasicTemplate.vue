<template>
  <div class="p-6 bg-white border rounded shadow-lg font-sans text-gray-800">
    <div class="header pb-4 mb-4 border-b">
      <h1 class="text-3xl font-bold">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h1>
      <h2 class="text-xl font-medium text-gray-600">{{ resume.personal.headline || '' }}</h2>
      <p class="text-sm text-gray-500 mt-2">{{ resume.personal.city || '' }}, {{ resume.personal.state_province_region || '' }}</p>
      <p class="text-sm text-gray-500">Email: {{ resume.personal.email_0 || '' }} | Phone: {{ resume.personal.mobile_phone || '' }}</p>
    </div>

    <section class="mb-4">
      <h3 class="text-lg font-semibold text-gray-700 border-b-2 pb-1">Summary</h3>
      <p class="text-sm text-gray-700 mt-2">{{ resume.additional.resume_text || 'N/A' }}</p>
    </section>

    <section class="mb-4">
      <h3 class="text-lg font-semibold text-gray-700 border-b-2 pb-1">Skills</h3>
      <p class="text-sm text-gray-700 mt-2">{{ resume.employment.applicant_tags || 'N/A' }}</p>
    </section>

    <section class="mb-4">
      <h3 class="text-lg font-semibold text-gray-700 border-b-2 pb-1">Experience</h3>
      <div v-for="(job, index) in resume.history.work_history" :key="index" class="mt-2">
        <h4 class="font-bold text-md text-gray-800">{{ job.job_title || '' }} at {{ job.company_name || '' }}</h4>
        <p class="text-xs text-gray-500">{{ job.start_date || '' }} - {{ job.end_date || 'Present' }}</p>
        <p class="text-sm text-gray-700 mt-1">{{ job.job_description || 'N/A' }}</p>
      </div>
    </section>

    <section>
      <h3 class="text-lg font-semibold text-gray-700 border-b-2 pb-1">Education</h3>
      <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-2">
        <h4 class="font-bold text-md text-gray-800">{{ edu.degree || '' }} in {{ edu.field_of_study || '' }}</h4>
        <p class="text-sm text-gray-700">at {{ edu.institution_name || '' }}</p>
        <p class="text-xs text-gray-500">({{ edu.start_date || '' }} - {{ edu.end_date || 'Present' }})</p>
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