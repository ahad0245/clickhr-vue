import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FormData } from '@/types/resume';
import { COLOR_PALETTES } from '@/constants/colorPalettes';

export const mockData: FormData = {
  personal: {
    first_name: 'John',
    last_name: 'Doe',
    headline: 'Senior Software Engineer | Vue.js Specialist',
    country: 'United States',
    address_1: '123 Main St',
    address_2: '',
    city: 'Anytown',
    state_province_region: 'CA',
    zip_postal_code: '12345',
    home_office: 'Remote',
    geo_location: '40.7128,-74.0060',
    school_district: 'Anytown Unified',
    mobile_phone: '555-123-4567',
    work_phone: '555-987-6543',
    home_phone: '',
    email_0: 'john.doe@example.com',
    email_1: '',
    ssn: 'XXX-XX-XXXX',
    profile_photo_url: 'https://i.pravatar.cc/150?img=68',
  },
  employment: {
    employment_type: 'Full-time',
    talent_status: 'Candidate',
    applicant_tags: 'Vue, Pinia, TypeScript',
    details_notes: 'Highly motivated and skilled engineer.',
    industry_experience: 'Technology, Web Development',
    applicant_source: 'LinkedIn',
    certification: 'AWS Certified Developer'
  },
  history: {
    work_history: [
      {
        company_name: 'Innovatech Solutions',
        job_title: 'Senior Frontend Engineer',
        job_description: 'Developed and maintained core features of the flagship application using Vue 3 and TypeScript.',
        start_date: '2020-01-01',
        end_date: '2024-05-31',
        is_current_job: false,
        job_location: 'San Francisco, CA',
        job_type: 'Full-time',
        job_status: 'Active',
        experience_letter_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
      {
        company_name: 'Creative Minds Agency',
        job_title: 'Frontend Developer',
        job_description: 'Worked on client projects, building responsive user interfaces with Vue 2.',
        start_date: '2017-06-01',
        end_date: '2019-12-31',
        is_current_job: false,
        job_location: 'Anytown, CA',
        job_type: 'Full-time',
        job_status: 'Active',
        experience_letter_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      }
    ],
    education_history: [
      {
        institution_name: 'State University',
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Science',
        start_date: '2013-09-01',
        end_date: '2017-05-31',
        is_current_education: false,
        education_location: 'State, US',
        education_status: 'Completed',
        degree_image_url: 'https://www.gstatic.com/devrel-devsite/prod/vc3d1f1146313b8600d33e9d0a64e1e370a4a1599540b613c2f1f6c449c2a86f9/firebase/images/social/certificate.png',
      }
    ]
  },
  online_presence: {
    linkedin: 'https://linkedin.com/in/johndoe',
    personal_site: 'https://johndoe.dev',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
    facebook: '',
    instagram: '',
    youtube: '',
    tiktok: '',
  },
  certifications: [
    {
      certification_name: 'AWS Certified Developer',
      certification_body: 'Amazon Web Services',
      certification_date: '2022-03-15',
      expiration_date: '2025-03-15',
      certificate_image_url: 'https://www.gstatic.com/devrel-devsite/prod/vc3d1f1146313b8600d33e9d0a64e1e370a4a1599540b613c2f1f6c449c2a86f9/firebase/images/social/certificate.png',
    }
  ],
  additional: {
    resume_text: 'A highly motivated software engineer with 7+ years of experience in modern web development frameworks, including Vue.js and TypeScript. I have a proven track record of delivering high-quality, scalable applications. Seeking a challenging role to leverage my technical and leadership skills.',
    add_to_hotlist: true
  }
};

export const useResumeStore = defineStore('resume', () => {
  const formData = ref<FormData>(mockData);
  const selectedTemplate = ref('modern-ats');
  const selectedPalette = ref(COLOR_PALETTES.default);

  function switchTemplate(template: string) {
    selectedTemplate.value = template;
  }

  function switchPalette(paletteId) {
    if (COLOR_PALETTES[paletteId]) {
      selectedPalette.value = COLOR_PALETTES[paletteId];
    }
  }

  return { formData, selectedTemplate, selectedPalette, switchTemplate, switchPalette };
});