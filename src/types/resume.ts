export interface PersonalInfo {
  firstName: string;
  lastName: string;
  headline?: string;
  country?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  homeOffice?: string;
  geoLocation?: string;
  schoolDistrict?: string;
  mobilePhone?: string;
  workPhone?: string;
  homePhone?: string;
  email1: string;
  email2?: string;
  ssn?: string;
}

export interface EmploymentInfo {
  employmentType?: string;
  talentStatus?: string;
  positionCategory?: string;
  skillSet?: string;
  applicantTags?: string;
  detailsNotes?: string;
  industryExperience?: string;
  applicantSource?: string;
}

export interface WorkHistoryItem {
  companyName: string;
  jobTitle?: string;
  jobDescription?: string;
  startDate?: string;
  endDate?: string;
  isCurrentJob?: boolean;
  jobLocation?: string;
  jobType?: string;
}

export interface EducationHistoryItem {
  institutionName: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  isCurrentEducation?: boolean;
  educationLocation?: string;
}

export interface OnlinePresenceInfo {
  linkedInProfile?: string;
  indeedProfile?: string;
  monsterProfile?: string;
  glassdoorProfile?: string;
  zipRecruiterProfile?: string;
  careerBuilderProfile?: string;
  simplyHiredProfile?: string;
  upworkProfile?: string;
  freelancerProfile?: string;
  guruProfile?: string;
  peoplePerHourProfile?: string;
  fiverrProfile?: string;
  personalSite?: string;
  github?: string;
  gitlab?: string;
  bitbucket?: string;
  facebookProfile?: string;
  twitterProfile?: string;
  instagramProfile?: string;
  youtubeProfile?: string;
  tiktokProfile?: string;
  pinterestProfile?: string;
  skypeId?: string;
  whatsappNumber?: string;
  wechatId?: string;
  viberId?: string;
  signalId?: string;
  telegramId?: string;
  discordId?: string;
  slackId?: string;
}

export interface CertificationItem {
  certificationName: string;
  certificationBody?: string;
  certificationDate?: string;
  expirationDate?: string;
}

export interface AdditionalInfo {
  resumeText: string;
  addToHotlist?: boolean;
}

export interface FormData {
  personal: PersonalInfo;
  employment: EmploymentInfo;
  history: {
    workHistory: WorkHistoryItem[];
    educationHistory: EducationHistoryItem[];
  };
  onlinePresence: OnlinePresenceInfo;
  certifications: CertificationItem[];
  additional: AdditionalInfo;
}