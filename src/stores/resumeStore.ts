// src/stores/resumeStore.ts

import { defineStore } from "pinia"
import { ref } from "vue"
import type { FormData } from "@/types/resume"
import { COLOR_PALETTES } from "@/constants/colorPalettes"
import { nanoid } from "nanoid"

interface ResumeInstance {
  id: string
  title: string
  templateId: string
  data: FormData
}

export const candidateProfile: FormData = {
  personal: {
    first_name: "Abdul",
    last_name: "Ahad",
    headline: "Senior Software Engineer | Vue.js Specialist",
    country: "United States",
    address_1: "123 Main St",
    address_2: "",
    city: "Anytown",
    state_province_region: "CA",
    zip_postal_code: "12345",
    home_office: "Remote",
    geo_location: "40.7128,-74.0060",
    school_district: "Anytown Unified",
    mobile_phone: "555-123-4567",
    work_phone: "555-987-6543",
    home_phone: "",
    email_0: "john.doe@example.com",
    email_1: "",
    ssn: "XXX-XX-XXXX",
    profile_photo_url: "https://i.pravatar.cc/150?img=68",
  },
  employment: {
    employment_type: "Full-Time",
    talent_status: "Candidate",
    applicant_tags: "Vue, Pinia, TypeScript",
    details_notes: "Highly motivated and skilled engineer.",
    industry_experience: "Technology, Web Development",
    applicant_source: "LinkedIn",
  },
  history: {
    work_history: [
      {
        company_name: "Innovatech Solutions",
        job_title: "Senior Frontend Engineer",
        job_description:
          "Developed and maintained core features of the flagship application using Vue 3 and TypeScript.",
        start_date: "2020-01-01",
        end_date: "2024-05-31",
        is_current_job: false,
        job_location: "San Francisco, CA",
        job_type: "Full-Time",
        job_status: "Active",
        experience_letter_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    education_history: [
      {
        institution_name: "State University",
        degree: "Bachelor of Science",
        field_of_study: "Computer Science",
        start_date: "2013-09-01",
        end_date: "2017-05-31",
        is_current_education: false,
        education_location: "State, US",
        education_status: "Completed",
        degree_image_url:
          "https://www.gstatic.com/devrel-devsite/prod/vc3d1f1146313b8600d33e9d0a64e1e370a4a1599540b613c2f1f6c449c2a86f9/firebase/images/social/certificate.png",
      },
    ],
  },
  online_presence: {
    facebook_profile: "",
    twitter_profile: "https://twitter.com/johndoe",
    instagram_profile: "",
    youtube_profile: "",
    tiktok_profile: "",
    pinterest_profile: "",
    skype_id: "",
    whatsapp_number: "",
    wechat_id: "",
    viber_id: "",
    signal_id: "",
    telegram_id: "",
    discord_id: "",
    slack_id: "",
  },
  certifications: [
    {
      certification_name: "AWS Certified Developer",
      certification_body: "Amazon Web Services",
      certification_date: "2022-03-15",
      expiration_date: "2025-03-15",
      certification_status: "Completed",
      certificate_image_url:
        "https://www.gstatic.com/devrel-devsite/prod/vc3d1f1146313b8600d33e9d0a64e1e370a4a1599540b613c2f1f6c449c2a86f9/firebase/images/social/certificate.png",
    },
  ],
  skills: [
    {
      skill_category_name: "Programming Languages",
      skill_name: "JavaScript",
      skill_proficiency_level: "Advanced",
      skill_years_of_experience: 7,
      notes: "Expert in ES6+",
    },
  ],
  projects: [
    {
      proj_name: "E-commerce Platform",
      proj_description: "Developed a full-stack e-commerce platform using Vue.js and Node.js.",
      proj_date: "2023-01-01",
      proj_relevantLink: "https://github.com/johndoe/ecommerce",
      proj_forWhom: "Personal Project",
    },
  ],
  references: [
    {
      full_name: "Jane Smith",
      email: "jane.smith@example.com",
      contact: "555-111-2222",
      designation: "CTO",
      company: "Innovatech Solutions",
      relation: "Former Manager",
    },
  ],
  job_portals: {
    linked_in_profile: "https://linkedin.com/in/johndoe",
    indeed_profile: "",
    monster_profile: "",
    glassdoor_profile: "",
    zip_recruiter_profile: "",
    career_builder_profile: "",
    simply_hired_profile: "",
    upwork_profile: "",
    freelancer_profile: "",
    guru_profile: "",
    people_per_hour_profile: "",
    fiverr_profile: "",
  },
  version_control: {
    github: "https://github.com/johndoe",
    gitlab: "",
    bitbucket: "",
    sourceforge: "",
    codeberg: "",
    gitea: "",
  },
  additional: {
    resume_text:
      "A highly motivated software engineer with 7+ years of experience in modern web development frameworks, including Vue.js and TypeScript. I have a proven track record of delivering high-quality, scalable applications. Seeking a challenging role to leverage my technical and leadership skills.",
    add_to_hotlist: true,
  },
}

export const useResumeStore = defineStore("resume", () => {
  const selectedTemplate = ref("modern-ats")
  const selectedPalette = ref(COLOR_PALETTES.default)
  const savedResumes = ref<ResumeInstance[]>([])
  const currentResumeData = ref<FormData | null>(null)

  function switchTemplate(template: string) {
    selectedTemplate.value = template
  }

  function switchPalette(paletteId: keyof typeof COLOR_PALETTES) {
    if (COLOR_PALETTES[paletteId]) {
      selectedPalette.value = COLOR_PALETTES[paletteId]
    }
  }

  function addOrUpdateResume(resume: Partial<ResumeInstance> & { title: string; templateId: string; data: FormData }) {
    try {
      if (resume.id) {
        const index = savedResumes.value.findIndex((r) => r.id === resume.id)
        if (index !== -1) {
          savedResumes.value[index] = {
            ...savedResumes.value[index],
            title: resume.title,
            templateId: resume.templateId,
            data: { ...resume.data },
          }
          return savedResumes.value[index]
        }
      } else {
        const newResume: ResumeInstance = {
          id: nanoid(),
          title: resume.title,
          templateId: resume.templateId,
          data: { ...resume.data },
        }
        savedResumes.value.push(newResume)
        return newResume
      }
    } catch (error) {
      console.error("Error saving resume:", error)
      throw new Error("Failed to save resume")
    }
  }

  function getResumeById(id: string): ResumeInstance | undefined {
    return savedResumes.value.find((r) => r.id === id)
  }

  function deleteResume(id: string) {
    const index = savedResumes.value.findIndex((r) => r.id === id)
    if (index !== -1) {
      savedResumes.value.splice(index, 1)
    }
  }

  function duplicateResume(id: string): string | null {
    const resume = getResumeById(id)
    if (resume) {
      const newResume = {
        ...resume,
        id: nanoid(),
        title: `${resume.title} (Copy)`,
        data: { ...resume.data },
      }
      savedResumes.value.push(newResume)
      return newResume.id
    }
    return null
  }

  function updateCurrentResume(data: FormData) {
    currentResumeData.value = { ...data }
  }

  function validateResumeData(
    data: FormData,
    title: string,
    hasReferences = false,
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!title.trim()) {
      errors.push("Resume title is required")
    }

    if (!data.personal.first_name.trim()) {
      errors.push("First name is required")
    }

    if (!data.personal.last_name.trim()) {
      errors.push("Last name is required")
    }

    if (!data.personal.email_0.trim()) {
      errors.push("Primary email is required")
    }

    if (!data.personal.headline.trim()) {
      errors.push("Professional headline is required")
    }

    if (!data.personal.country.trim()) {
      errors.push("Country is required")
    }

    if (!data.personal.address_1.trim()) {
      errors.push("Address is required")
    }

    if (!data.personal.city.trim()) {
      errors.push("City is required")
    }

    if (!data.personal.mobile_phone.trim()) {
      errors.push("Mobile phone is required")
    }

    if (!data.employment.employment_type.trim()) {
      errors.push("Employment type is required")
    }

    if (!data.employment.talent_status.trim()) {
      errors.push("Talent status is required")
    }

    if (!data.employment.applicant_tags.trim()) {
      errors.push("Applicant tags are required")
    }

    if (!data.additional.resume_text.trim()) {
      errors.push("Resume text/summary is required")
    }

    // Validate education history
    if (data.history.education_history.length === 0) {
      errors.push("At least one education entry is required")
    } else {
      data.history.education_history.forEach((edu, index) => {
        if (!edu.institution_name.trim()) {
          errors.push(`Education ${index + 1}: Institution name is required`)
        }
        if (!edu.degree.trim()) {
          errors.push(`Education ${index + 1}: Degree is required`)
        }
        if (!edu.field_of_study.trim()) {
          errors.push(`Education ${index + 1}: Field of study is required`)
        }
        if (!edu.education_location.trim()) {
          errors.push(`Education ${index + 1}: Location is required`)
        }
        if (!edu.start_date.trim()) {
          errors.push(`Education ${index + 1}: Start date is required`)
        }
        // Use optional chaining for end_date as it is an optional field
        if (!edu.is_current_education && !edu.end_date?.trim()) {
          errors.push(`Education ${index + 1}: End date is required for completed education`)
        }
      })
    }

    // Validate work history
    if (data.history.work_history.length === 0) {
      errors.push("At least one work experience entry is required")
    } else {
      data.history.work_history.forEach((work, index) => {
        if (!work.company_name.trim()) {
          errors.push(`Work ${index + 1}: Company name is required`)
        }
        if (!work.job_title.trim()) {
          errors.push(`Work ${index + 1}: Job title is required`)
        }
        if (!work.job_type.trim()) {
          errors.push(`Work ${index + 1}: Job type is required`)
        }
        if (!work.job_location.trim()) {
          errors.push(`Work ${index + 1}: Job location is required`)
        }
        if (!work.start_date.trim()) {
          errors.push(`Work ${index + 1}: Start date is required`)
        }
        // Use optional chaining for end_date as it is an optional field
        if (!work.is_current_job && !work.end_date?.trim()) {
          errors.push(`Work ${index + 1}: End date is required for past positions`)
        }
      })
    }

    // Validate skills
    if (data.skills.length === 0) {
      errors.push("At least one skill is required")
    } else {
      data.skills.forEach((skill, index) => {
        if (!skill.skill_category_name.trim()) {
          errors.push(`Skill ${index + 1}: Category is required`)
        }
        if (!skill.skill_name.trim()) {
          errors.push(`Skill ${index + 1}: Skill name is required`)
        }
        if (!skill.skill_proficiency_level.trim()) {
          errors.push(`Skill ${index + 1}: Proficiency level is required`)
        }
      })
    }

    // Validate certifications
    data.certifications.forEach((cert, index) => {
      if (cert.certification_name.trim() || cert.certification_body.trim() || cert.certification_date.trim()) {
        if (!cert.certification_name.trim()) {
          errors.push(`Certification ${index + 1}: Name is required`)
        }
        if (!cert.certification_body.trim()) {
          errors.push(`Certification ${index + 1}: Certification body is required`)
        }
        if (!cert.certification_date.trim()) {
          errors.push(`Certification ${index + 1}: Date is required`)
        }
        // Use optional chaining for expiration_date as it is an optional field
        if (cert.certification_status === "Completed" && !cert.expiration_date?.trim()) {
          errors.push(`Certification ${index + 1}: Expiration date is required for completed certifications`)
        }
      }
    })

    // Validate projects
    data.projects.forEach((project, index) => {
      if (project.proj_name.trim() || project.proj_description.trim() || project.proj_forWhom.trim()) {
        if (!project.proj_name.trim()) {
          errors.push(`Project ${index + 1}: Name is required`)
        }
        if (!project.proj_description.trim()) {
          errors.push(`Project ${index + 1}: Description is required`)
        }
        if (!project.proj_forWhom.trim()) {
          errors.push(`Project ${index + 1}: "For whom" field is required`)
        }
      }
    })

    // Validate references if enabled
    if (hasReferences && data.references && data.references.length > 0) {
      data.references.forEach((ref, index) => {
        if (!ref.full_name.trim()) {
          errors.push(`Reference ${index + 1}: Full name is required`)
        }
        if (!ref.email.trim()) {
          errors.push(`Reference ${index + 1}: Email is required`)
        }
        // Use optional chaining and nullish coalescing for contact and relation as they are optional fields
        if (!(ref.contact?.trim() ?? false)) {
          errors.push(`Reference ${index + 1}: Contact is required`)
        }
        if (!ref.designation.trim()) {
          errors.push(`Reference ${index + 1}: Designation is required`)
        }
        if (!ref.company.trim()) {
          errors.push(`Reference ${index + 1}: Company is required`)
        }
        if (!(ref.relation?.trim() ?? false)) {
          errors.push(`Reference ${index + 1}: Professional relationship is required`)
        }
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  return {
    selectedTemplate,
    selectedPalette,
    savedResumes,
    currentResumeData,
    switchTemplate,
    switchPalette,
    addOrUpdateResume,
    getResumeById,
    deleteResume,
    duplicateResume,
    updateCurrentResume,
    validateResumeData,
    getNewCandidateProfile: () => JSON.parse(JSON.stringify(candidateProfile)),
  }
})