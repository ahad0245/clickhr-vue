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
            <component :is="template.layoutComponent" :resume="resumeStore.candidateProfile" :palette="selectedPalettes[template.id] || COLOR_PALETTES.default" class="resume-preview-component" />
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
             @click="jumpToStep(stepNum)"
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
                  <label class="block text-sm font-medium text-gray-600">First Name <span class="text-red-500">*</span></label>
                  <input type="text" v-model="formData.personal.first_name" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Last Name <span class="text-red-500">*</span></label>
                  <input type="text" v-model="formData.personal.last_name" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Headline <span class="text-red-500">*</span></label>
                  <input type="text" v-model="formData.personal.headline" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required/>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Country <span class="text-red-500">*</span></label>
                  <select v-model="formData.personal.country" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                    <option value="">Select Country</option>
                    <option value="United States of America">United States of America</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Address 1 <span class="text-red-500">*</span></label>
                  <input type="text" v-model="formData.personal.address_1" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Address 2</label>
                  <input type="text" v-model="formData.personal.address_2" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">City <span class="text-red-500">*</span></label>
                  <input type="text" v-model="formData.personal.city" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
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
                  <label class="block text-sm font-medium text-gray-600">Mobile Phone <span class="text-red-500">*</span></label>
                  <input type="text" v-model="formData.personal.mobile_phone" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
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
                  <label class="block text-sm font-medium text-gray-600">Primary Email <span class="text-red-500">*</span></label>
                  <input type="email" v-model="formData.personal.email_0" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
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
                  <label class="block text-sm font-medium text-gray-600">Profile Photo <span class="text-red-500">*</span></label>
                  <input type="file" @change="e => handleFileChange(e, -1, 'personal', 'profile_photo_url')" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  <img v-if="formData.personal.profile_photo_url" :src="formData.personal.profile_photo_url as string" class="mt-2 w-24 h-24 object-cover rounded-full" alt="Profile Photo Preview" />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 2" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Employment & Classification</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-600">Employment Type <span class="text-red-500">*</span></label>
                  <select v-model="formData.employment.employment_type" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                      <option value="">Select Employment Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Talent Status <span class="text-red-500">*</span></label>
                  <select v-model="formData.employment.talent_status" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                    <option value="">Select Talent Status</option>
                    <option value="Active">Active</option>
                    <option value="Applicant">Applicant</option>
                    <option value="Deleted">Deleted</option>
                    <option value="DNA">DNA</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Incomplete Applicant">Incomplete Applicant</option>
                    <option value="Online Applicant">Online Applicant</option>
                    <option value="Pending">Pending</option>
                    <option value="Terminated">Terminated</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Applicant Tags <span class="text-red-500">*</span></label>
                  <input type="text" v-model="formData.employment.applicant_tags" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
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
                    <label class="block text-sm font-medium text-gray-600">Institution Name <span class="text-red-500">*</span></label>
                    <input type="text" v-model="edu.institution_name" @input="e => updateArrayField('history', 'education_history', index, 'institution_name', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Degree <span class="text-red-500">*</span></label>
                    <input type="text" v-model="edu.degree" @input="e => updateArrayField('history', 'education_history', index, 'degree', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Field of Study <span class="text-red-500">*</span></label>
                    <input type="text" v-model="edu.field_of_study" @input="e => updateArrayField('history', 'education_history', index, 'field_of_study', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Education Location <span class="text-red-500">*</span></label>
                    <input type="text" v-model="edu.education_location" @input="e => updateArrayField('history', 'education_history', index, 'education_location', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Start Date <span class="text-red-500">*</span></label>
                    <input type="date" v-model="edu.start_date" @input="e => updateArrayField('history', 'education_history', index, 'start_date', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div v-if="!edu.is_current_education">
                    <label class="block text-sm font-medium text-gray-600">End Date <span class="text-red-500">*</span></label>
                    <input type="date" v-model="edu.end_date" @input="e => updateArrayField('history', 'education_history', index, 'end_date', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                   <div class="flex items-center space-x-2">
                    <input type="checkbox" v-model="edu.is_current_education" @change="e => updateArrayField('history', 'education_history', index, 'is_current_education', (e.target as HTMLInputElement).checked)"
                           class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
                    <label class="text-sm font-medium text-gray-600">Currently Enrolled</label>
                  </div>
                  <div v-if="!edu.is_current_education" class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Degree Image <span class="text-red-500">*</span></label>
                    <input type="file" @change="e => handleFileChange(e, index, 'education_history', 'degree_image_url')" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
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

            <div v-if="currentStep === 4" class="space-y-6">
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
                    <label class="block text-sm font-medium text-gray-600">Company Name <span class="text-red-500">*</span></label>
                    <input type="text" v-model="work.company_name" @input="e => updateArrayField('history', 'work_history', index, 'company_name', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Job Title <span class="text-red-500">*</span></label>
                    <input type="text" v-model="work.job_title" @input="e => updateArrayField('history', 'work_history', index, 'job_title', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Job Type <span class="text-red-500">*</span></label>
                    <select v-model="work.job_type" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                      <option value="">Select Job Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Job Location <span class="text-red-500">*</span></label>
                    <input type="text" v-model="work.job_location" @input="e => updateArrayField('history', 'work_history', index, 'job_location', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div class="md:col-span-4">
                    <label class="block text-sm font-medium text-gray-600">Job Description</label>
                    <textarea v-model="work.job_description" @input="e => updateArrayField('history', 'work_history', index, 'job_description', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Start Date <span class="text-red-500">*</span></label>
                    <input type="date" v-model="work.start_date" @input="e => updateArrayField('history', 'work_history', index, 'start_date', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div v-if="!work.is_current_job">
                    <label class="block text-sm font-medium text-gray-600">End Date <span class="text-red-500">*</span></label>
                    <input type="date" v-model="work.end_date" @input="e => updateArrayField('history', 'work_history', index, 'end_date', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div v-if="!work.is_current_job">
                      <label class="block text-sm font-medium text-gray-600">Experience Letter <span class="text-red-500">*</span></label>
                      <input type="file" @change="e => handleFileChange(e, index, 'work_history', 'experience_letter_url')" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
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

            <div v-if="currentStep === 5" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Social Media & Version Control Profiles</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <h3 class="text-lg font-medium text-gray-700 mb-2">Social Media Profiles</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-600">Facebook Profile</label>
                        <input type="text" v-model="formData.online_presence.facebook_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">Twitter Profile</label>
                        <input type="text" v-model="formData.online_presence.twitter_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">Instagram Profile</label>
                        <input type="text" v-model="formData.online_presence.instagram_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">YouTube Profile</label>
                        <input type="text" v-model="formData.online_presence.youtube_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">TikTok Profile</label>
                        <input type="text" v-model="formData.online_presence.tiktok_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">Pinterest Profile</label>
                        <input type="text" v-model="formData.online_presence.pinterest_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">Skype ID</label>
                        <input type="text" v-model="formData.online_presence.skype_id" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">WhatsApp Number</label>
                        <input type="text" v-model="formData.online_presence.whatsapp_number" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">WeChat ID</label>
                        <input type="text" v-model="formData.online_presence.wechat_id" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">Viber ID</label>
                        <input type="text" v-model="formData.online_presence.viber_id" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">Signal ID</label>
                        <input type="text" v-model="formData.online_presence.signal_id" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">Telegram ID</label>
                        <input type="text" v-model="formData.online_presence.telegram_id" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">Discord ID</label>
                        <input type="text" v-model="formData.online_presence.discord_id" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-600">Slack ID</label>
                        <input type="text" v-model="formData.online_presence.slack_id" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                  </div>
                </div>

                <div class="md:col-span-2 mt-4">
                    <h3 class="text-lg font-medium text-gray-700 mb-2">Job Portal Profiles</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-600">LinkedIn Profile</label>
                            <input type="text" v-model="formData.job_portals.linked_in_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">Indeed Profile</label>
                            <input type="text" v-model="formData.job_portals.indeed_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">Monster Profile</label>
                            <input type="text" v-model="formData.job_portals.monster_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">Glassdoor Profile</label>
                            <input type="text" v-model="formData.job_portals.glassdoor_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">ZipRecruiter Profile</label>
                            <input type="text" v-model="formData.job_portals.zip_recruiter_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">CareerBuilder Profile</label>
                            <input type="text" v-model="formData.job_portals.career_builder_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">SimplyHired Profile</label>
                            <input type="text" v-model="formData.job_portals.simply_hired_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">Upwork Profile</label>
                            <input type="text" v-model="formData.job_portals.upwork_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">Freelancer Profile</label>
                            <input type="text" v-model="formData.job_portals.freelancer_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">Guru Profile</label>
                            <input type="text" v-model="formData.job_portals.guru_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">PeoplePerHour Profile</label>
                            <input type="text" v-model="formData.job_portals.people_per_hour_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">Fiverr Profile</label>
                            <input type="text" v-model="formData.job_portals.fiverr_profile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                    </div>
                </div>

                <div class="md:col-span-2 mt-4">
                    <h3 class="text-lg font-medium text-gray-700 mb-2">Version Control Profiles</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-600">GitHub Profile</label>
                            <input type="text" v-model="formData.version_control.github" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">GitLab Profile</label>
                            <input type="text" v-model="formData.version_control.gitlab" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">Bitbucket Profile</label>
                            <input type="text" v-model="formData.version_control.bitbucket" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">SourceForge Profile</label>
                            <input type="text" v-model="formData.version_control.sourceforge" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">Codeberg Profile</label>
                            <input type="text" v-model="formData.version_control.codeberg" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600">Gitea Profile</label>
                            <input type="text" v-model="formData.version_control.gitea" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                    </div>
                </div>
              </div>
            </div>

            <div v-if="currentStep === 6" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Skills</h2>
              <div class="space-y-4 border border-gray-200 rounded-lg p-4 mt-6">
                <h3 class="text-lg font-medium text-gray-700 flex justify-between items-center">
                    Skills
                    <button type="button" @click="addRow('skills')"
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                    Add Skill
                    </button>
                </h3>
                <div v-for="(skill, index) in formData.skills" :key="index"
                        class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-md relative mb-4">
                      <div>
                          <label class="block text-sm font-medium text-gray-600">Category <span class="text-red-500">*</span></label>
                          <input type="text" v-model="skill.skill_category_name" @input="e => updateArrayField('skills', undefined, index, 'skill_category_name', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                      </div>
                      <div>
                          <label class="block text-sm font-medium text-gray-600">Skill Name <span class="text-red-500">*</span></label>
                          <input type="text" v-model="skill.skill_name" @input="e => updateArrayField('skills', undefined, index, 'skill_name', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                      </div>
                      <div>
                          <label class="block text-sm font-medium text-gray-600">Proficiency Level <span class="text-red-500">*</span></label>
                          <input type="text" v-model="skill.skill_proficiency_level" @input="e => updateArrayField('skills', undefined, index, 'skill_proficiency_level', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                      </div>
                      <div>
                          <label class="block text-sm font-medium text-gray-600">Years of Experience</label>
                          <input type="number" v-model="skill.skill_years_of_experience" @input="e => updateArrayField('skills', undefined, index, 'skill_years_of_experience', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                          <label class="block text-sm font-medium text-gray-600">Notes</label>
                          <input type="text" v-model="skill.notes" @input="e => updateArrayField('skills', undefined, index, 'notes', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <button v-if="formData.skills.length > 1" type="button" @click="removeRow('skills', index)" class="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                      </button>
                  </div>
              </div>
            </div>

            <div v-if="currentStep === 7" class="space-y-6">
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
                    <label class="block text-sm font-medium text-gray-600">Name <span class="text-red-500">*</span></label>
                    <input type="text" v-model="cert.certification_name" @input="e => updateArrayField('certifications', undefined, index, 'certification_name', (e.target as HTMLInputElement).value)"
                            class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                    </div>
                    <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-600">Body <span class="text-red-500">*</span></label>
                    <input type="text" v-model="cert.certification_body" @input="e => updateArrayField('certifications', undefined, index, 'certification_body', (e.target as HTMLInputElement).value)"
                            class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                    </div>
                    <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-600">Date <span class="text-red-500">*</span></label>
                    <input type="date" v-model="cert.certification_date" @input="e => updateArrayField('certifications', undefined, index, 'certification_date', (e.target as HTMLInputElement).value)"
                            class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                    </div>
                    <div class="md:col-span-1">
                      <label class="block text-sm font-medium text-gray-600">Status <span class="text-red-500">*</span></label>
                      <select v-model="cert.certification_status" @change="e => updateArrayField('certifications', undefined, index, 'certification_status', (e.target as HTMLSelectElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                          <option value="Completed">Completed</option>
                          <option value="In Progress">In Progress</option>
                      </select>
                    </div>
                    <div v-if="cert.certification_status === 'Completed'" class="md:col-span-1">
                        <label class="block text-sm font-medium text-gray-600">Expiration Date <span class="text-red-500">*</span></label>
                        <input type="date" v-model="cert.expiration_date" @input="e => updateArrayField('certifications', undefined, index, 'expiration_date', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required/>
                    </div>
                    <div v-if="cert.certification_status === 'Completed'" class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-600">Certificate Picture <span class="text-red-500">*</span></label>
                        <input type="file" @change="e => handleFileChange(e, index, 'certifications', 'certificate_image_url')" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required/>
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

            <div v-if="currentStep === 8" class="space-y-6">
                <h2 class="text-xl font-semibold text-gray-700">Projects</h2>
                <div class="space-y-4 border border-gray-200 rounded-lg p-4 mt-6">
                  <h3 class="text-lg font-medium text-gray-700 flex justify-between items-center">
                    Projects
                    <button type="button" @click="addRow('projects')"
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                    Add Project
                    </button>
                  </h3>
                  <div v-for="(project, index) in formData.projects" :key="index"
                        class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-md relative mb-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-600">Project Name <span class="text-red-500">*</span></label>
                          <input type="text" v-model="project.proj_name" @input="e => updateArrayField('projects', undefined, index, 'proj_name', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-600">Description <span class="text-red-500">*</span></label>
                          <input type="text" v-model="project.proj_description" @input="e => updateArrayField('projects', undefined, index, 'proj_description', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-600">Date</label>
                          <input type="date" v-model="project.proj_date" @input="e => updateArrayField('projects', undefined, index, 'proj_date', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-600">Relevant Link</label>
                          <input type="text" v-model="project.proj_relevantLink" @input="e => updateArrayField('projects', undefined, index, 'proj_relevantLink', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-600">For Whom <span class="text-red-500">*</span></label>
                          <input type="text" v-model="project.proj_forWhom" @input="e => updateArrayField('projects', undefined, index, 'proj_forWhom', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                        </div>
                        <button v-if="formData.projects.length > 1" type="button" @click="removeRow('projects', index)" class="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                        </button>
                  </div>
                </div>
            </div>

            <div v-if="currentStep === 9" class="space-y-6">
                <h2 class="text-xl font-semibold text-gray-700">References</h2>
                 <div class="space-y-4 border border-gray-200 rounded-lg p-4 mt-6">
                  <h3 class="text-lg font-medium text-gray-700 flex justify-between items-center">
                    References
                    <button type="button" @click="addRow('references')"
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                    Add Reference
                    </button>
                  </h3>
                   <div v-for="(ref, index) in formData.references" :key="index"
                        class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-md relative mb-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-600">Full Name <span class="text-red-500">*</span></label>
                          <input type="text" v-model="ref.full_name" @input="e => updateArrayField('references', undefined, index, 'full_name', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-600">Email <span class="text-red-500">*</span></label>
                          <input type="email" v-model="ref.email" @input="e => updateArrayField('references', undefined, index, 'email', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-600">Contact</label>
                          <input type="text" v-model="ref.contact" @input="e => updateArrayField('references', undefined, index, 'contact', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-600">Designation <span class="text-red-500">*</span></label>
                          <input type="text" v-model="ref.designation" @input="e => updateArrayField('references', undefined, index, 'designation', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-600">Company <span class="text-red-500">*</span></label>
                          <input type="text" v-model="ref.company" @input="e => updateArrayField('references', undefined, index, 'company', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-600">Relation</label>
                          <input type="text" v-model="ref.relation" @input="e => updateArrayField('references', undefined, index, 'relation', (e.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        </div>
                        <button v-if="formData.references.length > 1" type="button" @click="removeRow('references', index)" class="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                        </button>
                   </div>
                 </div>
            </div>

            <div v-if="currentStep === 10" class="space-y-6">
                <h2 class="text-xl font-semibold text-gray-700">Additional Information</h2>
                
                <div class="space-y-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Resume Title <span class="text-red-500">*</span></label>
                    <input type="text" v-model="resumeName" placeholder="e.g., Senior Vue.js Resume" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
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
        <div v-if="validationError" class="mt-4 text-red-500 text-sm">
          {{ validationError }}
        </div>
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
            <button @click="downloadResume" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                Download Resume
            </button>
            <button @click="backToTemplates" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">
              Change Template
            </button>
        </div>
      </div>
      <component :is="currentTemplate" :resume="formData" />
      <div class="mt-4 p-4 border rounded">
      <h3>Resume Access</h3>
      <button @click="toggleResumeQR" class="px-4 py-2 bg-blue-600 text-white rounded">
      {{ showResumeQR ? 'Hide Resume QR' : 'Show Resume QR & Link' }}
      </button>


      <div v-if="showResumeQR" class="mt-3">
      <p>
      Resume Link:
      <a :href="resumeUrl" target="_blank" class="text-blue-500 underline">
      {{ resumeUrl }}
      </a>
      </p>
      <qrcode-vue :value="resumeUrl" :size="150" class="mt-2" />
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useResumeStore, candidateProfile } from '@/stores/resumeStore';
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
const resumeName = ref('');
const validationError = ref('');

