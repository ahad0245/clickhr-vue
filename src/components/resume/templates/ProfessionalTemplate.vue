<template>
  <div class="professional-template font-sans border rounded-lg overflow-hidden shadow-lg p-8">
    <div class="header pb-4 border-b-2 border-gray-300 mb-6 text-center">
      <h1 class="text-3xl font-extrabold text-gray-900">{{ resume.personal.first_name }} {{ resume.personal.last_name }}</h1>
      <p class="text-md text-gray-600 mt-1">{{ resume.personal.headline }}</p>
    </div>

    <div class="contact-info flex justify-center space-x-6 text-sm text-gray-500 mb-6">
      <span>{{ resume.personal.mobile_phone }}</span>
      <span>{{ resume.personal.email_0 }}</span>
      <span>{{ resume.personal.city }}, {{ resume.personal.state_province_region }}</span>
    </div>
    
    <div class="section mb-6">
      <h2 class="text-lg font-bold text-gray-800 border-b-2 border-blue-500 inline-block pr-4 pb-1">Summary</h2>
      <p class="text-sm text-gray-700 mt-2">{{ resume.additional.resume_text }}</p>
    </div>
    
    <div class="section mb-6">
      <h2 class="text-lg font-bold text-gray-800 border-b-2 border-blue-500 inline-block pr-4 pb-1">Experience</h2>
      <div v-for="(job, index) in resume.history.work_history" :key="index" class="mt-4">
        <div class="flex justify-between items-baseline">
          <h3 class="font-bold text-md">{{ job.job_title }}</h3>
          <span class="text-xs text-gray-500">{{ job.start_date }} - {{ job.end_date || 'Present' }}</span>
        </div>
        <p class="text-sm text-gray-600 italic">{{ job.company_name }}</p>
        <p class="text-sm text-gray-700 mt-1">{{ job.job_description }}</p>
      </div>
    </div>
    
    <div class="section mb-6">
      <h2 class="text-lg font-bold text-gray-800 border-b-2 border-blue-500 inline-block pr-4 pb-1">Education</h2>
      <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-4">
        <div class="flex justify-between items-baseline">
          <h3 class="font-bold text-md">{{ edu.degree }} in {{ edu.field_of_study }}</h3>
          <span class="text-xs text-gray-500">{{ edu.start_date }} - {{ edu.end_date || 'Present' }}</span>
        </div>
        <p class="text-sm text-gray-600 italic">{{ edu.institution_name }}</p>
      </div>
    </div>

    <div class="section">
      <h2 class="text-lg font-bold text-gray-800 border-b-2 border-blue-500 inline-block pr-4 pb-1">Skills</h2>
      <p class="text-sm text-gray-700 mt-2">{{ resume.employment.applicant_tags }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
defineProps<{ resume: FormData }>();
</script>