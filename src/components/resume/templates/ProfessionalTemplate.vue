<template>
  <div class="modern-template flex font-sans border rounded-lg overflow-hidden shadow-lg">
    <aside class="sidebar w-1/4 p-6" style="background-color: #1d4ed8; color: #ffffff;">
      <h2 class="text-2xl font-bold mb-1">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h2>
      <p class="text-md text-blue-100">{{ resume.personal.headline || '' }}</p>
      <div class="mt-8">
        <h3 class="font-semibold text-blue-100 mb-2 border-b border-blue-400 pb-1">Contact</h3>
        <p class="text-sm text-blue-100">Email: {{ resume.personal.email_0 || '' }}</p>
        <p class="text-sm text-blue-100">Phone: {{ resume.personal.mobile_phone || '' }}</p>
        <p class="text-sm text-blue-100">Location: {{ resume.personal.city || '' }}, {{ resume.personal.state_province_region || '' }}</p>
      </div>
      <div class="mt-8" v-if="resume.skills && resume.skills.length">
        <h3 class="font-semibold text-blue-100 mb-2 border-b border-blue-400 pb-1">Skills</h3>
        <ul class="list-none text-sm text-blue-100">
          <li v-for="(skill, index) in resume.skills" :key="index">{{ skill.skill_name }} ({{ skill.skill_proficiency_level }})</li>
        </ul>
      </div>
      <div class="mt-8" v-if="resume.projects && resume.projects.length">
        <h3 class="font-semibold text-blue-100 mb-2 border-b border-blue-400 pb-1">Projects</h3>
        <ul class="list-none text-sm text-blue-100">
          <li v-for="(project, index) in resume.projects" :key="index">
            <span class="font-bold">{{ project.proj_name }}</span>: {{ project.proj_forWhom }}
          </li>
        </ul>
      </div>
      <div class="mt-8" v-if="resume.references && resume.references.length">
        <h3 class="font-semibold text-blue-100 mb-2 border-b border-blue-400 pb-1">References</h3>
        <ul class="list-none text-sm text-blue-100">
          <li v-for="(reference, index) in resume.references" :key="index">
            <strong>{{ reference.full_name }}</strong>, {{ reference.designation }}
          </li>
        </ul>
      </div>
    </aside>

    <main class="content flex-1 p-8 bg-white">
      <section v-if="resume.additional.resume_text" class="pb-6 mb-6 border-b">
        <h2 class="text-xl font-bold text-gray-800 border-b-2 border-blue-700 pb-1 mb-4">Summary</h2>
        <p class="text-base text-gray-700">{{ resume.additional.resume_text }}</p>
      </section>
      <section v-if="resume.history.education_history && resume.history.education_history.length">
        <h2 class="text-xl font-bold text-gray-800 border-b-2 border-blue-700 pb-1 mb-4">Education</h2>
        <div v-for="(edu, index) in resume.history.education_history" :key="index" class="card mt-4">
          <h3 class="font-bold text-lg text-gray-800">{{ edu.degree || '' }}</h3>
          <p class="text-sm text-gray-600">{{ edu.institution_name || '' }} | {{ edu.start_date || '' }} - {{ edu.end_date || 'Present' }}</p>
        </div>
      </section>
      
      <section v-if="resume.history.work_history && resume.history.work_history.length" class="pb-6 mb-6 border-b">
        <h2 class="text-xl font-bold text-gray-800 border-b-2 border-blue-700 pb-1 mb-4">Experience</h2>
        <div v-for="(job, index) in resume.history.work_history" :key="index" class="card mt-4">
          <h3 class="font-bold text-lg text-gray-800">{{ job.job_title || '' }}</h3>
          <p class="text-sm text-gray-600">{{ job.company_name || '' }} | {{ job.start_date || '' }} - {{ job.end_date || 'Present' }}</p>
          <p class="text-sm text-gray-700 mt-2">{{ job.job_description || '' }}</p>
        </div>
      </section>

      <section v-if="resume.certifications && resume.certifications.length">
        <h2 class="text-xl font-bold text-gray-800 border-b-2 border-blue-700 pb-1 mb-4">Certifications</h2>
        <div v-for="(cert, index) in resume.certifications" :key="index" class="card mt-4">
          <h3 class="font-bold text-lg text-gray-800">{{ cert.certification_name }}</h3>
          <p class="text-sm text-gray-600">Issued by {{ cert.certification_body }} on {{ cert.certification_date }}</p>
        </div>
      </section>
    </main>
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

<style scoped>
.modern-template {
  display: flex;
  font-family: 'Segoe UI', sans-serif;
  max-width: 1000px;
  margin: auto;
  border: 1px solid #ddd;
}
.card {
  background: #fff;
  border-left: 3px solid #1d4ed8;
  padding-left: 1rem;
  border-radius: 4px;
}
</style>