// Form state
const currentStep = ref(1);
const totalSteps = 10;
const formData = ref<FormData>(JSON.parse(JSON.stringify({
  ...candidateProfile,
  history: {
    work_history: [],
    education_history: [],
  },
  online_presence: {},
  certifications: [],
  skills: [],
  projects: [],
  references: [],
  job_portals: {},
  version_control: {},
})));

// Computed properties for template/preview
const templatesList = ATS_TEMPLATES;
const currentTemplate = computed(() => {
  if (!selectedTemplateId.value) return null;
  const selected = templatesList.find(template => template.id === selectedTemplateId.value);
  return selected ? selected.layoutComponent : null;
});

// Auto-save logic
watch(formData, (newVal) => {
  if (selectedTemplateId.value) {
    const resumeToUpdate = {
      id: editingResumeId.value || nanoid(),
      title: resumeName.value || 'Untitled Resume',
      templateId: selectedTemplateId.value,
      data: newVal
    };
    resumeStore.addOrUpdateResume(resumeToUpdate);
  }
}, { deep: true, immediate: true });


// Progress indicator
const progress = computed(() => {
  const filledFields = countFilledFields(formData.value);
  const totalFields = countTotalFields(formData.value);
  return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
});

function countFilledFields(data: any): number {
  let count = 0;
  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((item: any) => {
        for (const subKey in item) {
          if (item[subKey] && item[subKey] !== '' && item[subKey] !== null) {
            count++;
          }
        }
      });
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      count += countFilledFields(data[key]);
    } else if (data[key] && data[key] !== '' && data[key] !== null) {
      count++;
    }
  }
  return count;
}

