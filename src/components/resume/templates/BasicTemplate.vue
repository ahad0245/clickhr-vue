<template>
  <div class="basic-template">
    <header class="text-center pb-4 mb-4 border-b">
      <h1 class="text-3xl font-bold">{{ formData.personal.firstName }} {{ formData.personal.lastName }}</h1>
      <p class="text-lg text-gray-600">{{ formData.personal.headline }}</p>
    </header>

    <section class="mb-4">
      <h2 class="text-xl font-semibold mb-2">Contact Details</h2>
      <div class="grid grid-cols-2 gap-x-4 text-sm">
        <p v-if="formData.personal.email1"><strong>Email:</strong> {{ formData.personal.email1 }}</p>
        <p v-if="formData.personal.mobilePhone"><strong>Mobile Phone:</strong> {{ formData.personal.mobilePhone }}</p>
        <p v-if="formData.onlinePresence.linkedInProfile"><strong>LinkedIn:</strong> {{ formData.onlinePresence.linkedInProfile }}</p>
        <p v-if="formData.onlinePresence.personalSite"><strong>Website:</strong> {{ formData.onlinePresence.personalSite }}</p>
        <p><strong>Location:</strong> {{ formData.personal.city }}, {{ formData.personal.state }}, {{ formData.personal.country }}</p>
      </div>
    </section>
    
    <section v-if="formData.history.workHistory.length" class="mb-4">
      <h2 class="text-xl font-semibold mb-2">Work History</h2>
      <div v-for="(job, index) in formData.history.workHistory" :key="index" class="mb-3">
        <h3 class="font-bold">{{ job.companyName }} - {{ job.jobTitle }}</h3>
        <p class="text-sm text-gray-600">{{ job.startDate }} - {{ job.endDate }}</p>
        <p class="text-xs text-gray-500">{{ job.jobDescription }}</p>
      </div>
    </section>

    <section v-if="formData.history.educationHistory.length" class="mb-4">
      <h2 class="text-xl font-semibold mb-2">Education</h2>
      <div v-for="(edu, index) in formData.history.educationHistory" :key="index" class="mb-3">
        <h3 class="font-bold">{{ edu.institutionName }}</h3>
        <p class="text-sm text-gray-600">{{ edu.degree }} in {{ edu.fieldOfStudy }}</p>
        <p class="text-xs text-gray-500">{{ edu.startDate }} - {{ edu.endDate }}</p>
      </div>
    </section>

    <section v-if="formData.employment.skillSet">
      <h2 class="text-xl font-semibold mb-2">Skills</h2>
      <p>{{ formData.employment.skillSet }}</p>
    </section>
    
    <section v-if="formData.certifications.length">
      <h2 class="text-xl font-semibold mb-2">Certifications</h2>
      <div v-for="(cert, index) in formData.certifications" :key="index" class="mb-3">
        <h3 class="font-bold">{{ cert.certificationName }}</h3>
        <p class="text-sm text-gray-600">Issued by {{ cert.certificationBody }} on {{ cert.certificationDate }}</p>
      </div>
    </section>
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
.basic-template {
  font-family: 'Inter', sans-serif;
  padding: 1rem;
  line-height: 1.5;
}
</style>