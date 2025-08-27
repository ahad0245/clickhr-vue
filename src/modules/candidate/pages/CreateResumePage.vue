// src/modules/candidate/pages/CreateResumePage.vue

<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans rounded-lg shadow-md">
    <div v-if="!selectedTemplateId" class="lg:col-span-4">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Create a New Resume</h1>
        <p class="text-gray-600 mb-8">Select a template and a color palette to get started.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="template in templatesList" :key="template.id"
             class="template-card relative group"
             :class="{ 'ring-2 ring-offset-2 ring-blue-500': selectedTemplateIdForGallery === template.id }">
          <div class="template-preview-wrapper">
            <component :is="template.layoutComponent" :resume="mockData" :palette="selectedPalettes[template.id] || COLOR_PALETTES.default" class="resume-preview-component" />
          </div>
          <div v-if="template.hasColorPalette" class="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white shadow-lg flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-full group-hover:translate-y-0 z-10" style="transition: transform 0.3s ease-out, opacity 0.3s ease-out;">
            <div v-for="(palette, key) in COLOR_PALETTES" :key="key"
                 @click.stop="handlePaletteChange(template.id, palette)"
                 :class="['w-6 h-6 rounded-full cursor-pointer border-2 transition-all', {'ring-2 ring-offset-2 ring-blue-500': selectedTemplateIdForGallery === template.id && selectedPalettes[template.id]?.name === palette.name}]"
                 :style="{backgroundColor: palette.background}"
                 :title="palette.name">
            </div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button @click="selectTemplate(template.id)" class="use-template-button">
              Use this template
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="selectedTemplateId" class="lg:col-span-2">
      <div class="mb-6">
        <h1 class="text-3xl font-semibold text-gray-700 mb-2">Talent Application Form</h1>
        <p class="text-gray-500 max-w-md">Please verify and update your information to complete the application.</p>
      </div>
      
      <div class="mb-8 flex flex-wrap justify-center sm:justify-start gap-2">
        <div v-for="stepNum in totalSteps" :key="stepNum"
             @click="currentStep = stepNum" 
             :class="['flex items-center space-x-2 p-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105',
                      currentStep === stepNum ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700',
                      currentStep > stepNum ? 'bg-green-500 text-white' : ''
                     ]">
          <div :class="['w-8 h-8 flex items-center justify-center rounded-full font-bold',
                         currentStep === stepNum ? 'bg-white text-blue-600' : 'bg-gray-300 text-gray-700',
                         currentStep > stepNum ? 'bg-white text-green-500' : ''
                        ]">
            {{ stepNum }}
          </div>
          <span class="hidden lg:inline font-medium" :class="{'text-white': currentStep >= stepNum}">{{ getStepName(stepNum) }}</span>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6 space-y-6 mb-8">
        <transition name="fade" mode="out-in">
          <div :key="currentStep">
            <div v-if="currentStep === 1" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Personal & Contact Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-600">First Name</label>
                  <input type="text" v-model="formData.personal.first_name" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Last Name</label>
                  <input type="text" v-model="formData.personal.last_name" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Headline</label>
                  <input type="text" v-model="formData.personal.headline" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Country</label>
                  <select v-model="formData.personal.country" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                    <option value="">Select Country</option>
                    <option value="United States of America">United States of America</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Address 1</label>
                  <input type="text" v-model="formData.personal.address_1" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Address 2</label>
                  <input type="text" v-model="formData.personal.address_2" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">City</label>
                  <input type="text" v-model="formData.personal.city" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">State/Province/Region</label>
                  <input type="text" v-model="formData.personal.state_province_region" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Zip/Postal Code</label>
                  <input type="text" v-model="formData.personal.zip_postal_code" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Home Office</label>
                  <input type="text" v-model="formData.personal.home_office" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Geo Location</label>
                  <input type="text" v-model="formData.personal.geo_location" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">School District</label>
                  <input type="text" v-model="formData.personal.school_district" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Mobile Phone</label>
                  <input type="text" v-model="formData.personal.mobile_phone" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Work Phone</label>
                  <input type="text" v-model="formData.personal.work_phone" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Home Phone</label>
                  <input type="text" v-model="formData.personal.home_phone" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Primary Email</label>
                  <input type="email" v-model="formData.personal.email_0" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Secondary Email</label>
                  <input type="email" v-model="formData.personal.email_1" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">SSN</label>
                  <input type="text" v-model="formData.personal.ssn" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-600">Profile Photo</label>
                  <input type="file" @change="e => handleProfilePhotoUpload(e)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  <img v-if="formData.personal.profile_photo_url" :src="formData.personal.profile_photo_url as string" class="mt-2 w-24 h-24 object-cover rounded-full" alt="Profile Photo Preview" />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 2" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Employment & Classification</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-600">Employment Type</label>
                  <input type="text" v-model="formData.employment.employment_type" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Talent Status</label>
                  <select v-model="formData.employment.talent_status" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                    <option value="Applicant">Applicant</option>
                    <option value="Candidate">Candidate</option>
                    <option value="Employee">Employee</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Applicant Tags</label>
                  <input type="text" v-model="formData.employment.applicant_tags" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Details / Notes</label>
                  <input type="text" v-model="formData.employment.details_notes" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Industry Experience</label>
                  <input type="text" v-model="formData.employment.industry_experience" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Applicant Source</label>
                  <input type="text" v-model="formData.employment.applicant_source" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 3" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Work History</h2>
              <div class="space-y-4 border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-700 flex justify-between items-center">
                  Work History
                  <button type="button" @click="addRow('history', 'work_history')"
                          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                    Add Work
                  </button>
                </h3>
                <div v-for="(work, index) in formData.history.work_history" :key="index"
                     class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-md relative mb-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Company Name</label>
                    <input type="text" v-model="work.company_name" @input="e => updateArrayField('history', 'work_history', index, 'company_name', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Job Title</label>
                    <input type="text" v-model="work.job_title" @input="e => updateArrayField('history', 'work_history', index, 'job_title', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-4">
                    <label class="block text-sm font-medium text-gray-600">Job Description</label>
                    <textarea v-model="work.job_description" @input="e => updateArrayField('history', 'work_history', index, 'job_description', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Start Date</label>
                    <input type="date" v-model="work.start_date" @input="e => updateArrayField('history', 'work_history', index, 'start_date', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">End Date</label>
                    <input type="date" v-model="work.end_date" @input="e => updateArrayField('history', 'work_history', index, 'end_date', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Job Location</label>
                    <input type="text" v-model="work.job_location" @input="e => updateArrayField('history', 'work_history', index, 'job_location', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="flex items-center space-x-2">
                    <input type="checkbox" v-model="work.is_current_job" @change="e => updateArrayField('history', 'work_history', index, 'is_current_job', (e.target as HTMLInputElement).checked)"
                           class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
                    <label class="text-sm font-medium text-gray-600">Current Job</label>
                  </div>
                  <button v-if="formData.history.work_history.length > 1" type="button" @click="removeRow('history', index, 'work_history')"
                          class="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="currentStep === 4" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Education History</h2>
              <div class="space-y-4 border border-gray-200 rounded-lg p-4 mt-6">
                <h3 class="text-lg font-medium text-gray-700 flex justify-between items-center">
                  Education History
                  <button type="button" @click="addRow('history', 'education_history')"
                          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                    Add Education
                  </button>
                </h3>
                <div v-for="(edu, index) in formData.history.education_history" :key="index"
                     class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-md relative mb-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Institution Name</label>
                    <input type="text" v-model="edu.institution_name" @input="e => updateArrayField('history', 'education_history', index, 'institution_name', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Degree</label>
                    <input type="text" v-model="edu.degree" @input="e => updateArrayField('history', 'education_history', index, 'degree', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Field of Study</label>
                    <input type="text" v-model="edu.field_of_study" @input="e => updateArrayField('history', 'education_history', index, 'field_of_study', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Start Date</label>
                    <input type="date" v-model="edu.start_date" @input="e => updateArrayField('history', 'education_history', index, 'start_date', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">End Date</label>
                    <input type="date" v-model="edu.end_date" @input="e => updateArrayField('history', 'education_history', index, 'end_date', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                   <div class="flex items-center space-x-2">
                    <input type="checkbox" v-model="edu.is_current_education" @change="e => updateArrayField('history', 'education_history', index, 'is_current_education', (e.target as HTMLInputElement).checked)"
                           class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
                    <label class="text-sm font-medium text-gray-600">Currently Enrolled</label>
                  </div>
                  <div v-if="!edu.is_current_education" class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Degree Image (Completed)</label>
                    <input type="file" @change="e => handleDegreeImageUpload(e, index)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                    <img v-if="edu.degree_image_url" :src="edu.degree_image_url as string" class="mt-2 w-32 object-contain" alt="Degree Image Preview" />
                  </div>

                  <button v-if="formData.history.education_history.length > 1" type="button" @click="removeRow('history', index, 'education_history')"
                          class="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="currentStep === 5" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Online Presence</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-600">LinkedIn Profile</label>
                  <input type="text" v-model="formData.online_presence.linkedin" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Personal Site</label>
                  <input type="text" v-model="formData.online_presence.personal_site" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">GitHub Profile</label>
                  <input type="text" v-model="formData.online_presence.github" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Twitter Profile</label>
                  <input type="text" v-model="formData.online_presence.twitter" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 6" class="space-y-6">
                <h2 class="text-xl font-semibold text-gray-700">Certifications</h2>
                <div class="space-y-4 border border-gray-200 rounded-lg p-4 mt-6">
                <h3 class="text-lg font-medium text-gray-700 flex justify-between items-center">
                    Certifications
                    <button type="button" @click="addRow('certifications')"
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                    Add Certification
                    </button>
                </h3>
                <div v-for="(cert, index) in formData.certifications" :key="index"
                        class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-md relative mb-4">
                    <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-600">Name</label>
                    <input type="text" v-model="cert.certification_name" @input="e => updateArrayField('certifications', undefined, index, 'certification_name', (e.target as HTMLInputElement).value)"
                            class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                    </div>
                    <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-600">Body</label>
                    <input type="text" v-model="cert.certification_body" @input="e => updateArrayField('certifications', undefined, index, 'certification_body', (e.target as HTMLInputElement).value)"
                            class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                    </div>
                    <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-600">Date</label>
                    <input type="date" v-model="cert.certification_date" @input="e => updateArrayField('certifications', undefined, index, 'certification_date', (e.target as HTMLInputElement).value)"
                            class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                    </div>
                    <button v-if="formData.certifications.length > 1" type="button" @click="removeRow('certifications', index)"
                            class="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    </button>
                </div>
                </div>
            </div>

            <div v-if="currentStep === 7" class="space-y-6">
                <h2 class="text-xl font-semibold text-gray-700">Additional Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center space-x-2">
                    <input type="checkbox" id="hotlist" v-model="formData.additional.add_to_hotlist" class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
                    <label for="hotlist" class="text-sm font-medium text-gray-600">Add to Hotlist</label>
                </div>
                </div>
                <div class="mt-4">
                <label class="block text-sm font-medium text-gray-600">Resume Text</label>
                <textarea v-model="formData.additional.resume_text" rows="10" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm"></textarea>
                </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="mt-6 flex justify-between">
        <button v-if="currentStep > 1" @click="prevStep"
                class="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors shadow-sm">
          Previous
        </button>
        <div v-else></div>
        <button v-if="currentStep < totalSteps" @click="nextStep"
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md">
          Next
        </button>
        <button v-else @click="submitForm"
                class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-md">
          Save Changes
        </button>
      </div>
    </div>


    
    <div v-if="selectedTemplateId" class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md"> 
      <div class="flex justify-between items-center mb-4 border-b pb-3">
        <h2 class="text-xl font-bold text-gray-800">Applicant Data Preview</h2>
        <div class="flex gap-2">
            <button @click="backToTemplates" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">
              Change Template
            </button>
        </div>
      </div>
      <component :is="currentTemplate" :resume="formData" /> 
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useResumeStore, mockData } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';
import { useRouter, useRoute } from 'vue-router';
import { COLOR_PALETTES } from '@/constants/colorPalettes';
import type { FormData } from '@/types/resume';
import QrcodeVue from 'qrcode.vue';
import { nanoid } from 'nanoid';