function countTotalFields(data: any): number {
  let count = 0;
  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((item: any) => {
        for (const subKey in item) {
          count++;
        }
      });
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      count += countTotalFields(data[key]);
    } else {
      count++;
    }
  }
  return count;
}


// QR Code state
const showResumeQR = ref(false)
const resumeUrl = computed(() => {
  if (isEditing.value && editingResumeId.value) {
    return `http://localhost:5173/resume-preview/${editingResumeId.value}`;
  }
  return `http://localhost:5173/resume-preview/new`; // Placeholder for a new resume
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
      resumeName.value = resumeToEdit.title;
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
    Object.assign(formData.value, JSON.parse(JSON.stringify(candidateProfile)));
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
  const names = ['Personal Info', 'Employment', 'Education History', 'Work History', 'Social & Dev Profiles', 'Skills', 'Certifications', 'Projects', 'References', 'Additional Info'];
  return names[step - 1] || '';
};

const nextStep = () => {
  if (validateCurrentStep()) {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
      validationError.value = '';
    }
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    validationError.value = '';
  }
};

// Form actions
const handleFileChange = (e: Event, index: number, section: 'work_history' | 'education_history' | 'certifications' | 'personal', field: string) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    if (section === 'personal') {
      (formData.value.personal as any)[field] = event.target?.result;
    } else if (section === 'work_history' || section === 'education_history') {
      (formData.value.history as any)[section][index][field] = event.target?.result;
    } else if (section === 'certifications') {
      (formData.value.certifications[index] as any)[field] = event.target?.result;
    }
  };
  reader.readAsDataURL(file);
};

