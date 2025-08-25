<template>
  <div class="resume-layout-container">
    <div class="template-selection-buttons">
      <button 
        v-for="template in templatesList" 
        :key="template.id" 
        @click="switchTemplate(template.id)"
        class="template-button"
      >
        {{ template.name }}
      </button>
    </div>
    
    <component :is="currentTemplate" :formData="resumeStore.formData" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useResumeStore } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';

const resumeStore = useResumeStore();

// Expose the list of templates to the template for the v-for loop
const templatesList = ATS_TEMPLATES;

// Create a mapping from template ID to the actual component
const templatesMap = ATS_TEMPLATES.reduce((map, template) => {
  map[template.id] = template.layoutComponent;
  return map;
}, {} as Record<string, any>);

// Compute the current component based on the selected template's ID
const currentTemplate = computed(() => {
  return templatesMap[resumeStore.selectedTemplate];
});

// Function to update the selected template in the Pinia store
function switchTemplate(templateId: string) {
  resumeStore.switchTemplate(templateId);
}
</script>

<style scoped>
/* Add styling to position the buttons correctly */
.template-selection-buttons {
  margin-bottom: 20px;
}

.template-button {
  padding: 8px 16px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.template-button:hover {
  background-color: #e0e0e0;
}
</style>