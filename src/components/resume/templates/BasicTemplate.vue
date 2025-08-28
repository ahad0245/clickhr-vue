<template>
  <div class="p-6 bg-white border rounded shadow-lg font-sans text-gray-800">
    <div class="header pb-4 mb-4 border-b">
      <h1 class="text-3xl font-bold">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h1>
      <h2 class="text-xl font-medium text-gray-600">{{ resume.personal.headline || '' }}</h2>
      <p class="text-sm text-gray-500 mt-2">{{ resume.personal.city || '' }}, {{ resume.personal.state_province_region || '' }}</p>
      <p class="text-sm text-gray-500">Email: {{ resume.personal.email_0 || '' }} | Phone: {{ resume.personal.mobile_phone || '' }}</p>
    </div>

    <section class="mb-4" v-if="resume.additional.resume_text">
      <h3 class="text-lg font-semibold text-gray-700 border-b-2 pb-1">Summary</h3>
      <p class="text-sm text-gray-700 mt-2">{{ resume.additional.resume_text || 'N/A' }}</p>
    </section>

    <section class="mb-4" v-if="resume.skills && resume.skills.length">
      <h3 class="text-lg font-semibold text-gray-700 border-b-2 pb-1">Skills</h3>
      <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
        <li v-for="(skill, index) in resume.skills" :key="index">{{ skill.skill_name }} ({{ skill.skill_proficiency_level }})</li>
      </ul>
    </section>
    
    <section class="mb-4" v-if="resume.history.work_history && resume.history.work_history.length">
      <h3 class="text-lg font-semibold text-gray-700 border-b-2 pb-1">Experience</h3>
      <div v-for="(job, index) in resume.history.work_history" :key="index" class="mt-2">
        <h4 class="font-bold text-md text-gray-800">{{ job.job_title || '' }} at {{ job.company_name || '' }}</h4>
        <p class="text-xs text-gray-500">{{ job.start_date || '' }} - {{ job.is_current_job ? 'Present' : (job.end_date || '') }}</p>
        <p class="text-sm text-gray-700 mt-1">{{ job.job_description || 'N/A' }}</p>
      </div>
    </section>

    <section class="mb-4" v-if="resume.history.education_history && resume.history.education_history.length">
      <h3 class="text-lg font-semibold text-gray-700 border-b-2 pb-1">Education</h3>
      <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-2">
        <h4 class="font-bold text-md text-gray-800">{{ edu.degree || '' }} in {{ edu.field_of_study || '' }}</h4>
        <p class="text-sm text-gray-700">at {{ edu.institution_name || '' }}</p>
        <p class="text-xs text-gray-500">({{ edu.start_date || '' }} - {{ edu.is_current_education ? 'Present' : (edu.end_date || '') }})</p>
      </div>
    </section>

    <section class="mb-4" v-if="resume.projects && resume.projects.length">
      <h3 class="text-lg font-semibold text-gray-700 border-b-2 pb-1">Projects</h3>
      <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
        <li v-for="(project, index) in resume.projects" :key="index">
          <strong>{{ project.proj_name }}</strong>: {{ project.proj_description }}
        </li>
      </ul>
    </section>

    <section class="mb-4" v-if="resume.references && resume.references.length">
      <h3 class="text-lg font-semibold text-gray-700 border-b-2 pb-1">References</h3>
      <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
        <li v-for="(reference, index) in resume.references" :key="index">
          <strong>{{ reference.full_name }}</strong>, {{ reference.designation }} at {{ reference.company }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
defineProps<{
  resume: FormData;
}>();
</script>