const addRow = (section: 'skills' | 'projects' | 'references' | 'certifications' | 'history', field?: 'work_history' | 'education_history') => {
  if (section === 'skills') {
      formData.value.skills.push({ skill_category_name: '', skill_name: '', skill_proficiency_level: '', skill_years_of_experience: null, notes: '' });
  } else if (section === 'projects') {
      formData.value.projects.push({ proj_name: '', proj_description: '', proj_date: '', proj_forWhom: '', proj_relevantLink: '' });
  } else if (section === 'references') {
      formData.value.references.push({ full_name: '', email: '', designation: '', company: '', contact: '', relation: '' });
  } else if (section === 'certifications') {
    formData.value.certifications.push({ certification_name: '', certification_body: '', certification_date: '', expiration_date: '', certification_status: 'Completed', certificate_image_url: null });
  } else if (section === 'history') {
    if (field === 'work_history') {
      formData.value.history.work_history.push({ company_name: '', job_title: '', job_description: '', start_date: '', end_date: '', is_current_job: false, job_location: '', job_type: '', job_status: '', experience_letter_url: null });
    } else if (field === 'education_history') {
      formData.value.history.education_history.push({ institution_name: '', degree: '', field_of_study: '', start_date: '', end_date: '', is_current_education: false, education_location: '', education_status: '', degree_image_url: null });
    }
  }
};

