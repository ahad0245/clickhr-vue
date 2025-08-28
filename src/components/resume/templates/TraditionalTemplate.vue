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

        <section v-if="resume.history.education_history && resume.history.education_history.length" class="mb-6">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Education</h3>
          <div v-for="(edu, index) in resume.history.education_history" :key="index" class="mt-4">
            <h4 class="font-bold text-lg text-gray-800">{{ edu.degree || '' }}</h4>
            <p class="text-sm text-gray-600">{{ edu.institution_name || '' }} | {{ edu.start_date || '' }} - {{ edu.end_date || 'Present' }}</p>
          </div>
        </section>

        <section v-if="resume.projects && resume.projects.length" class="mb-6">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Projects</h3>
          <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
            <li v-for="(project, index) in resume.projects" :key="index">{{ project.proj_name }}</li>
          </ul>
        </section>
      </div>
      
      <div class="col-span-1 border-l-2 border-gray-200 pl-6">
        <section v-if="resume.skills && resume.skills.length" class="mb-6">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Skills</h3>
          <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
            <li v-for="(skill, index) in resume.skills" :key="index">{{ skill.skill_name }} ({{ skill.skill_proficiency_level }})</li>
          </ul>
        </section>
        <section v-if="resume.certifications && resume.certifications.length" class="mb-6">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Certifications</h3>
          <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
            <li v-for="(cert, index) in resume.certifications" :key="index">
              <strong>{{ cert.certification_name }}</strong>, {{ cert.certification_body }}
            </li>
          </ul>
        </section>
        <section v-if="resume.references && resume.references.length" class="mb-6">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">References</h3>
          <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
            <li v-for="(reference, index) in resume.references" :key="index">
              <strong>{{ reference.full_name }}</strong>, {{ reference.designation }}
            </li>
          </ul>
        </section>
        <section v-if="resume.job_portals && Object.values(resume.job_portals).some(link => link)">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Job Portals</h3>
          <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
            <li v-if="resume.job_portals.linked_in_profile">LinkedIn: <a :href="resume.job_portals.linked_in_profile" target="_blank" class="text-blue-600 hover:underline">Link</a></li>
            <li v-if="resume.job_portals.indeed_profile">Indeed: <a :href="resume.job_portals.indeed_profile" target="_blank" class="text-blue-600 hover:underline">Link</a></li>
          </ul>
        </section>
        <section v-if="resume.version_control && Object.values(resume.version_control).some(link => link)">
          <h3 class="text-xl font-bold text-gray-700 border-b-2 border-gray-400 pb-1">Version Control</h3>
          <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
            <li v-if="resume.version_control.github">GitHub: <a :href="resume.version_control.github" target="_blank" class="text-blue-600 hover:underline">Link</a></li>
            <li v-if="resume.version_control.gitlab">GitLab: <a :href="resume.version_control.gitlab" target="_blank" class="text-blue-600 hover:underline">Link</a></li>
          </ul>
        </section>
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