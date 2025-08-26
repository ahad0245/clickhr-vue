<template>
  <div class="photo-single-column-template font-sans border rounded-lg overflow-hidden shadow-lg p-8">
    <div class="header text-center pb-4 mb-6 border-b-2 border-teal-500">
      <img v-if="resume.personal.profile_photo_url" :src="resume.personal.profile_photo_url as string" alt="Profile Photo" class="w-24 h-24 object-cover rounded-full mb-3 mx-auto border-2 border-teal-400">
      <div v-else class="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-3 mx-auto border-2 border-teal-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
      </div>
      <h1 class="text-3xl font-extrabold text-teal-700">{{ resume.personal.first_name }} {{ resume.personal.last_name }}</h1>
      <p class="text-md text-teal-600 mt-1">{{ resume.personal.headline }}</p>
      <div class="flex justify-center space-x-4 text-sm text-gray-500 mt-2">
        <span>{{ resume.personal.mobile_phone }}</span>
        <span>{{ resume.personal.email_0 }}</span>
        <span>{{ resume.personal.city }}, {{ resume.personal.state_province_region }}</span>
      </div>
    </div>
    
    <section class="section mb-6">
      <h2 class="text-lg font-bold text-gray-800 border-b-2 border-teal-500 inline-block pr-4 pb-1">Summary</h2>
      <p class="text-sm text-gray-700 mt-2">{{ resume.additional.resume_text }}</p>
    </section>
    
    <section class="section mb-6">
      <h2 class="text-lg font-bold text-gray-800 border-b-2 border-teal-500 inline-block pr-4 pb-1">Experience</h2>
      <div v-for="(job, index) in resume.history.work_history" :key="index" class="mt-4">
        <div class="flex justify-between items-baseline">
          <h3 class="font-bold text-md text-gray-800">{{ job.job_title }} at {{ job.company_name }}</h3>
          <span class="text-xs text-gray-500">{{ job.start_date }} - {{ job.end_date || 'Present' }}</span>
        </div>
        <p class="text-sm text-gray-700 italic mt-1">{{ job.job_description }}</p>
      </div>
    </section>
    
    <section class="section mb-6">
      <h2 class="text-lg font-bold text-gray-800 border-b-2 border-teal-500 inline-block pr-4 pb-1">Education</h2>
      <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-4">
        <div class="flex justify-between items-baseline">
          <h3 class="font-bold text-md text-gray-800">{{ edu.degree }} in {{ edu.field_of_study }}</h3>
          <span class="text-xs text-gray-500">{{ edu.start_date }} - {{ edu.end_date || 'Present' }}</span>
        </div>
        <p class="text-sm text-gray-700 italic">{{ edu.institution_name }}</p>
      </div>
    </section>

    <section class="section">
      <h2 class="text-lg font-bold text-gray-800 border-b-2 border-teal-500 inline-block pr-4 pb-1">Skills</h2>
      <p class="text-sm text-gray-700 mt-2">{{ resume.employment.applicant_tags }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
defineProps<{ resume: FormData }>();
</script>