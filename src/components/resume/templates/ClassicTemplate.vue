<template>
  <div class="classic-template font-serif p-8 text-gray-800 border rounded-lg shadow-lg">
    <div class="header pb-4 mb-6 border-b-2 border-gray-400 text-center">
      <h1 class="text-4xl font-bold">{{ resume.personal.first_name || '' }} {{ resume.personal.last_name || '' }}</h1>
      <p class="text-xl text-gray-600 mt-2">{{ resume.personal.headline || '' }}</p>
    </div>

    <div class="contact-info text-center text-sm text-gray-600 mb-6">
      <span>{{ resume.personal.mobile_phone || '' }}</span> | <span>{{ resume.personal.email_0 || '' }}</span> | <span>{{ resume.personal.city || '' }}, {{ resume.personal.state_province_region || '' }}</span>
    </div>

    <section v-if="resume.additional.resume_text" class="mb-6">
      <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Summary</h3>
      <p class="text-sm text-gray-700 mt-2 leading-relaxed">{{ resume.additional.resume_text }}</p>
    </section>

    <section v-if="resume.history.work_history && resume.history.work_history.length" class="mb-6">
      <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Professional Experience</h3>
      <div v-for="(job, index) in resume.history.work_history" :key="index" class="mt-4">
        <div class="flex justify-between items-baseline">
          <h4 class="font-bold text-lg text-gray-800">{{ job.job_title || '' }} at {{ job.company_name || '' }}</h4>
          <span class="text-sm text-gray-500">{{ job.start_date || '' }} - {{ job.is_current_job ? 'Present' : (job.end_date || '') }}</span>
        </div>
        <p class="text-sm text-gray-700 italic mt-1">{{ job.job_description || '' }}</p>
      </div>
    </section>
    
    <section v-if="resume.history.education_history && resume.history.education_history.length" class="mb-6">
      <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Education</h3>
      <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-4">
        <div class="flex justify-between items-baseline">
          <h4 class="font-bold text-lg text-gray-800">{{ edu.degree || '' }} in {{ edu.field_of_study || '' }}</h4>
          <span class="text-sm text-gray-500">{{ edu.start_date || '' }} - {{ edu.is_current_education ? 'Present' : (edu.end_date || '') }}</span>
        </div>
        <p class="text-sm text-gray-700 italic">{{ edu.institution_name || '' }}</p>
      </div>
    </section>

    <section v-if="resume.skills && resume.skills.length" class="mb-6">
      <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Skills</h3>
      <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
        <li v-for="(skill, index) in resume.skills" :key="index">{{ skill.skill_name }} ({{ skill.skill_proficiency_level }})</li>
      </ul>
    </section>

    <section v-if="resume.projects && resume.projects.length" class="mb-6">
      <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Projects</h3>
      <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
        <li v-for="(project, index) in resume.projects" :key="index">
          <strong>{{ project.proj_name }}</strong>: {{ project.proj_description }}
        </li>
      </ul>
    </section>
    
    <section v-if="resume.references && resume.references.length">
      <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">References</h3>
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
defineProps<{ resume: FormData }>();
</script>