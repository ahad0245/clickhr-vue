<template>
  <div class="template-gallery-container p-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Resume Templates</h1>
    <p class="text-gray-600 mb-8">Select a template to begin building your resume.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="template in templatesList" :key="template.id" class="template-card relative group">
        <div class="template-preview-placeholder">
          <p class="text-gray-400">Preview of {{ template.name }}</p>
        </div>
        <div class="p-4 flex justify-between items-center">
          <h3 class="font-semibold text-lg">{{ template.name }}</h3>
        </div>
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button @click="selectTemplateAndNavigate(template.id)" class="use-template-button">
            Use this template
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useResumeStore } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';

const router = useRouter();
const resumeStore = useResumeStore();
const templatesList = ATS_TEMPLATES;

function selectTemplateAndNavigate(templateId: string) {
  resumeStore.switchTemplate(templateId);
  router.push('/candidate/create-resume');
}
</script>

<style scoped>
.template-gallery-container {
  max-width: 1200px;
  margin: 0 auto;
}
.template-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}
.template-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.template-preview-placeholder {
  height: 200px;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e2e8f0;
}
.use-template-button {
  background-color: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.2s;
  border: none;
}
.use-template-button:hover {
  background-color: #1d4ed8;
}
</style>