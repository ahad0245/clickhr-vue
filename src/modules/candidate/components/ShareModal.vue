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
          :value="shareUrl"
          readonly
          class="border rounded-lg px-2 py-1 flex-1"
        />
        <button
          @click="copyToClipboard"
          class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Copy
        </button>
      </div>

      <div class="flex justify-center mb-4">
        <canvas ref="qrCanvas"></canvas>
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

const props = defineProps({
  candidateData: { type: Object, required: true },
  template: { type: String, required: true }
});

const shareUrl = ref("");
const qrCanvas = ref(null);

onMounted(() => {
  const baseUrl = window.location.origin;
  const encodedData = encodeURIComponent(JSON.stringify(props.candidateData));
  shareUrl.value = `${baseUrl}/resume-preview?template=${props.template}&data=${encodedData}`;

  // Generate QR Code
  QRCode.toCanvas(qrCanvas.value, shareUrl.value, { width: 200 }, (error) => {
    if (error) console.error(error);
  });
});

function copyToClipboard() {
  navigator.clipboard.writeText(shareUrl.value);
  alert("Link copied to clipboard!");
}
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
