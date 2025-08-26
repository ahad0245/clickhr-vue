<template>
  <div>
    <h1>{{ resume.personal.first_name }} {{ resume.personal.last_name }}</h1>
    <h2>{{ resume.personal.headline }}</h2>
    <p>{{ resume.personal.city }}, {{ resume.personal.state }}</p>
    <p>Email: {{ resume.personal.email_0 }}</p>
    <p>Phone: {{ resume.personal.mobile_phone }}</p>

    <h3>Experience</h3>
    <div v-for="(job, index) in resume.history.work_history" :key="index">
      <p><strong>{{ job.job_title }}</strong> at {{ job.company_name }}</p>
      <p>{{ job.job_description }}</p>
    </div>

    <h3>Education</h3>
    <div v-for="(edu, index) in resume.history.education_history" :key="index">
      <p><strong>{{ edu.degree }}</strong> - {{ edu.institution_name }}</p>
    </div>

    <h3>Certifications</h3>
    <div v-for="(cert, index) in resume.certifications" :key="index">
      <p>{{ cert.certification_name }} ({{ cert.certification_body }})</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResumeStore } from '@/stores/resumeStore';
const { formData: resume } = useResumeStore();
</script>