const router = useRouter();
const route = useRoute();
const resumeStore = useResumeStore();

// UI State for Template vs. Form view
const selectedTemplateId = ref<string | null>(null);
const selectedTemplateIdForGallery = ref('');
const selectedPalettes = ref({});
const isEditing = ref(false);
const editingResumeId = ref<string | null>(null);

// Form state
const currentStep = ref(1);
const totalSteps = 7;
const formData = ref<FormData>(JSON.parse(JSON.stringify(mockData)));

// Computed properties for template/preview
const templatesList = ATS_TEMPLATES;
const currentTemplate = computed(() => {
  if (!selectedTemplateId.value) return null;
  const selected = templatesList.find(template => template.id === selectedTemplateId.value);
  return selected ? selected.layoutComponent : null;
});

// QR Code state
const showResumeQR = ref(false)
const resumeUrl = computed(() => {
  if (isEditing.value && editingResumeId.value) {
    return `http://localhost:5173/resume/${editingResumeId.value}`;
  }
  return `http://localhost:5173/resume/preview`; // Placeholder for a new resume
});

onMounted(() => {
  if (route.query.id) {
    const resumeToEdit = resumeStore.getResumeById(route.query.id as string);
    if (resumeToEdit) {
      Object.assign(formData.value, resumeToEdit.data);
      selectedTemplateId.value = resumeToEdit.templateId;
      resumeStore.switchTemplate(resumeToEdit.templateId);
      isEditing.value = true;
      editingResumeId.value = resumeToEdit.id;
    } else {
      router.push({ name: 'CreateResume' });
    }
  }
});


