import type { FormData } from '@/types/resume';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useResumeStore = defineStore('resume', () => {
const formData = ref<FormData>({
    personal: {
      firstName: '',
      lastName: '',
      headline: '',
      country: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      email1: ''
    },
    employment: {
      linkedinProfile: '',
      personalSite: '',
      skillSet: ''
    },
    history: {
      workHistory: [],
      educationHistory: []
    },
    additional: {
      resumeText: ''
    }
  });
  const selectedTemplate = ref('basic-ats'); // Ensure a default value is set

  function switchTemplate(template: string) {
    selectedTemplate.value = template;
  }

  return { formData, selectedTemplate, switchTemplate };
});