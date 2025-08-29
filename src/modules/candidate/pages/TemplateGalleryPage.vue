<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Choose Your Resume Template</h1>
        <p class="text-gray-600 text-lg">Select a professional template and customize the color palette to match your style.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="template in templatesList" :key="template.id"
             @mouseenter="hoverTemplateId = template.id"
             @mouseleave="hoverTemplateId = null"
             class="template-card relative group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">

          <div class="template-preview-wrapper h-64 overflow-hidden relative bg-gray-50 flex items-center justify-center">
            <div class="preview-scale-container" :style="{ transform: 'scale(0.35)', transformOrigin: 'center' }">
              <component :is="template.layoutComponent"
                         :resume="sampleData"
                         :palette="selectedPalettes[template.id] || COLOR_PALETTES.default" />
            </div>
          </div>

          <div class="p-4">
            <h3 class="font-bold text-lg text-gray-800 mb-1">{{ template.name }}</h3>
            <p class="text-xs text-gray-500 mb-3">Professional and ATS-friendly</p>
          </div>

          <div :class="['absolute inset-0 top-0 left-0 w-full h-full p-4 flex flex-col justify-end transition-all duration-300',
                       (hoverTemplateId === template.id) ? 'bg-white bg-opacity-95 opacity-100' : 'bg-transparent opacity-0 pointer-events-none']">
            <div class="space-y-3">
              <div v-if="template.hasColorPalette">
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
              <button @click.stop="selectTemplate(template.id)"
                      class="w-full bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md text-sm">
                Use This Template
              </button>
            </div>
          </div>
        </div>
      </div>

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
import type { ResumeData } from '@/types/resume';
import type { Component } from 'vue';

const router = useRouter();
const resumeStore = useResumeStore();

const templatesList = ATS_TEMPLATES;
const hoverTemplateId = ref<string | null>(null);
const selectedPalettes = ref<{ [key: string]: any }>({});

// Sample data to fill the preview templates
const sampleData: ResumeData = {
  personal: {
    first_name: "Abdul",
    last_name: "Ahad",
    headline: "Senior Software Engineer | Vue.js Specialist",
    country: "United States",
    address_1: "123 Main St",
    city: "Anytown",
    state_province_region: "CA",
    mobile_phone: "555-123-4567",
    email_0: "abdul.ahad@example.com",
  },
  employment: {
    employment_type: "Full-Time",
    talent_status: "Candidate",
    applicant_tags: "Vue, Pinia, TypeScript",
    details_notes: "Highly motivated.",
    industry_experience: "Technology, Web Dev",
    applicant_source: "LinkedIn",
  },
  history: {
    work_history: [
      { company_name: "Innovatech Solutions", job_title: "Senior Frontend Engineer", start_date: "2020-01-01", end_date: "2024-05-31", is_current_job: false, job_location: "San Francisco, CA", job_type: "Full-Time" },
    ],
    education_history: [
      { institution_name: "State University", degree: "B.S.", field_of_study: "Computer Science", start_date: "2013-09-01", end_date: "2017-05-31", is_current_education: false, education_location: "State, US" },
    ],
  },
  online_presence: {},
  certifications: [{ certification_name: "AWS Certified Developer", certification_body: "Amazon Web Services", certification_date: "2022-03-15", certification_status: "Completed" }],
  skills: [{ skill_category_name: "Programming", skill_name: "JavaScript", skill_proficiency_level: "Advanced" }],
  projects: [{ proj_name: "E-commerce Platform", proj_description: "Developed a full-stack e-commerce platform.", proj_forWhom: "Personal" }],
  references: [],
  job_portals: {},
  version_control: {},
  additional: {
    resume_text: "A highly motivated software engineer with 7+ years of experience in modern web development frameworks, including Vue.js and TypeScript. I have a proven track record of delivering high-quality, scalable applications. Seeking a challenging role to leverage my technical and leadership skills.",
  },
};

const handlePaletteChange = (templateId: string, palette: any) => {
  selectedPalettes.value = {
    ...selectedPalettes.value,
    [templateId]: palette,
  };
};

const selectTemplate = (templateId: string) => {
  const selectedPalette = selectedPalettes.value[templateId] || COLOR_PALETTES.default;
  const paletteKey = Object.keys(COLOR_PALETTES).find(key => COLOR_PALETTES[key] === selectedPalette) || 'default';
  
  resumeStore.switchTemplate(templateId);
  resumeStore.switchPalette(paletteKey as keyof typeof COLOR_PALETTES);
  
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

/* Adjust the scale to properly fit the resume within the preview box */
.preview-scale-container {
  width: 100%;
  height: 100%;
  transform-origin: top left;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.template-card:hover .preview-scale-container {
  transform: scale(0.26);
  transition: transform 0.3s ease;
}
</style>