<template>
  <div class="two-column-modern-template flex font-sans border rounded-lg overflow-hidden shadow-lg p-6">
    <div class="sidebar w-1/3 bg-gray-50 p-4 border-r">
      <h2 class="text-xl font-bold mb-4">{{ resume.personal.first_name }} {{ resume.personal.last_name }}</h2>
      <p class="text-sm text-gray-600">{{ resume.personal.headline }}</p>
      
      <div class="mt-6">
        <h3 class="text-md font-semibold text-gray-700 mb-2 border-b pb-1">Contact</h3>
        <p class="text-xs text-gray-500">Email: {{ resume.personal.email_0 }}</p>
        <p class="text-xs text-gray-500">Phone: {{ resume.personal.mobile_phone }}</p>
        <p class="text-xs text-gray-500">Location: {{ resume.personal.city }}, {{ resume.personal.state_province_region }}</p>
      </div>
      
      <div class="mt-6">
        <h3 class="text-md font-semibold text-gray-700 mb-2 border-b pb-1">Skills</h3>
        <p class="text-xs text-gray-500">{{ resume.employment.applicant_tags }}</p>
      </div>
    </div>
    
    <div class="main-content flex-1 p-4">
      <div class="pb-6 border-b">
        <h3 class="text-md font-semibold text-gray-700 mb-2">Profile</h3>
        <p class="text-sm text-gray-600">{{ resume.additional.resume_text }}</p>
      </div>
      
      <div class="mt-6 pb-6 border-b">
        <h3 class="text-md font-semibold text-gray-700 mb-2">Work History</h3>
        <div v-for="(job, index) in resume.history.work_history" :key="index" class="mb-4">
          <h4 class="font-bold text-sm">{{ job.job_title }} at {{ job.company_name }}</h4>
          <p class="text-xs text-gray-500">{{ job.start_date }} - {{ job.end_date || 'Present' }}</p>
          <p class="text-sm mt-1 text-gray-600">{{ job.job_description }}</p>
        </div>
      </div>
      
      <div class="mt-6">
        <h3 class="text-md font-semibold text-gray-700 mb-2">Education</h3>
        <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mb-4">
          <h4 class="font-bold text-sm">{{ edu.degree }} in {{ edu.field_of_study }}</h4>
          <p class="text-xs text-gray-500">{{ edu.institution_name }} ({{ edu.start_date }} - {{ edu.end_date || 'Present' }})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
defineProps<{ resume: FormData }>();
</script>