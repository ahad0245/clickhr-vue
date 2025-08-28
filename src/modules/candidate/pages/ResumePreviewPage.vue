<template>
  <div class="bg-gray-50 min-h-screen p-8">
    <div v-if="resume && template" class="container mx-auto max-w-4xl">
      <!-- Enhanced header with better download functionality -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">{{ resume.title }}</h1>
        <div class="flex space-x-2">
          <button @click="goBack" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm">
            Go Back
          </button>
          <button @click="shareResume" class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm">
            Share
          </button>
          <button 
            @click="downloadResume" 
            :disabled="isDownloading"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isDownloading ? 'Generating PDF...' : 'Download PDF' }}
          </button>
        </div>
      </div>
      
      <!-- Added print-specific styling -->
      <div :class="isPrintMode ? 'print-mode' : 'screen-mode'">
        <component :is="template" :resume="resume.data" />
      </div>
    </div>
    <div v-else class="container mx-auto max-w-4xl text-center p-12 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-gray-700">Resume Not Found</h1>
      <p class="mt-4 text-gray-500">The resume with ID "{{ id }}" could not be found.</p>
    </div>

    <!-- Added ShareModal integration -->
    <ShareModal v-if="showShareModal" :resumeId="id" @close="closeShareModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, shallowRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useResumeStore } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';
import ShareModal from '../components/ShareModal.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const resumeStore = useResumeStore();
const resume = ref<any | null>(null);
const showShareModal = ref(false);
const isDownloading = ref(false);

const isPrintMode = computed(() => route.query.print === 'true');

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

  if (isPrintMode.value) {
    setTimeout(() => {
      window.print();
    }, 1000);
  }
});

const downloadResume = async () => {
  try {
    isDownloading.value = true;
    
    // Method 1: Use browser's print to PDF
    if (window.print) {
      // Create a temporary print-friendly version
      const printWindow = window.open(window.location.href + '?print=true', '_blank');
      if (printWindow) {
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
          }, 1000);
        };
      }
    } else {
      // Fallback: Show print dialog
      window.print();
    }
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download resume. Please use your browser\'s print function and save as PDF.');
  } finally {
    isDownloading.value = false;
  }
};

const goBack = () => {
  router.back();
};

const shareResume = () => {
  showShareModal.value = true;
};

const closeShareModal = () => {
  showShareModal.value = false;
};
</script>

<style scoped>
.font-sans {
  font-family: 'Inter', sans-serif;
}

/* Added print-specific styles */
.print-mode {
  background: white !important;
  box-shadow: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.screen-mode {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media print {
  .bg-gray-50 {
    background: white !important;
  }
  
  .container {
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .print-mode {
    box-shadow: none !important;
    border-radius: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