// Handlers for template selection
const selectTemplate = (templateId: string) => {
  selectedTemplateId.value = templateId;
  const selectedPalette = selectedPalettes.value[templateId] || COLOR_PALETTES.default;
  resumeStore.switchTemplate(templateId);
  resumeStore.switchPalette(Object.keys(COLOR_PALETTES).find(key => COLOR_PALETTES[key] === selectedPalette) || 'default');
  
  if (!isEditing.value) {
    Object.assign(formData.value, mockData);
  }
};

const backToTemplates = () => {
  selectedTemplateId.value = null;
  currentStep.value = 1;
};

const handlePaletteChange = (templateId: string, palette: any) => {
  selectedTemplateIdForGallery.value = templateId;
  selectedPalettes.value = {
    ...selectedPalettes.value,
    [templateId]: palette,
  };
};

// Form navigation
const getStepName = (step: number) => {
  const names = ['Personal Info', 'Employment', 'Work History', 'Education History', 'Online Presence', 'Certifications', 'Additional Info'];
  return names[step - 1] || '';
};

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

// Form actions
const handleProfilePhotoUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    formData.value.personal.profile_photo_url = e.target?.result;
  };
  reader.readAsDataURL(file);
};

const handleDegreeImageUpload = (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    formData.value.history.education_history[index].degree_image_url = e.target?.result;
  };
  reader.readAsDataURL(file);
};

