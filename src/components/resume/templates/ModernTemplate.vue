<template>
  <div class="modern-template font-sans border rounded-lg overflow-hidden shadow-lg p-6">
    <div class="header pb-4 mb-6 border-b-4" :style="{ borderColor: resumeStore.selectedPalette.background }">
      <h1 class="text-4xl font-extrabold text-gray-800">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h1>
      <h2 class="text-xl font-medium" :class="resumeStore.selectedPalette.primary">{{ resume.personal.headline || '' }}</h2>
      <div class="mt-4 flex flex-wrap justify-between text-sm text-gray-600">
        <span>Email: {{ resume.personal.email_0 || '' }}</span>
        <span>Phone: {{ resume.personal.mobile_phone || '' }}</span>
        <span>Location: {{ resume.personal.city || '' }}, {{ resume.personal.state_province_region || '' }}</span>
      </div>
    </div>
    
    <section v-if="resume.additional.resume_text" class="mb-6">
      <h3 class="text-xl font-bold text-gray-800 border-b-2 pb-1" :class="resumeStore.selectedPalette.primary">Summary</h3>
      <p class="text-sm text-gray-700 mt-2">{{ resume.additional.resume_text }}</p>
    </section>
    
    <section v-if="resume.history.work_history && resume.history.work_history.length" class="mb-6">
      <h3 class="text-xl font-bold text-gray-800 border-b-2 pb-1" :class="resumeStore.selectedPalette.primary">Experience</h3>
      <div v-for="(job, index) in resume.history.work_history" :key="index" class="mt-4 pl-4 border-l-4 border-gray-200">
        <h4 class="font-bold text-lg text-gray-800">{{ job.job_title || '' }} at {{ job.company_name || '' }}</h4>
        <p class="text-sm text-gray-600">({{ job.start_date || '' }} - {{ job.end_date || 'Present' }})</p>
        <p class="text-sm text-gray-700 mt-1">{{ job.job_description || '' }}</p>
      </div>
    </section>

    <section v-if="resume.history.education_history && resume.history.education_history.length" class="mb-6">
      <h3 class="text-xl font-bold text-gray-800 border-b-2 pb-1" :class="resumeStore.selectedPalette.primary">Education</h3>
      <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-4 pl-4 border-l-4 border-gray-200">
        <h4 class="font-bold text-lg text-gray-800">{{ edu.degree || '' }}</h4>
        <p class="text-sm text-gray-600">in {{ edu.field_of_study || '' }} from {{ edu.institution_name || '' }}</p>
        <p class="text-xs text-gray-500">({{ edu.start_date || '' }} - {{ edu.end_date || 'Present' }})</p>
      </div>
    </section>

    <section v-if="resume.certifications && resume.certifications.length" class="mb-6">
      <h3 class="text-xl font-bold text-gray-800 border-b-2 pb-1" :class="resumeStore.selectedPalette.primary">Certifications</h3>
      <div v-for="(cert, index) in resume.certifications" :key="index" class="mt-4 pl-4 border-l-4 border-gray-200">
        <h4 class="font-bold text-lg text-gray-800">{{ cert.certification_name }}</h4>
        <p class="text-sm text-gray-600">Issued by {{ cert.certification_body }} on {{ cert.certification_date }}</p>
      </div>
    </section>

    <section v-if="resume.employment.applicant_tags">
      <h3 class="text-xl font-bold text-gray-800 border-b-2 pb-1" :class="resumeStore.selectedPalette.primary">Skills</h3>
      <p class="text-sm text-gray-700 mt-2">{{ resume.employment.applicant_tags }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
import { useResumeStore } from '@/stores/resumeStore';
const resumeStore = useResumeStore();
defineProps<{
  resume: FormData;
}>();
</script>