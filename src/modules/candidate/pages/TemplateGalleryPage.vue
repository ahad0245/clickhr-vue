<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Choose Your Resume Template</h1>
        <p class="text-gray-600 text-lg">Select a professional template and customize the color palette to match your style.</p>
      </div>

      <!-- Added grid layout with template selection on left and preview on right -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Template Selection Grid -->
        <div class="lg:col-span-2">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="template in templatesList" :key="template.id"
                 @mouseenter="previewTemplate(template.id)"
                 @click="selectTemplate(template.id)"
                 class="template-card relative group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                 :class="{ 'ring-4 ring-blue-500 ring-offset-4': selectedTemplateId === template.id }">
              
              <!-- Template Preview -->
              <div class="template-preview-wrapper h-48 overflow-hidden relative bg-gray-50">
                <component :is="template.layoutComponent" 
                           :resume="sampleData" 
                           :palette="selectedPalettes[template.id] || COLOR_PALETTES.default" 
                           class="resume-preview-component transform scale-[0.15] origin-top-left absolute w-[666%] h-[666%]" />
              </div>

              <!-- Template Info -->
              <div class="p-4">
                <h3 class="font-bold text-lg text-gray-800 mb-1">{{ template.name }}</h3>
                <p class="text-xs text-gray-500 mb-3">Professional and ATS-friendly</p>

                <!-- Color Palette Selection -->
                <div v-if="template.hasColorPalette" class="mb-3">
                  <p class="text-xs font-medium text-gray-700 mb-2">Choose Color:</p>
                  <div class="flex space-x-1">
                    <div v-for="(palette, key) in COLOR_PALETTES" :key="key"
                         @click.stop="handlePaletteChange(template.id, palette)"
                         :class="['w-6 h-6 rounded-full cursor-pointer border-2 transition-all hover:scale-110', 
                                  {'ring-2 ring-offset-1 ring-blue-500': selectedPalettes[template.id]?.name === palette.name}]"
                         :style="{backgroundColor: palette.background, borderColor: palette.background}"
                         :title="palette.name">
                    </div>
                  </div>
                </div>

                <!-- Action Button -->
                <button @click.stop="selectTemplate(template.id)" 
                        class="w-full bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm">
                  Use This Template
                </button>
              </div>

              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>

        <!-- Added large preview panel on the right side -->
        <div class="lg:col-span-1">
          <div class="sticky top-4">
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
              <!-- Added change template button on top of preview -->
              <div class="p-4 border-b bg-gray-50">
                <div class="flex justify-between items-center">
                  <h3 class="font-semibold text-gray-800">Template Preview</h3>
                  <button v-if="selectedTemplateId" @click="changeTemplate" 
                          class="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    Change Template
                  </button>
                </div>
                <p v-if="selectedTemplateId" class="text-sm text-gray-600 mt-1">
                  {{ getSelectedTemplateName() }}
                </p>
              </div>
              
              <!-- Large Preview Area -->
              <div class="preview-container h-96 overflow-hidden relative bg-gray-50">
                <div v-if="previewTemplateId" class="w-full h-full flex items-center justify-center">
                  <component :is="getPreviewComponent()" 
                             :resume="sampleData" 
                             :palette="selectedPalettes[previewTemplateId] || COLOR_PALETTES.default" 
                             class="large-preview-component transform scale-[0.35] origin-center w-[285%] h-[285%]" />
                </div>
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center text-gray-500">
                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-lg font-medium">Hover over a template</p>
                    <p class="text-sm">to see a larger preview</p>
                  </div>
                </div>
              </div>

              <!-- Selected Template Actions -->
              <div v-if="selectedTemplateId" class="p-4 bg-gray-50 border-t">
                <button @click="proceedWithTemplate" 
                        class="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                  Continue with {{ getSelectedTemplateName() }}
                </button>
              </div>
            </div>
          </div>
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
import { ref, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useResumeStore } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';
import { COLOR_PALETTES } from '@/constants/colorPalettes';

const router = useRouter();
const resumeStore = useResumeStore();

const templatesList = ATS_TEMPLATES;
const selectedTemplateId = ref<string | null>(null);
const previewTemplateId = ref<string | null>(null);
const selectedPalettes = ref<{ [key: string]: any }>({});

// Sample data for template preview
const sampleData = resumeStore.getNewCandidateProfile();

const previewTemplate = (templateId: string) => {
  previewTemplateId.value = templateId;
};

const getPreviewComponent = () => {
  if (!previewTemplateId.value) return null;
  const template = templatesList.find(t => t.id === previewTemplateId.value);
  return template ? shallowRef(template.layoutComponent) : null;
};

const getSelectedTemplateName = () => {
  if (!selectedTemplateId.value) return '';
  const template = templatesList.find(t => t.id === selectedTemplateId.value);
  return template ? template.name : '';
};

const handlePaletteChange = (templateId: string, palette: any) => {
  selectedPalettes.value = {
    ...selectedPalettes.value,
    [templateId]: palette,
  };
  // Update preview if this template is currently being previewed
  if (previewTemplateId.value === templateId) {
    previewTemplateId.value = templateId; // Force reactivity update
  }
};

const selectTemplate = (templateId: string) => {
  selectedTemplateId.value = templateId;
  previewTemplateId.value = templateId;
};

const changeTemplate = () => {
  selectedTemplateId.value = null;
  previewTemplateId.value = null;
};

const proceedWithTemplate = () => {
  if (!selectedTemplateId.value) return;
  
  const selectedPalette = selectedPalettes.value[selectedTemplateId.value] || COLOR_PALETTES.default;
  
  // Set template and palette in store
  resumeStore.switchTemplate(selectedTemplateId.value);
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
  min-height: 320px;
}

.template-preview-wrapper {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.resume-preview-component {
  width: 666%;
  height: 666%;
  transform: scale(0.15);
  transform-origin: top left;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  background: white;
}

.template-card:hover .resume-preview-component {
  transform: scale(0.16);
  transition: transform 0.3s ease;
}

.preview-container {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.large-preview-component {
  width: 285%;
  height: 285%;
  transform: scale(0.35);
  transform-origin: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.35);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  background: white;
  border-radius: 8px;
}
</style>
