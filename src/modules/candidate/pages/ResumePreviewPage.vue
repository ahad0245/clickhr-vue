<template>
  <div class="bg-gray-50 min-h-screen p-8">
    <div v-if="resume && templateComponent" class="container mx-auto max-w-4xl">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">{{ resume.title }}</h1>
        <div class="flex flex-wrap gap-2">
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

      <!-- ✅ Preview lives BELOW the toolbar -->
      <div :class="isPrintMode ? 'print-mode' : 'screen-mode'">
        <component
          ref="resumeContent"
          :is="templateComponent"
          :resume="resume.data"
        />
      </div>
    </div>

    <div v-else class="container mx-auto max-w-4xl text-center p-12 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-gray-700">Resume Not Found</h1>
      <p class="mt-4 text-gray-500">The resume with ID "{{ id }}" could not be found.</p>
    </div>

    <ShareModal v-if="showShareModal" :resumeId="id" @close="closeShareModal" />
  </div>
</template>

<script setup lang="ts">

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { ref, onMounted, computed, unref } from 'vue'   // ⬅️ use unref, not shallowRef
import { useRouter, useRoute } from 'vue-router'
import { useResumeStore } from '@/stores/resumeStore'
import { ATS_TEMPLATES } from '@/constants/resumeTemplates'
import ShareModal from '../components/ShareModal.vue'

const props = defineProps<{ id: string }>()

const router = useRouter()
const route = useRoute()
const resumeStore = useResumeStore()

const resume = ref<any | null>(null)
const showShareModal = ref(false)
const isDownloading = ref(false)
const resumeContent = ref(null); // Create a ref for the component


const isPrintMode = computed(() => route.query.print === 'true')

/** ✅ Return a real component (SFC/async component), not a RefImpl */
const templateComponent = computed(() => {
  if (!resume.value) return null
  const found = ATS_TEMPLATES.find(t => t.id === resume.value.templateId)
  // layoutComponent might already be a component or a ref/async component; unref handles both
  return found ? (unref(found.layoutComponent) as any) : null
})

onMounted(() => {
  const foundResume = resumeStore.getResumeById(props.id)
  if (foundResume) {
    resume.value = foundResume
  }

  if (isPrintMode.value) {
    setTimeout(() => {
      window.print()
    }, 1000)
  }
})

const downloadResume = async () => {
  if (!resumeContent.value) {
    alert('Preview component is not ready.');
    return;
  }
  
  isDownloading.value = true;
  
  // Get the actual DOM element from the component ref
  const elementToCapture = (resumeContent.value as any).$el;

  try {
    const canvas = await html2canvas(elementToCapture, {
      scale: 2, // Use a higher scale for better quality
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // A4 paper dimensions in points (pt)
    const a4 = { width: 595.28, height: 841.89 };
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const canvasAspectRatio = canvas.width / canvas.height;
    const pageAspectRatio = a4.width / a4.height;
    
    let pdfWidth = a4.width;
    let pdfHeight = a4.height;

    // Adjust image dimensions to fit A4 page while maintaining aspect ratio
    if (canvasAspectRatio > pageAspectRatio) {
      pdfHeight = pdfWidth / canvasAspectRatio;
    } else {
      pdfWidth = pdfHeight * canvasAspectRatio;
    }

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resume.value.title.replace(/\s/g, '_') || 'resume'}.pdf`);

  } catch (error) {
    console.error('Failed to generate PDF:', error);
    alert('An error occurred while generating the PDF. Please try again.');
  } finally {
    isDownloading.value = false;
  }
};

const goBack = () => router.back()
const shareResume = () => (showShareModal.value = true)
const closeShareModal = () => (showShareModal.value = false)
</script>

<style scoped>
.font-sans { font-family: 'Inter', sans-serif; }
.print-mode { background: white !important; box-shadow: none !important; margin: 0 !important; padding: 0 !important; }
.screen-mode { background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,.1); }
@media print {
  .bg-gray-50 { background: white !important; }
  .container { max-width: none !important; margin: 0 !important; padding: 0 !important; }
  .print-mode { box-shadow: none !important; border-radius: 0 !important; padding: 0 !important; margin: 0 !important; }
}
</style>
