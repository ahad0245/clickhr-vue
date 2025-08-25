export interface PersonalInfo {
  firstName: string;
  lastName: string;
  headline: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  homeOffice?: string; // Added field
  geoCode?: string; // Added field
  schoolDistrict?: string; // Added field
  mobilePhone?: string; // Added field
  workPhone?: string; // Added field
  homePhone?: string; // Added field
  email1: string;
  email2?: string; // Added field
  ssn?: string; // Added field
}

export interface EmploymentInfo {
  employmentType?: string; // Added field
  linkedinProfile: string;
  personalSite: string;
  skillSet: string;
  custom1?: string; // Added field
  custom2?: string; // Added field
  talentStatus?: string; // Added field
  positionCategory?: string; // Added field
  applicantTags?: string; // Added field
  details?: string; // Added field
  industryExperience?: string; // Added field
  companyExperience?: string; // Added field
  applicantSource?: string; // Added field
  citizenship?: string; // Added field
  certification?: string; // Added field
}

export interface WorkHistoryItem {
  company: string;
  position?: string; // Added field from other components
  description?: string; // Added field from other components
  from: string;
  to: string;
}

export interface EducationHistoryItem {
  school: string;
  degree: string;
  field?: string; // Added field
  from: string;
  to: string;
}

export interface FormData {
  personal: PersonalInfo;
  employment: EmploymentInfo;
  history: {
    workHistory: WorkHistoryItem[];
    educationHistory: EducationHistoryItem[];
  };
  additional: {
    resumeText: string;
    tagsRating?: number; // Added field
    hotlist?: boolean; // Added field
  };
}