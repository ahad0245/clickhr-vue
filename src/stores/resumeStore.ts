// src/stores/resumeStore.ts

import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FormData } from '@/types/resume';
import { COLOR_PALETTES } from '@/constants/colorPalettes';

interface ResumeInstance {
  id: string;
  title: string;
  templateId: string;
  data: FormData;
}

export const candidateProfile: FormData = {
  personal: {
    first_name: 'Abdul',
    last_name: 'Ahad',
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
    employment_type: 'Full-Time',
    talent_status: 'Candidate',
    applicant_tags: 'Vue, Pinia, TypeScript',
    details_notes: 'Highly motivated and skilled engineer.',
    industry_experience: 'Technology, Web Development',
    applicant_source: 'LinkedIn',
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
        job_type: 'Full-Time',
        job_status: 'Active',
        experience_letter_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
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
    facebook_profile: '',
    twitter_profile: 'https://twitter.com/johndoe',
    instagram_profile: '',
    youtube_profile: '',
    tiktok_profile: '',
    pinterest_profile: '',
    skype_id: '',
    whatsapp_number: '',
    wechat_id: '',
    viber_id: '',
    signal_id: '',
    telegram_id: '',
    discord_id: '',
    slack_id: '',
  },
  certifications: [
    {
      certification_name: 'AWS Certified Developer',
      certification_body: 'Amazon Web Services',
      certification_date: '2022-03-15',
      expiration_date: '2025-03-15',
      certification_status: 'Completed',
      certificate_image_url: 'https://www.gstatic.com/devrel-devsite/prod/vc3d1f1146313b8600d33e9d0a64e1e370a4a1599540b613c2f1f6c449c2a86f9/firebase/images/social/certificate.png',
    }
  ],
  skills: [
    {
      skill_category_name: 'Programming Languages',
      skill_name: 'JavaScript',
      skill_proficiency_level: 'Advanced',
      skill_years_of_experience: 7,
      notes: 'Expert in ES6+'
    }
  ],
  projects: [
    {
      proj_name: 'E-commerce Platform',
      proj_description: 'Developed a full-stack e-commerce platform using Vue.js and Node.js.',
      proj_date: '2023-01-01',
      proj_relevantLink: 'https://github.com/johndoe/ecommerce',
      proj_forWhom: 'Personal Project',
    }
  ],
  references: [
    {
      full_name: 'Jane Smith',
      email: 'jane.smith@example.com',
      contact: '555-111-2222',
      designation: 'CTO',
      company: 'Innovatech Solutions',
      relation: 'Former Manager',
    }
  ],
  job_portals: {
    linked_in_profile: 'https://linkedin.com/in/johndoe',
    indeed_profile: '',
    monster_profile: '',
    glassdoor_profile: '',
    zip_recruiter_profile: '',
    career_builder_profile: '',
    simply_hired_profile: '',
    upwork_profile: '',
    freelancer_profile: '',
    guru_profile: '',
    people_per_hour_profile: '',
    fiverr_profile: '',
  },
  version_control: {
    github: 'https://github.com/johndoe',
    gitlab: '',
    bitbucket: '',
    sourceforge: '',
    codeberg: '',
    gitea: '',
  },
  additional: {
    resume_text: 'A highly motivated software engineer with 7+ years of experience in modern web development frameworks, including Vue.js and TypeScript. I have a proven track record of delivering high-quality, scalable applications. Seeking a challenging role to leverage my technical and leadership skills.',
    add_to_hotlist: true
  }
};

export const useResumeStore = defineStore('resume', () => {
  const selectedTemplate = ref('modern-ats');
  const selectedPalette = ref(COLOR_PALETTES.default);
  const savedResumes = ref<ResumeInstance[]>([]);

  function switchTemplate(template: string) {
    selectedTemplate.value = template;
  }

  function switchPalette(paletteId: keyof typeof COLOR_PALETTES) {
    if (COLOR_PALETTES[paletteId]) {
      selectedPalette.value = COLOR_PALETTES[paletteId];
    }
  }

  function addOrUpdateResume(resume: ResumeInstance) {
    const index = savedResumes.value.findIndex(r => r.id === resume.id);
    if (index !== -1) {
      savedResumes.value[index] = resume;
    } else {
      savedResumes.value.push(resume);
    }
  }
  
  function getResumeById(id: string): ResumeInstance | undefined {
    return savedResumes.value.find(r => r.id === id);
  }

  return {
    selectedTemplate,
    selectedPalette,
    savedResumes,
    addOrUpdateResume,
    getResumeById,
    // Provide a function to get a deep clone of the base profile
    getNewCandidateProfile: () => JSON.parse(JSON.stringify(candidateProfile)),
  };
});