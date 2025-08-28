<template>
  <div class="template-gallery-container p-8">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">My Resumes</h1>
      <button
        @click="createNewResume"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Create Another Resume
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="resume in resumeStore.savedResumes" :key="resume.id" class="resume-card-wrapper">
        <div class="resume-card relative group border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
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
            <div class="flex space-x-4">
              <button @click.stop="editResume(resume)" class="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Edit
              </button>
              <button @click.stop="previewResume(resume)" class="text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Preview
              </button>
              <button @click.stop="openShareModal(resume)" class="text-white bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-700 transition">
                Get Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ShareModal v-if="showShareModal" :resumeId="shareResumeId" @close="closeShareModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useResumeStore } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';
import ShareModal from '../components/ShareModal.vue';

const router = useRouter();
const resumeStore = useResumeStore();
const templatesList = ATS_TEMPLATES;

const showShareModal = ref(false);
const shareResumeId = ref('');

function getTemplateComponent(templateId: string) {
  const template = templatesList.find(t => t.id === templateId);
  return template ? shallowRef(template.layoutComponent) : null;
}

function getTemplateName(templateId: string) {
  const template = templatesList.find(t => t.id === templateId);
  return template ? template.name : 'Unknown Template';
}

function createNewResume() {
  router.push({ name: 'CreateResume' });
}

function editResume(resume: any) {
  router.push({ name: 'CreateResume', query: { id: resume.id } });
}

function previewResume(resume: any) {
    router.push({ name: 'ResumePreview', params: { id: resume.id } });
}

function openShareModal(resume: any) {
  shareResumeId.value = resume.id;
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
.resume-card-wrapper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 400px;
}
.resume-card-wrapper:hover {
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
  width: 285%;
  height: 285%;
  transform: scale(0.35);
  transform-origin: top left;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
}
</style>