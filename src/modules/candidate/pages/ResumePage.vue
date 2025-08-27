<template>
  <div class="template-gallery-container p-8">
    <div v-if="!showTemplates" class="mb-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">My Resumes</h1>
      <button
        @click="router.push('/candidate/create-resume')"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Create Another Resume
      </button>
    </div>
    
    <div v-if="!showTemplates" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="resume in resumeStore.savedResumes" :key="resume.id" class="resume-card-wrapper">
        <div class="resume-card relative group border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
             @click="editResume(resume)">
          <div class="template-preview-wrapper h-64 overflow-hidden relative">
            <component :is="getTemplateComponent(resume.templateId)"
                       :resume="resume.data"
                       class="resume-preview-component transform scale-[0.35] origin-top-left absolute w-[285%] h-[285%]" />
          </div>
          <div class="p-4 bg-white">
            <h3 class="font-bold text-lg text-gray-800">{{ resume.title }}</h3>
            <p class="text-sm text-gray-500">{{ getTemplateName(resume.templateId) }}</p>
          </div>
          <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click.stop="openShareModal(resume)" class="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Get Link</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showTemplates">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Create a New Resume</h1>
        <p class="text-gray-600 mb-8">Select a template and a color palette to get started.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="template in templatesList" :key="template.id"
             class="template-card relative group"
             :class="{ 'ring-2 ring-offset-2 ring-blue-500': selectedTemplateId === template.id }">
          <div class="template-preview-wrapper">
            <component :is="template.layoutComponent" :resume="mockData" :palette="selectedPalettes[template.id] || COLOR_PALETTES.default" class="resume-preview-component" />
          </div>
          <div v-if="template.hasColorPalette" class="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white shadow-lg flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-full group-hover:translate-y-0 z-10" style="transition: transform 0.3s ease-out, opacity 0.3s ease-out;">
            <div v-for="(palette, key) in COLOR_PALETTES" :key="key"
                 @click.stop="handlePaletteChange(template.id, palette)"
                 :class="['w-6 h-6 rounded-full cursor-pointer border-2 transition-all', {'ring-2 ring-offset-2 ring-blue-500': selectedTemplateId === template.id && selectedPalettes[template.id]?.name === palette.name}]"
                 :style="{backgroundColor: palette.background}"
                 :title="palette.name">
            </div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button @click="selectTemplateAndNavigate(template.id)" class="use-template-button">
              Use this template
            </button>
          </div>
        </div>
      </div>
    </div>

    <ShareModal v-if="showShareModal" :candidateData="shareResumeData" :template="shareResumeTemplate" @close="closeShareModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, shallowRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useResumeStore, mockData } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';
import { COLOR_PALETTES } from '@/constants/colorPalettes';
import ShareModal from '../components/ShareModal.vue';
import { nanoid } from 'nanoid';

const router = useRouter();
const route = useRoute();
const resumeStore = useResumeStore();
const templatesList = ATS_TEMPLATES;

const showTemplates = computed(() => route.path === '/candidate/create-resume');
const selectedTemplateId = ref('');
const selectedPalettes = ref({});

const showShareModal = ref(false);
const shareResumeData = ref({});
const shareResumeTemplate = ref('');

onMounted(() => {
  if (route.name === 'CreateResumeGallery') {
    resumeStore.formData = { ...mockData };
  }
});

function getTemplateComponent(templateId: string) {
  const template = templatesList.find(t => t.id === templateId);
  return template ? shallowRef(template.layoutComponent) : null;
}

function getTemplateName(templateId: string) {
  const template = templatesList.find(t => t.id === templateId);
  return template ? template.name : 'Unknown Template';
}

function handlePaletteChange(templateId: string, palette: any) {
  selectedTemplateId.value = templateId;
  selectedPalettes.value = {
    ...selectedPalettes.value,
    [templateId]: palette,
  };
}

function selectTemplateAndNavigate(templateId: string) {
  const selectedPalette = selectedPalettes.value[templateId] || COLOR_PALETTES.default;
  resumeStore.switchTemplate(templateId);
  resumeStore.switchPalette(Object.keys(COLOR_PALETTES).find(key => COLOR_PALETTES[key] === selectedPalette) || 'default');
  
  const newResumeId = nanoid();
  router.push({ name: 'ResumeEditor', params: { id: newResumeId } });
}

function editResume(resume) {
  router.push({ name: 'ResumeEditor', params: { id: resume.id } });
}

function openShareModal(resume) {
  shareResumeData.value = resume.data;
  shareResumeTemplate.value = resume.templateId;
  showShareModal.value = true;
}

function closeShareModal() {
  showShareModal.value = false;
}
</script>

<style scoped>
.template-gallery-container {
  max-width: 1200px;
  margin: 0 auto;
}
.template-card, .resume-card-wrapper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 400px;
}
.template-card:hover, .resume-card-wrapper:hover {
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