const addRow = (section: 'history' | 'certifications', field?: 'work_history' | 'education_history') => {
  if (section === 'history') {
    if (field === 'work_history') {
      formData.value.history.work_history.push({ company_name: '', job_title: '', job_description: '', start_date: '', end_date: '', is_current_job: false, job_location: '', job_type: '', job_status: '' });
    } else if (field === 'education_history') {
      formData.value.history.education_history.push({ institution_name: '', degree: '', field_of_study: '', start_date: '', end_date: '', is_current_education: false, education_location: '', education_status: '' });
    }
  } else if (section === 'certifications') {
    formData.value.certifications.push({ certification_name: '', certification_body: '', certification_date: '', expiration_date: '' });
  }
};

const removeRow = (section: 'history' | 'certifications', index: number, field?: 'work_history' | 'education_history') => {
    if (section === 'history' && field) {
        formData.value.history[field].splice(index, 1);
    } else if (section === 'certifications') {
        formData.value.certifications.splice(index, 1);
    }
};

const updateArrayField = (section: 'history' | 'certifications', field: 'work_history' | 'education_history' | undefined, index: number, subField: string, value: any) => {
  if (section === 'history' && field) {
    (formData.value.history[field][index] as any)[subField] = value;
  } else if (section === 'certifications') {
    (formData.value.certifications[index] as any)[subField] = value;
  }
};

const submitForm = () => {
  const resumeId = isEditing.value && editingResumeId.value ? editingResumeId.value : nanoid();
  const resumeTitle = `${formData.value.personal.first_name} ${formData.value.personal.last_name}'s Resume`;

  const newResume = {
    id: resumeId,
    title: resumeTitle,
    templateId: selectedTemplateId.value,
    data: JSON.parse(JSON.stringify(formData.value))
  };

  resumeStore.addOrUpdateResume(newResume);
  alert(`Resume saved successfully with ID: ${newResume.id}`);
  router.push({ name: 'SavedResumes' });
};


const toggleResumeQR = () => {
  showResumeQR.value = !showResumeQR.value;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.template-gallery-container {
  max-width: 1200px;
  margin: 0 auto;
}
.template-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  height: 400px;
}
.template-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.template-preview-wrapper {
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: white;
}
.resume-preview-component {
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: top left;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
}
.use-template-button {
  background-color: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.2s;
  border: none;
}
.use-template-button:hover {
  background-color: #1d4ed8;
}
</style>