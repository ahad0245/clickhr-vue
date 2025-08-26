<template>
  <div class="modern-template">
    <aside class="sidebar">
      <h2 class="text-xl font-bold">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h2>
      <p class="text-sm text-gray-200">{{ resume.personal.headline || '' }}</p>
      <div class="mt-6">
        <h3 class="font-semibold text-white mb-2 border-b border-gray-600 pb-1">Contact</h3>
        <p class="text-sm text-gray-300">Email: {{ resume.personal.email_0 || '' }}</p>
        <p class="text-sm text-gray-300">Phone: {{ resume.personal.mobile_phone || '' }}</p>
        <p class="text-sm text-gray-300">Location: {{ resume.personal.city || '' }}, {{ resume.personal.state_province_region || '' }}</p>
      </div>
    </aside>

    <main class="content">
      <section v-if="resume.additional.resume_text">
        <h2 class="text-lg font-bold border-b-2 border-blue-500 pb-1">Summary</h2>
        <p class="text-sm">{{ resume.additional.resume_text }}</p>
      </section>
      
      <section v-if="resume.history.work_history && resume.history.work_history.length">
        <h2 class="text-lg font-bold border-b-2 border-blue-500 pb-1">Experience</h2>
        <div v-for="(exp, index) in resume.history.work_history" :key="index" class="card mt-2">
          <h3 class="font-semibold text-md">{{ exp.job_title || '' }}</h3>
          <p class="text-sm text-gray-600">{{ exp.company_name || '' }} | {{ exp.start_date || '' }} - {{ exp.end_date || 'Present' }}</p>
          <p class="text-sm mt-1">{{ exp.job_description || '' }}</p>
        </div>
      </section>

      <section v-if="resume.history.education_history && resume.history.education_history.length">
        <h2 class="text-lg font-bold border-b-2 border-blue-500 pb-1">Education</h2>
        <div v-for="(edu, index) in resume.history.education_history" :key="index" class="card mt-2">
          <h3 class="font-semibold text-md">{{ edu.degree || '' }}</h3>
          <p class="text-sm text-gray-600">{{ edu.institution_name || '' }} | {{ edu.start_date || '' }} - {{ edu.end_date || 'Present' }}</p>
        </div>
      </section>

      <section v-if="resume.employment.applicant_tags">
        <h2 class="text-lg font-bold border-b-2 border-blue-500 pb-1">Skills</h2>
        <p class="text-sm">{{ resume.employment.applicant_tags }}</p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
defineProps<{
  resume: FormData;
}>();
</script>

<style scoped>
.modern-template {
  display: flex;
  font-family: 'Segoe UI', sans-serif;
  color: #444;
  max-width: 1000px;
  margin: auto;
  border: 1px solid #ddd;
}
.sidebar {
  width: 30%;
  background: #2563eb;
  color: #fff;
  padding: 20px;
}
.content {
  width: 70%;
  padding: 20px;
  background-color: #f8fafc;
}
h2 {
  margin-top: 15px;
  margin-bottom: 10px;
  color: #2563eb;
}
.card {
  background: #fff;
  border-left: 3px solid #2563eb;
  padding: 10px;
  border-radius: 4px;
}
</style>