const removeRow = (section: 'skills' | 'projects' | 'references' | 'certifications' | 'history', index: number, field?: 'work_history' | 'education_history') => {
  if (section === 'skills') {
      formData.value.skills.splice(index, 1);
  } else if (section === 'projects') {
      formData.value.projects.splice(index, 1);
  } else if (section === 'references') {
      formData.value.references.splice(index, 1);
  } else if (section === 'certifications') {
      formData.value.certifications.splice(index, 1);
  } else if (section === 'history' && field) {
      formData.value.history[field].splice(index, 1);
  }
};

const updateArrayField = (section: string, field: string | undefined, index: number, subField: string, value: any) => {
  if (section === 'history' && field) {
    (formData.value.history as any)[field][index][subField] = value;
  } else if (section === 'certifications') {
    (formData.value.certifications[index] as any)[subField] = value;
  } else if (section === 'skills') {
    (formData.value.skills[index] as any)[subField] = value;
  } else if (section === 'projects') {
    (formData.value.projects[index] as any)[subField] = value;
  } else if (section === 'references') {
    (formData.value.references[index] as any)[subField] = value;
  } else if (section === 'online_presence') {
    (formData.value.online_presence as any)[subField] = value;
  } else if (section === 'job_portals') {
    (formData.value.job_portals as any)[subField] = value;
  } else if (section === 'version_control') {
    (formData.value.version_control as any)[subField] = value;
  }
};

