export interface PersonalInfo {
  first_name?: string;
  last_name?: string;
  headline?: string;
  country?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state_province_region?: string;
  zip_postal_code?: string;
  home_office?: string;
  geo_location?: string;
  school_district?: string;
  mobile_phone?: string;
  work_phone?: string;
  home_phone?: string;
  email_0: string;
  email_1?: string;
  ssn?: string;
}

export interface EmploymentInfo {
  employment_type?: string;
  talent_status?: string;
  applicant_tags?: string;
  details_notes?: string;
  industry_experience?: string;
  applicant_source?: string;
  certification?: string;
}

export interface WorkHistoryItem {
  company_name?: string;
  job_title?: string;
  job_description?: string;
  start_date?: string;
  end_date?: string;
  is_current_job?: boolean;
  job_location?: string;
  job_type?: string;
  job_status?: string;
}

export interface EducationHistoryItem {
  institution_name?: string;
  degree?: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  is_current_education?: boolean;
  education_location?: string;
  education_status?: string;
}

export interface OnlinePresenceInfo {
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
  peoplePerHourProfile?: string;
  fiverrProfile?: string;
  personal_site?: string;
  github?: string;
  gitlab?: string;
  bitbucket?: string;
  facebook_profile?: string;
  twitter_profile?: string;
  instagram_profile?: string;
  youtube_profile?: string;
  tiktok_profile?: string;
  pinterest_profile?: string;
  skype_id?: string;
  whatsapp_number?: string;
  wechat_id?: string;
  viber_id?: string;
  signal_id?: string;
  telegram_id?: string;
  discord_id?: string;
  slack_id?: string;
  photoUrl?: string; // New field for the photo
}

export interface CertificationItem {
  certification_name?: string;
  certification_body?: string;
  certification_date?: string;
  expiration_date?: string;
}

export interface AdditionalInfo {
  resume_text: string;
  add_to_hotlist?: boolean;
}

export interface FormData {
  personal: PersonalInfo;
  employment: EmploymentInfo;
  history: {
    work_history: WorkHistoryItem[];
    education_history: EducationHistoryItem[];
  };
  online_presence: OnlinePresenceInfo;
  certifications: CertificationItem[];
  additional: AdditionalInfo;
}