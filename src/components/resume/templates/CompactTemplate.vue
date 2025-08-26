<template>
  <div class="compact-template p-4">
    <header class="text-center pb-2 border-b">
      <h1 class="text-2xl font-bold">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h1>
      <p class="text-sm text-gray-600">{{ resume.personal.headline || '' }}</p>
      <p class="text-xs text-gray-500">{{ resume.personal.email_0 || '' }} | {{ resume.personal.mobile_phone || '' }}</p>
    </header>

    <section v-if="resume.history.work_history && resume.history.work_history.length">
      <h2 class="text-md font-semibold mt-4 border-b pb-1">Experience</h2>
      <div v-for="(exp, index) in resume.history.work_history" :key="index" class="experience-item mt-2">
        <p class="text-sm"><strong>{{ exp.job_title || '' }}</strong> at {{ exp.company_name || '' }}</p>
        <p class="text-xs text-gray-500">({{ exp.start_date || '' }} - {{ exp.end_date || 'Present' }})</p>
      </div>
    </section>

    <section v-if="resume.history.education_history && resume.history.education_history.length">
      <h2 class="text-md font-semibold mt-4 border-b pb-1">Education</h2>
      <div v-for="(edu, index) in resume.history.education_history" :key="index" class="education-item mt-2">
        <p class="text-sm"><strong>{{ edu.degree || '' }}</strong> at {{ edu.institution_name || '' }}</p>
        <p class="text-xs text-gray-500">({{ edu.start_date || '' }} - {{ edu.end_date || 'Present' }})</p>
      </div>
    </section>

    <section>
      <h2 class="text-md font-semibold mt-4 border-b pb-1">Skills</h2>
      <p class="text-sm mt-2">{{ resume.employment.applicant_tags || 'N/A' }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
// Corrected prop name from 'formData' to 'resume'
defineProps<{
  resume: FormData;
}>();
</script>

<style scoped>
.compact-template {
  font-family: Arial, sans-serif;
  max-width: 700px;
  margin: auto;
  color: #333;
  line-height: 1.4;
}
</style>