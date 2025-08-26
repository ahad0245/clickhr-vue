import type { FormData } from '@/types/resume';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useResumeStore = defineStore('resume', () => {
const formData = ref<FormData>({
    personal: {
      firstName: 'Qirrat Fatima',
      lastName: 'Zaidi',
      headline: 'Front-End Developer',
      country: 'India',
      address: 'Karachi',
      city: 'Karachi',
      state: 'Sindh',
      zipCode: '74000',
      email1: 'qirrat.zaidi@example.com',
      mobilePhone: '+92 312 3456789',
      homeOffice: 'Remote',
      geoCode: '24.860966, 66.990501',
      schoolDistrict: 'Karachi Board',
      workPhone: '+92 321 9876543',
      homePhone: '+92 21 1234567',
      email2: 'qirrat.f@example.com',
      ssn: 'XXX-XX-1234'
    },
    employment: {
      linkedinProfile: 'https://www.linkedin.com/in/qirrat',
      personalSite: 'https://qirrat.dev',
      skillSet: 'Vue.js, TypeScript, Tailwind CSS',
      employmentType: 'Full-time',
      talentStatus: 'Applicant',
      positionCategory: 'Software Engineer',
      applicantTags: 'Frontend, Web Development',
      details: 'Passionate about building intuitive user interfaces.',
      industryExperience: 'Technology',
      companyExperience: 'Google, Apple',
      applicantSource: 'LinkedIn',
      citizenship: 'Pakistani',
      certification: 'AWS Certified Cloud Practitioner'
    },
    history: {
      workHistory: [
        { company: 'Tech Solutions Inc.', from: '2020-01-01', to: 'Present' }
      ],
      educationHistory: [
        { school: 'University of Karachi', degree: 'BSCS', field: 'Computer Science', from: '2016-09-01', to: '2020-06-01' }
      ],
    },
    additional: {
      resumeText: 'A highly motivated and skilled frontend developer with a passion for building intuitive user interfaces. Proficient in Vue.js, JavaScript, and modern web development practices.',
      hotlist: true,
      tagsRating: 5
    }
  });
  const selectedTemplate = ref('basic-ats'); // Ensure a default value is set

  function switchTemplate(template: string) {
    selectedTemplate.value = template;
  }

  return { formData, selectedTemplate, switchTemplate };
});