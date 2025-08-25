export interface PersonalInfo {
  firstName: string;
  lastName: string;
  headline: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email1: string;
}

export interface EmploymentInfo {
  linkedinProfile: string;
  personalSite: string;
  skillSet: string;
}

export interface WorkHistoryItem {
  company: string;
  position: string;
  from: string;
  to: string;
  description: string;
}

export interface EducationHistoryItem {
  school: string;
  degree: string;
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
  };
}
