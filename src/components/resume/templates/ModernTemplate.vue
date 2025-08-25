<template>
  <div class="modern-template p-6">
    <header class="flex items-center justify-between border-b pb-4 mb-4">
      <div>
        <h2 class="text-4xl font-extrabold text-gray-900">{{ formData.personal.firstName }} {{ formData.personal.lastName }}</h2>
        <p class="text-xl text-gray-600 font-light mt-1">{{ formData.personal.headline }}</p>
      </div>
    </header>

    <div class="grid grid-cols-3 gap-8">
      <aside class="col-span-1 space-y-6 text-sm text-gray-700">
        <div class="space-y-2">
          <h3 class="font-bold text-gray-900 uppercase tracking-wide">Contact</h3>
          <p v-if="formData.personal.email1">{{ formData.personal.email1 }}</p>
          <p v-if="formData.personal.mobilePhone">Mobile: {{ formData.personal.mobilePhone }}</p>
          <p v-if="formData.onlinePresence.linkedInProfile"><strong>LinkedIn:</strong> {{ formData.onlinePresence.linkedInProfile }}</p>
          <p v-if="formData.onlinePresence.personalSite"><strong>Website:</strong> {{ formData.onlinePresence.personalSite }}</p>
          <p>{{ formData.personal.city }}, {{ formData.personal.state }}</p>
        </div>

        <div v-if="formData.employment.skillSet" class="space-y-2">
          <h3 class="font-bold text-gray-900 uppercase tracking-wide">Skills</h3>
          <p class="text-sm">{{ formData.employment.skillSet }}</p>
        </div>
        
        <div v-if="formData.certifications.length" class="space-y-2">
          <h3 class="font-bold text-gray-900 uppercase tracking-wide">Certifications</h3>
          <ul class="list-disc list-inside">
            <li v-for="(cert, index) in formData.certifications" :key="index">
              {{ cert.certificationName }} ({{ cert.certificationBody }})
            </li>
          </ul>
        </div>
        
      </aside>
      
      <main class="col-span-2 space-y-6">
        <section v-if="formData.history.workHistory.length">
          <h3 class="font-bold text-gray-900 uppercase tracking-wide border-b pb-2 mb-4">Experience</h3>
          <div v-for="(job, index) in formData.history.workHistory" :key="index" class="mb-4">
            <h4 class="font-semibold">{{ job.jobTitle }} at {{ job.companyName }}</h4>
            <p class="text-sm text-gray-600">{{ job.startDate }} - {{ job.endDate }}</p>
            <p class="text-sm mt-1">{{ job.jobDescription }}</p>
          </div>
        </section>

        <section v-if="formData.history.educationHistory.length">
          <h3 class="font-bold text-gray-900 uppercase tracking-wide border-b pb-2 mb-4">Education</h3>
          <div v-for="(edu, index) in formData.history.educationHistory" :key="index" class="mb-4">
            <h4 class="font-semibold">{{ edu.degree }} in {{ edu.fieldOfStudy }}</h4>
            <p class="text-sm text-gray-600">{{ edu.institutionName }}</p>
            <p class="text-xs text-gray-500">{{ edu.startDate }} - {{ edu.endDate }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
import { defineProps } from 'vue';

const props = defineProps<{
  formData: FormData;
}>();
</script>

<style scoped>
.modern-template {
  font-family: 'Inter', sans-serif;
}
</style>