<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Choose Your Resume Template</h1>
        <p class="text-gray-600 text-lg">Select a professional template and customize the color palette to match your style.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="template in templatesList" :key="template.id"
             class="template-card relative group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
             :class="{ 'ring-4 ring-blue-500 ring-offset-4': selectedTemplateId === template.id }">
          
          <!-- Template Preview -->
          <div class="template-preview-wrapper h-80 overflow-hidden relative bg-gray-50">
            <component :is="template.layoutComponent" 
                       :resume="sampleData" 
                       :palette="selectedPalettes[template.id] || COLOR_PALETTES.default" 
                       class="resume-preview-component transform scale-[0.25] origin-top-left absolute w-[400%] h-[400%]" />
          </div>

          <!-- Template Info -->
          <div class="p-6">
            <h3 class="font-bold text-xl text-gray-800 mb-2">{{ template.name }}</h3>
            <p class="text-sm text-gray-500 mb-4">Professional and ATS-friendly</p>

            <!-- Color Palette Selection -->
            <div v-if="template.hasColorPalette" class="mb-4">
              <p class="text-sm font-medium text-gray-700 mb-2">Choose Color:</p>
              <div class="flex space-x-2">
                <div v-for="(palette, key) in COLOR_PALETTES" :key="key"
                     @click="handlePaletteChange(template.id, palette)"
                     :class="['w-8 h-8 rounded-full cursor-pointer border-3 transition-all hover:scale-110', 
                              {'ring-3 ring-offset-2 ring-blue-500': selectedPalettes[template.id]?.name === palette.name}]"
                     :style="{backgroundColor: palette.background, borderColor: palette.background}"
                     :title="palette.name">
                </div>
              </div>
            </div>

            <!-- Action Button -->
            <button @click="selectTemplate(template.id)" 
                    class="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
              Use This Template
            </button>
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 pointer-events-none"></div>
        </div>
      </div>

      <!-- Back to Resumes Button -->
      <div class="mt-12 text-center">
        <button @click="goToSavedResumes" 
                class="bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors duration-200">
          View My Saved Resumes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useResumeStore } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';
import { COLOR_PALETTES } from '@/constants/colorPalettes';

const router = useRouter();
const resumeStore = useResumeStore();

const templatesList = ATS_TEMPLATES;
const selectedTemplateId = ref<string | null>(null);
const selectedPalettes = ref<{ [key: string]: any }>({});

// Sample data for template preview
const sampleData = resumeStore.getNewCandidateProfile();

const handlePaletteChange = (templateId: string, palette: any) => {
  selectedPalettes.value = {
    ...selectedPalettes.value,
    [templateId]: palette,
  };
};

const selectTemplate = (templateId: string) => {
  selectedTemplateId.value = templateId;
  const selectedPalette = selectedPalettes.value[templateId] || COLOR_PALETTES.default;
  
  // Set template and palette in store
  resumeStore.switchTemplate(templateId);
  const paletteKey = Object.keys(COLOR_PALETTES).find(key => COLOR_PALETTES[key] === selectedPalette) || 'default';
  resumeStore.switchPalette(paletteKey as keyof typeof COLOR_PALETTES);
  
  // Navigate to create resume page
  router.push({ name: 'CreateResume' });
};

const goToSavedResumes = () => {
  router.push({ name: 'SavedResumes' });
};
</script>

<style scoped>
.template-card {
  min-height: 500px;
}

.template-preview-wrapper {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.resume-preview-component {
  width: 400%;
  height: 400%;
  transform: scale(0.25);
  transform-origin: top left;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  background: white;
}

.template-card:hover .resume-preview-component {
  transform: scale(0.26);
  transition: transform 0.3s ease;
}
</style>
