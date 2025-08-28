<template>
  <div class="bg-gray-50 min-h-screen p-8">
    <div v-if="resume && template" class="container mx-auto max-w-4xl">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">{{ resume.title }}</h1>
        <div class="flex space-x-2">
            <button @click="goBack" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm">
                Go Back
            </button>
            <button @click="downloadResume" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                Download PDF
            </button>
        </div>
      </div>
      <component :is="template" :resume="resume.data" />
    </div>
    <div v-else class="container mx-auto max-w-4xl text-center p-12 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-gray-700">Resume Not Found</h1>
      <p class="mt-4 text-gray-500">The resume with ID "{{ id }}" could not be found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useResumeStore } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';
import type { FormData } from '@/types/resume';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const resumeStore = useResumeStore();
const resume = ref<any | null>(null);

const template = computed(() => {
  if (!resume.value) return null;
  const foundTemplate = ATS_TEMPLATES.find(t => t.id === resume.value.templateId);
  return foundTemplate ? shallowRef(foundTemplate.layoutComponent) : null;
});

onMounted(() => {
  const foundResume = resumeStore.getResumeById(props.id);
  if (foundResume) {
    resume.value = foundResume;
  }
});

const downloadResume = () => {
    // This is a placeholder. You would implement PDF generation here.
    alert('PDF download functionality is not yet implemented.');
};

const goBack = () => {
    router.back();
};
</script>

<style scoped>
.font-sans {
    font-family: 'Inter', sans-serif;
}
</style>