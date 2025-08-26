<template>
  <div class="compact-template">
    <header>
      <h1>{{ formData.personal.first_name }} {{ formData.personal.last_name }}</h1>
      <p>{{ formData.personal.headline }}</p>
      <p>{{ formData.personal.email }} | {{ formData.personal.phone }}</p>
    </header>

    <section v-if="formData.experience && formData.experience.length">
      <h2>Experience</h2>
      <div v-for="(exp, index) in formData.experience" :key="index" class="experience-item">
        <strong>{{ exp.job_title }}</strong> at {{ exp.company }}
        <span>({{ exp.start_date }} - {{ exp.end_date || 'Present' }})</span>
        <p>{{ exp.description }}</p>
      </div>
    </section>

    <section v-if="formData.education && formData.education.length">
      <h2>Education</h2>
      <div v-for="(edu, index) in formData.education" :key="index" class="education-item">
        <strong>{{ edu.degree }}</strong> at {{ edu.school }}
        <span>({{ edu.start_date }} - {{ edu.end_date || 'Present' }})</span>
      </div>
    </section>

    <section v-if="formData.skills && formData.skills.length">
      <h2>Skills</h2>
      <ul>
        <li v-for="(skill, index) in formData.skills" :key="index">{{ skill }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{ formData: any }>();
</script>

<style scoped>
.compact-template {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 700px;
  margin: auto;
  color: #333;
}
header {
  text-align: center;
  margin-bottom: 15px;
}
h1 {
  font-size: 28px;
  margin: 0;
}
h2 {
  font-size: 18px;
  margin-top: 15px;
  border-bottom: 1px solid #ccc;
}
ul {
  padding-left: 18px;
}
</style>
