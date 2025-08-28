// src/types/resume.ts
export interface WorkHistoryItem {
  company_name: string;
  job_title: string;
  job_description?: string;
  start_date: string;
  end_date?: string;
  is_current_job: boolean;
  job_location?: string;
  job_type?: string;
  job_status?: string;
  experience_letter_url?: string | ArrayBuffer | null;
}

export interface EducationHistoryItem {
  institution_name: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  is_current_education: boolean;
  education_location?: string;
  education_status?: string;
  degree_image_url?: string | ArrayBuffer | null;
}

export interface CertificationItem {
  certification_name: string;
  certification_body?: string;
  certification_date: string;
  expiration_date?: string;
  certification_status: 'Completed' | 'In Progress';
  certificate_image_url?: string | ArrayBuffer | null;
}

export interface ProjectItem {
  proj_name: string;
  proj_description: string;
  proj_date?: string;
  proj_relevantLink?: string;
  proj_forWhom: string;
}

export interface ReferenceItem {
  full_name: string;
  email: string;
  contact?: string;
  designation: string;
  company: string;
  relation?: string;
}

export interface SkillItem {
  skill_category_name: string;
  skill_name: string;
  skill_proficiency_level: string;
  skill_years_of_experience?: number;
  notes?: string;
}

export interface JobPortalProfileItem {
  linked_in_profile?: string;
  indeed_profile?: string;
  monster_profile?: string;
  glassdoor_profile?: string;
  zip_recruiter_profile?: string;
  career_builder_profile?: string;
  simply_hired_profile?: string;
  upwork_profile?: string;
  freelancer_profile?: string;
  guru_profile?: string;
  people_per_hour_profile?: string;
  fiverr_profile?: string;
}

export interface VersionControlProfileItem {
  github?: string;
  gitlab?: string;
  bitbucket?: string;
  sourceforge?: string;
  codeberg?: string;
  gitea?: string;
}

export interface FormData {
  personal: {
    first_name: string;
    last_name: string;
    headline: string;
    country: string;
    address_1: string;
    address_2?: string;
    city: string;
    state_province_region?: string;
    zip_postal_code?: string;
    home_office?: string;
    geo_location?: string;
    school_district?: string;
    mobile_phone: string;
    work_phone?: string;
    home_phone?: string;
    email_0: string;
    email_1?: string;
    ssn?: string;
    profile_photo_url?: string | ArrayBuffer | null;
  };
  employment: {
    employment_type: string;
    talent_status: string;
    applicant_tags: string;
    details_notes?: string;
    industry_experience?: string;
    applicant_source?: string;
  };
  history: {
    work_history: WorkHistoryItem[];
    education_history: EducationHistoryItem[];
  };
  online_presence: {
    linkedin?: string;
    personal_site?: string;
    github?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  certifications: CertificationItem[];
  projects: ProjectItem[];
  references: ReferenceItem[];
  job_portals: JobPortalProfileItem;
  version_control: VersionControlProfileItem;
  additional: {
    resume_text: string;
    add_to_hotlist: boolean;
  };
}