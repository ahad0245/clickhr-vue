<template>
  <div class="traditional-template font-sans p-8 text-gray-800 border rounded-lg shadow-lg">
    <div class="header flex justify-between items-center pb-4 mb-6 border-b-2 border-gray-400">
      <div>
        <h1 class="text-4xl font-extrabold">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h1>
        <p class="text-xl text-gray-600 mt-1">{{ resume.personal.headline || '' }}</p>
      </div>
      <div class="text-right text-sm text-gray-600">
        <p>{{ resume.personal.city || '' }}, {{ resume.personal.state_province_region || '' }}</p>
        <p>Email: {{ resume.personal.email_0 || '' }}</p>
        <p>Phone: {{ resume.personal.mobile_phone || '' }}</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="col-span-2">
        <section v-if="resume.additional.resume_text" class="mb-6">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Summary</h3>
          <p class="text-sm text-gray-700 mt-2 leading-relaxed">{{ resume.additional.resume_text }}</p>
        </section>

        <section v-if="resume.history.work_history && resume.history.work_history.length" class="mb-6">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Experience</h3>
          <div v-for="(job, index) in resume.history.work_history" :key="index" class="mt-4">
            <h4 class="font-bold text-lg text-gray-800">{{ job.job_title || '' }}</h4>
            <p class="text-sm text-gray-600">{{ job.company_name || '' }} | {{ job.start_date || '' }} - {{ job.end_date || 'Present' }}</p>
            <p class="text-sm text-gray-700 mt-1">{{ job.job_description || '' }}</p>
          </div>
        </section>

        <section v-if="resume.history.education_history && resume.history.education_history.length">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Education</h3>
          <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-4">
            <h4 class="font-bold text-lg text-gray-800">{{ edu.degree || '' }}</h4>
            <p class="text-sm text-gray-600">{{ edu.institution_name || '' }} | {{ edu.start_date || '' }} - {{ edu.end_date || 'Present' }}</p>
          </div>
        </section>
      </div>
      
      <div class="col-span-1 border-l-2 border-gray-200 pl-6">
        <section v-if="resume.employment.applicant_tags" class="mb-6">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Skills</h3>
          <p class="text-sm text-gray-700 mt-2 leading-relaxed">{{ resume.employment.applicant_tags }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
defineProps<{ resume: FormData }>();
</script>