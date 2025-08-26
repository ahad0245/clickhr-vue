import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface FormData {
  personal: {
    first_name: string;
    last_name: string;
    headline: string;
    country: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    zip_code: string;
    home_office: string;
    geo_location: string;
    school_district: string;
    mobile_phone: string;
    work_phone: string;
    home_phone: string;
    email_0: string;
    email_1: string;
    ssn: string;
  };
  employment: {
    employment_type: string;
    talent_status: string;
    applicant_tags: string;
    notes: string;
    industry: string;
    source: string;
    certification: string;
    skill_set: string; // added for compatibility
  };
  history: {
    work_history: {
      company_name: string;
      job_title: string;
      job_description: string;
      start_date: string;
      end_date: string;
      is_current_job: boolean;
      job_location: string;
      job_type: string;
      job_status: string;
    }[];
    education_history: {
      institution_name: string;
      degree: string;
      field_of_study: string;
      start_date: string;
      end_date: string;
      is_current_education: boolean;
      education_location: string;
      education_status: string;
    }[];
  };
  online_presence: {
    linkedin: string;
    personal_site: string;
    github: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  certifications: {
    certification_name: string;
    certification_body: string;
    certification_date: string;
    expiration_date: string;
  }[];
  additional: {
    resume_text: string;
    add_to_hotlist: boolean;
  };
}

export const useResumeStore = defineStore('resume', () => {
  const formData = ref<FormData>({
    personal: {
      first_name: '',
      last_name: '',
      headline: '',
      country: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      zip_code: '',
      home_office: '',
      geo_location: '',
      school_district: '',
      mobile_phone: '',
      work_phone: '',
      home_phone: '',
      email_0: '',
      email_1: '',
      ssn: ''
    },
    employment: {
      employment_type: '',
      talent_status: '',
      applicant_tags: '',
      notes: '',
      industry: '',
      source: '',
      certification: '',
      skill_set: ''
    },
    history: {
      work_history: [],
      education_history: []
    },
    online_presence: {
      linkedin: '',
      personal_site: '',
      github: '',
      twitter: '',
      facebook: '',
      instagram: '',
      youtube: '',
      tiktok: ''
    },
    certifications: [],
    additional: {
      resume_text: '',
      add_to_hotlist: false
    }
  });

  const selectedTemplate = ref('basic-template');

  function switchTemplate(template: string) {
    selectedTemplate.value = template;
  }

  return { formData, selectedTemplate, switchTemplate };
});