const validateCurrentStep = () => {
  validationError.value = '';
  switch (currentStep.value) {
    case 1:
      if (!formData.value.personal.first_name || !formData.value.personal.last_name || !formData.value.personal.email_0 || !formData.value.personal.mobile_phone || !formData.value.personal.country || !formData.value.personal.address_1 || !formData.value.personal.city || !formData.value.personal.headline || !formData.value.personal.profile_photo_url) {
        validationError.value = 'Please fill out all mandatory fields in this step.';
        return false;
      }
      break;
    case 2:
      if (!formData.value.employment.talent_status || !formData.value.employment.applicant_tags || !formData.value.employment.employment_type) {
        validationError.value = 'Please fill out all mandatory fields in this step.';
        return false;
      }
      break;
    case 3:
      if (formData.value.history.education_history.length === 0) {
        validationError.value = 'Please add at least one education history entry.';
        return false;
      }
      for (const edu of formData.value.history.education_history) {
        if (!edu.institution_name || !edu.degree || !edu.field_of_study || !edu.start_date || !edu.education_location || (!edu.is_current_education && (!edu.end_date || !edu.degree_image_url))) {
          validationError.value = 'All education history entries must have a school, degree, field of study, start date, education location, and end date/degree image (if not currently enrolled).';
          return false;
        }
      }
      break;
    case 4:
      if (formData.value.history.work_history.length === 0) {
        validationError.value = 'Please add at least one work history entry.';
        return false;
      }
      for (const job of formData.value.history.work_history) {
        if (!job.company_name || !job.job_title || !job.start_date || !job.job_location || !job.job_type || (!job.is_current_job && (!job.end_date || !job.experience_letter_url))) {
          validationError.value = 'All work history entries must have a company, job title, start date, job location, job type, and end date/experience letter (if not a current job).';
          return false;
        }
      }
      break;
    case 5:
      // No mandatory fields for Social & Dev Profiles
      break;
    case 6:
      if (formData.value.skills.length === 0) {
        validationError.value = 'Please add at least one skill entry.';
        return false;
      }
      for (const skill of formData.value.skills) {
        if (!skill.skill_category_name || !skill.skill_name || !skill.skill_proficiency_level) {
          validationError.value = 'All skill entries must have a category, name, and proficiency level.';
          return false;
        }
      }
      break;
    case 7:
      if (formData.value.certifications.length === 0) {
        validationError.value = 'Please add at least one certification entry.';
        return false;
      }
      for (const cert of formData.value.certifications) {
        if (!cert.certification_name || !cert.certification_body || !cert.certification_date || (!cert.certification_status === 'In Progress' && !cert.expiration_date) || (cert.certification_status === 'Completed' && !cert.certificate_image_url)) {
          validationError.value = 'All certification entries must have a name, body, date, and status. Expiration date is required if not in progress. Certificate picture is required if completed.';
          return false;
        }
      }
      break;
    case 8:
      if (formData.value.projects.length === 0) {
        validationError.value = 'Please add at least one project entry.';
        return false;
      }
      for (const project of formData.value.projects) {
        if (!project.proj_name || !project.proj_description || !project.proj_forWhom) {
          validationError.value = 'All project entries must have a name, description, and "for whom" field.';
          return false;
        }
      }
      break;
    case 9:
      if (formData.value.references.length === 0) {
        validationError.value = 'Please add at least one reference entry.';
        return false;
      }
      for (const ref of formData.value.references) {
        if (!ref.full_name || !ref.email || !ref.designation || !ref.company) {
          validationError.value = 'All reference entries must have a full name, email, designation, and company.';
          return false;
        }
      }
      break;
    case 10:
      if (!resumeName.value) {
        validationError.value = 'Please give your resume a name.';
        return false;
      }
      break;
  }
  return true;
};

const submitForm = () => {
  if (!validateCurrentStep()) return;

  const resumeId = isEditing.value && editingResumeId.value ? editingResumeId.value : nanoid();
  const titleToSave = resumeName.value || `${formData.value.personal.first_name} ${formData.value.personal.last_name}'s Resume`;

  const newResume = {
    id: resumeId,
    title: titleToSave,
    templateId: selectedTemplateId.value as string,
    data: JSON.parse(JSON.stringify(formData.value))
  };

  resumeStore.addOrUpdateResume(newResume);
  alert(`Resume saved successfully with ID: ${newResume.id}`);
  router.push({ name: 'SavedResumes' });
};

const downloadResume = () => {
  console.log("Download button clicked. Initiating resume download.");
  alert('Downloading resume...');
};

const toggleResumeQR = () => {
  showResumeQR.value = !showResumeQR.value;
};

const jumpToStep = (step: number) => {
  if (validateCurrentStep()) {
    currentStep.value = step;
    validationError.value = '';
  }
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