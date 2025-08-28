<template>
  <div class="template-gallery-container p-8">
    <!-- Enhanced header with consistent talent navigation context -->
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">My Resumes</h1>
        <p class="text-sm text-gray-500 mt-1">Manage and share your professional resumes</p>
      </div>
      <button
        @click="createNewResume"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Create Another Resume
      </button>
    </div>
    
    <!-- Added search bar for client-side filtering -->
    <div class="mb-6">
      <div class="relative max-w-md">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search resumes by title or template..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p class="text-sm text-gray-500 mt-2">{{ filteredResumes.length }} of {{ resumeStore.savedResumes.length }} resumes</p>
    </div>
    
    <!-- Updated grid to use filtered resumes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="resume in filteredResumes" :key="resume.id" class="resume-card-wrapper">
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

    <!-- Added empty state for no search results -->
    <div v-if="filteredResumes.length === 0 && searchQuery" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No resumes found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
    </div>

    <ShareModal v-if="showShareModal" :resumeId="shareResumeId" @close="closeShareModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useResumeStore } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';
import ShareModal from '../components/ShareModal.vue';

const router = useRouter();
const resumeStore = useResumeStore();
const templatesList = ATS_TEMPLATES;

const showShareModal = ref(false);
const shareResumeId = ref('');

const searchQuery = ref('');

const filteredResumes = computed(() => {
  if (!searchQuery.value.trim()) {
    return resumeStore.savedResumes;
  }
  
  const query = searchQuery.value.toLowerCase().trim();
  return resumeStore.savedResumes.filter(resume => {
    const titleMatch = resume.title.toLowerCase().includes(query);
    const templateMatch = getTemplateName(resume.templateId).toLowerCase().includes(query);
    return titleMatch || templateMatch;
  });
});

function getTemplateComponent(templateId: string) {
  const template = templatesList.find(t => t.id === templateId);
  return template ? shallowRef(template.layoutComponent) : null;
}

function getTemplateName(templateId: string) {
  const template = templatesList.find(t => t.id === templateId);
  return template ? template.name : 'Unknown Template';
}

function createNewResume() {
  // Navigate to template gallery while maintaining talent context
  router.push({ name: 'TemplateGallery' });
}

function editResume(resume: any) {
  // Navigate to edit while maintaining talent context
  router.push({ name: 'CreateResume', query: { id: resume.id } });
}

function previewResume(resume: any) {
  // Navigate to preview while maintaining talent context
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
