<template>
  <div class="two-column-modern-template flex font-sans border rounded-lg overflow-hidden shadow-lg">
    <div class="sidebar w-1/3 bg-gray-100 p-6 border-r border-gray-200">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800">{{ resume.personal.first_name }} {{ resume.personal.last_name }}</h2>
        <p class="text-md text-gray-700">{{ resume.personal.headline }}</p>
      </div>
      
      <div class="mt-8">
        <h3 class="text-lg font-semibold mb-2 border-b pb-1" :class="resumeStore.selectedPalette.primary" :style="{ borderColor: resumeStore.selectedPalette.border }">Contact</h3>
        <p class="text-sm text-gray-700">Email: {{ resume.personal.email_0 }}</p>
        <p class="text-sm text-gray-700 mt-1">Phone: {{ resume.personal.mobile_phone }}</p>
        <p class="text-sm text-gray-700 mt-1">Location: {{ resume.personal.city }}, {{ resume.personal.state_province_region }}</p>
      </div>
      
      <div class="mt-8">
        <h3 class="text-lg font-semibold mb-2 border-b pb-1" :class="resumeStore.selectedPalette.primary" :style="{ borderColor: resumeStore.selectedPalette.border }">Skills</h3>
        <p class="text-sm text-gray-700 mt-2">{{ resume.employment.applicant_tags }}</p>
      </div>
    </div>
    
    <div class="main-content flex-1 p-6 bg-white">
      <div class="pb-6 mb-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Profile</h3>
        <p class="text-sm text-gray-700">{{ resume.additional.resume_text }}</p>
      </div>
      
      <div class="pb-6 mb-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Work History</h3>
        <div v-for="(job, index) in resume.history.work_history" :key="index" class="mb-4 text-right">
          <h4 class="font-bold text-md text-gray-800">{{ job.job_title }} at {{ job.company_name }}</h4>
          <p class="text-xs text-gray-600">{{ job.start_date }} - {{ job.end_date || 'Present' }}</p>
          <p class="text-sm mt-1 text-gray-700">{{ job.job_description }}</p>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Education</h3>
        <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mb-4 text-right">
          <h4 class="font-bold text-md text-gray-800">{{ edu.degree }} in {{ edu.field_of_study }}</h4>
          <p class="text-xs text-gray-600">{{ edu.institution_name }} ({{ edu.start_date }} - {{ edu.end_date || 'Present' }})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
import { useResumeStore } from '@/stores/resumeStore';
const resumeStore = useResumeStore();
defineProps<{ resume: FormData }>();
</script>