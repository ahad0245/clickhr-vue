<template>
  <div class="template-gallery-container p-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Resume Templates</h1>
    <p class="text-gray-600 mb-8">Select a template and a color palette to get started.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="template in templatesList" :key="template.id"
           class="template-card relative group"
           :class="{ 'ring-2 ring-offset-2 ring-blue-500': resumeStore.selectedTemplate === template.id }">
        <div class="template-preview-wrapper">
          <component :is="template.layoutComponent" :resume="mockData" class="resume-preview-component" />
        </div>
        
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button @click="selectTemplateAndNavigate(template.id)" class="use-template-button">
            Use this template
          </button>
        </div>
        
        <div v-if="template.hasColorPalette" class="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white shadow-lg flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-full group-hover:translate-y-0 z-10" style="transition: transform 0.3s ease-out, opacity 0.3s ease-out;">
          <div v-for="(palette, key) in COLOR_PALETTES" :key="key"
               @click.stop="resumeStore.switchPalette(key); resumeStore.switchTemplate(template.id)"
               :class="['w-6 h-6 rounded-full cursor-pointer border-2 transition-all', {'ring-2 ring-offset-2 ring-blue-500': resumeStore.selectedTemplate === template.id && resumeStore.selectedPalette.name === palette.name}]"
               :style="{backgroundColor: palette.background}"
               :title="palette.name">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useResumeStore } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';
import { mockData } from '@/stores/resumeStore';
import { COLOR_PALETTES } from '@/constants/colorPalettes';

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
  height: 400px;
  width: 100%;
}
.template-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.template-preview-wrapper {
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: white;
}
.resume-preview-component {
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: top left;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
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