<template>
  <div class="modern-template">
    <aside class="sidebar">
      <h2>{{ formData.personal.first_name }} {{ formData.personal.last_name }}</h2>
      <p>{{ formData.personal.headline }}</p>
      <p>{{ formData.personal.email }}</p>
      <p>{{ formData.personal.phone }}</p>
    </aside>

    <main class="content">
      <section v-if="formData.experience && formData.experience.length">
        <h2>Experience</h2>
        <div v-for="(exp, index) in formData.experience" :key="index" class="card">
          <h3>{{ exp.job_title }}</h3>
          <p>{{ exp.company }} | {{ exp.start_date }} - {{ exp.end_date || 'Present' }}</p>
          <p>{{ exp.description }}</p>
        </div>
      </section>

      <section v-if="formData.education && formData.education.length">
        <h2>Education</h2>
        <div v-for="(edu, index) in formData.education" :key="index" class="card">
          <h3>{{ edu.degree }}</h3>
          <p>{{ edu.school }} | {{ edu.start_date }} - {{ edu.end_date || 'Present' }}</p>
        </div>
      </section>

      <section v-if="formData.skills && formData.skills.length">
        <h2>Skills</h2>
        <div class="skills">
          <span v-for="(skill, index) in formData.skills" :key="index" class="skill-chip">
            {{ skill }}
          </span>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
defineProps<{ formData: any }>();
</script>

<style scoped>
.modern-template {
  display: flex;
  font-family: 'Segoe UI', sans-serif;
  color: #444;
  max-width: 1000px;
  margin: auto;
}
.sidebar {
  width: 30%;
  background: #f5f7fa;
  padding: 20px;
}
.content {
  width: 70%;
  padding: 20px;
}
h2 {
  border-bottom: 2px solid #007bff;
  margin-bottom: 10px;
  color: #007bff;
}
.card {
  margin-bottom: 15px;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.skill-chip {
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  margin: 3px;
  font-size: 14px;
}
</style>
