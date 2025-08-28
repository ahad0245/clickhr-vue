<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-xl shadow-lg w-96 p-6 relative">
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-4">Share Your Resume</h2>

      <p class="mb-2 text-gray-600">Use this link to share your resume:</p>
      <div class="flex items-center gap-2 mb-4">
        <input
          type="text"
          :value="displayUrl"
          readonly
          class="border rounded-lg px-2 py-1 flex-1 text-sm"
        />
        <button
          @click="copyToClipboard"
          class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
        >
          {{ copyButtonText }}
        </button>
      </div>

      <!-- Added loading state for TinyURL generation -->
      <div v-if="isGeneratingTinyUrl" class="text-center mb-4">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm text-gray-600">Generating short link...</span>
        </div>
      </div>

      <div class="flex justify-center mb-4">
        <canvas ref="qrCanvas"></canvas>
      </div>

      <!-- Added download button to share modal -->
      <div class="flex gap-2 mb-4">
        <button
          @click="downloadResume"
          :disabled="isDownloading"
          class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isDownloading ? 'Generating PDF...' : 'Download PDF' }}
        </button>
        <button
          @click="previewResume"
          class="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Preview
        </button>
      </div>

      <p class="text-gray-500 text-sm text-center">
        Anyone with the link or QR code can view this resume.
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import QRCode from "qrcode";
import { useRouter } from "vue-router";
import { useResumeStore } from '@/stores/resumeStore';

const router = useRouter();
const resumeStore = useResumeStore();

const props = defineProps({
  resumeId: { type: String, required: true },
});

const shareUrl = ref("");
const tinyUrl = ref("");
const displayUrl = ref("");
const qrCanvas = ref(null);
const copyButtonText = ref("Copy");
const isGeneratingTinyUrl = ref(false);
const isDownloading = ref(false);

async function generateTinyUrl() {
  try {
    isGeneratingTinyUrl.value = true;
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(shareUrl.value)}`);
    const shortUrl = await response.text();
    
    if (shortUrl && shortUrl.startsWith('https://tinyurl.com/')) {
      tinyUrl.value = shortUrl;
      displayUrl.value = shortUrl;
    }
  } catch (error) {
    console.error('Failed to generate TinyURL:', error);
    // Fallback to original URL if TinyURL fails
    displayUrl.value = shareUrl.value;
  } finally {
    isGeneratingTinyUrl.value = false;
    // Regenerate QR code with final URL
    generateQRCode();
  }
}

function generateQRCode() {
  if (qrCanvas.value) {
    QRCode.toCanvas(qrCanvas.value, displayUrl.value, { width: 200 }, (error) => {
      if (error) console.error('QR Code generation error:', error);
    });
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(displayUrl.value).then(() => {
    copyButtonText.value = "Copied!";
    setTimeout(() => {
      copyButtonText.value = "Copy";
    }, 2000);
  }).catch(() => {
    alert("Failed to copy link to clipboard");
  });
}

async function downloadResume() {
  try {
    isDownloading.value = true;
    const resume = resumeStore.getResumeById(props.resumeId);
    
    if (!resume) {
      alert('Resume not found');
      return;
    }

    // Create a new window for PDF generation
    const printWindow = window.open(`/resume-preview/${props.resumeId}?print=true`, '_blank');
    
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 1000);
      };
    } else {
      // Fallback: redirect to preview page
      window.open(`/resume-preview/${props.resumeId}`, '_blank');
    }
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download resume. Please try again.');
  } finally {
    isDownloading.value = false;
  }
}

function previewResume() {
  router.push({ name: 'ResumePreview', params: { id: props.resumeId } });
}

onMounted(async () => {
  const baseUrl = window.location.origin;
  shareUrl.value = `${baseUrl}/resume-preview/${props.resumeId}`;
  displayUrl.value = shareUrl.value;

  await generateTinyUrl();
  
  // Generate QR Code with the final URL
  generateQRCode();
});
</script>

<style scoped>
.fixed {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
