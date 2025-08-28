<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans rounded-lg shadow-md">
    <!-- Removed template selection gallery, now focuses only on form and preview -->
    <div class="lg:col-span-2">
      <div class="mb-6">
        <h1 class="text-3xl font-semibold text-gray-700 mb-2">{{ isEditing ? 'Edit Resume' : 'New Resume Application Form' }}</h1>
        <p class="text-gray-500 max-w-md">Please verify and update your information to complete the application.</p>
        <!-- Added template info display -->
        <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p class="text-sm text-blue-700">
            <span class="font-medium">Selected Template:</span> {{ getTemplateName() }} 
            <button @click="changeTemplate" class="ml-2 text-blue-600 hover:text-blue-800 underline text-sm">
              Change Template
            </button>
          </p>
        </div>
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
                    <input type="checkbox" v-model="edu.is_current_education" @change="e => {
                        updateArrayField('history', 'education_history', index, 'is_current_education', (e.target as HTMLInputElement).checked);
                        if ((e.target as HTMLInputElement).checked) {
                            (formData.history.education_history as any)[index].end_date = null;
                        }
                    }"
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
                    <input type="checkbox" v-model="work.is_current_job" @change="e => {
                        updateArrayField('history', 'work_history', index, 'is_current_job', (e.target as HTMLInputElement).checked);
                        if ((e.target as HTMLInputElement).checked) {
                            (formData.history.work_history as any)[index].end_date = null;
                        }
                    }"
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
                          <input type="text" v-model="project.proj_relevantLink" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
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
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-600">Driving License</label>
                  <input type="text" v-model="formData.personal.driving_license" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Passport</label>
                  <input type="text" v-model="formData.personal.passport" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Visa Status</label>
                  <input type="text" v-model="formData.personal.visa_status" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Security Clearance</label>
                  <input type="text" v-model="formData.personal.security_clearance" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="flex justify-between">
        <button @click="currentStep--" :disabled="currentStep === 1"
                class="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        <button @click="currentStep++" :disabled="currentStep === totalSteps"
                class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>

    <div class="lg:col-span-2">
      <div class="sticky top-4">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Resume Preview</h2>
        <div class="bg-white rounded-lg shadow p-6">
          <!-- Placeholder for Resume Preview -->
          <p class="text-gray-500">Resume preview will be displayed here.</p>
        </div>
        <button @click="resumeStore.saveResume(formData)" class="mt-4 w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          Save Resume
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useResumeStore } from '@/stores/resumeStore'
import { ATS_TEMPLATES } from '@/constants/resumeTemplates'
import type { ResumeData } from '@/types/resume'

const router = useRouter()
const route = useRoute()
const resumeStore = useResumeStore()

const currentStep = ref(1)
const totalSteps = computed(() => 10)
const isEditing = computed(() => !!route.query.id)

// Initialize form data structure
const formData = reactive<ResumeData>({
  personal: {
    first_name: '',
    last_name: '',
    headline: '',
    country: '',
    address_1: '',
    address_2: '',
    city: '',
    state_province_region: '',
    zip_postal_code: '',
    home_office: '',
    geo_location: '',
    school_district: '',
    mobile_phone: '',
    work_phone: '',
    home_phone: '',
    email_0: '',
    email_1: '',
    ssn: '',
    profile_photo_url: ''
  },
  employment: {
    employment_type: '',
    talent_status: '',
    applicant_tags: '',
    details_notes: '',
    industry_experience: '',
    applicant_source: ''
  },
  history: {
    education_history: [{
      institution_name: '',
      degree: '',
      field_of_study: '',
      education_location: '',
      start_date: '',
      end_date: '',
      is_current_education: false,
      degree_image_url: ''
    }],
    work_history: [{
      company_name: '',
      job_title: '',
      job_type: '',
      job_location: '',
      job_description: '',
      start_date: '',
      end_date: '',
      is_current_job: false,
      experience_letter_url: ''
    }]
  },
  online_presence: {
    facebook_profile: '',
    twitter_profile: '',
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
    slack_id: ''
  },
  job_portals: {
    linked_in_profile: '',
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
    fiverr_profile: ''
  },
  version_control: {
    github: '',
    gitlab: '',
    bitbucket: '',
    sourceforge: '',
    codeberg: '',
    gitea: ''
  },
  skills: [{
    skill_category_name: '',
    skill_name: '',
    skill_proficiency_level: '',
    skill_years_of_experience: 0,
    notes: ''
  }],
  certifications: [{
    certification_name: '',
    certification_body: '',
    certification_date: '',
    certification_status: 'Completed',
    expiration_date: '',
    certificate_image_url: ''
  }],
  projects: [{
    proj_name: '',
    proj_description: '',
    proj_date: '',
    proj_relevantLink: '',
    proj_forWhom: ''
  }],
  references: [{
    full_name: '',
    email: '',
    contact: '',
    designation: '',
    company: '',
    relation: ''
  }]
})

function getTemplateName(): string {
  const templateId = resumeStore.selectedTemplate?.id || 'template1'
  const template = ATS_TEMPLATES.find(t => t.id === templateId)
  return template?.name || 'Professional Template'
}

function changeTemplate() {
  router.push({ name: 'TemplateGallery' })
}

function jumpToStep(stepNum: number) {
  currentStep.value = stepNum
}

function getStepName(stepNum: number): string {
  const stepNames = [
    'Personal Info',
    'Employment',
    'Education',
    'Work History',
    'Social Profiles',
    'Skills',
    'Certifications',
    'Projects',
    'References',
    'Additional Info'
  ]
  return stepNames[stepNum - 1] || `Step ${stepNum}`
}

function addRow(section: string, subsection?: string) {
  if (section === 'history' && subsection) {
    if (subsection === 'education_history') {
      formData.history.education_history.push({
        institution_name: '',
        degree: '',
        field_of_study: '',
        education_location: '',
        start_date: '',
        end_date: '',
        is_current_education: false,
        degree_image_url: ''
      })
    } else if (subsection === 'work_history') {
      formData.history.work_history.push({
        company_name: '',
        job_title: '',
        job_type: '',
        job_location: '',
        job_description: '',
        start_date: '',
        end_date: '',
        is_current_job: false,
        experience_letter_url: ''
      })
    }
  } else if (section === 'skills') {
    formData.skills.push({
      skill_category_name: '',
      skill_name: '',
      skill_proficiency_level: '',
      skill_years_of_experience: 0,
      notes: ''
    })
  } else if (section === 'certifications') {
    formData.certifications.push({
      certification_name: '',
      certification_body: '',
      certification_date: '',
      certification_status: 'Completed',
      expiration_date: '',
      certificate_image_url: ''
    })
  } else if (section === 'projects') {
    formData.projects.push({
      proj_name: '',
      proj_description: '',
      proj_date: '',
      proj_relevantLink: '',
      proj_forWhom: ''
    })
  } else if (section === 'references') {
    formData.references.push({
      full_name: '',
      email: '',
      contact: '',
      designation: '',
      company: '',
      relation: ''
    })
  }
}

function removeRow(section: string, index: number, subsection?: string) {
  if (section === 'history' && subsection) {
    if (subsection === 'education_history') {
      formData.history.education_history.splice(index, 1)
    } else if (subsection === 'work_history') {
      formData.history.work_history.splice(index, 1)
    }
  } else if (section === 'skills') {
    formData.skills.splice(index, 1)
  } else if (section === 'certifications') {
    formData.certifications.splice(index, 1)
  } else if (section === 'projects') {
    formData.projects.splice(index, 1)
  } else if (section === 'references') {
    formData.references.splice(index, 1)
  }
}

function updateArrayField(section: string, subsection: string | undefined, index: number, field: string, value: any) {
  if (section === 'history' && subsection) {
    if (subsection === 'education_history') {
      (formData.history.education_history[index] as any)[field] = value
    } else if (subsection === 'work_history') {
      (formData.history.work_history[index] as any)[field] = value
    }
  } else if (section === 'skills') {
    (formData.skills[index] as any)[field] = value
  } else if (section === 'certifications') {
    (formData.certifications[index] as any)[field] = value
  } else if (section === 'projects') {
    (formData.projects[index] as any)[field] = value
  } else if (section === 'references') {
    (formData.references[index] as any)[field] = value
  }
}

function handleFileChange(event: Event, index: number, section: string, field: string) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (section === 'personal') {
        (formData.personal as any)[field] = result
      } else if (section === 'education_history') {
        (formData.history.education_history[index] as any)[field] = result
      } else if (section === 'work_history') {
        (formData.history.work_history[index] as any)[field] = result
      } else if (section === 'certifications') {
        (formData.certifications[index] as any)[field] = result
      }
    }
    reader.readAsDataURL(file)
  }
}

// Load existing resume data if editing
onMounted(() => {
  if (isEditing.value && route.query.id) {
    const existingResume = resumeStore.savedResumes.find(r => r.id === route.query.id)
    if (existingResume) {
      Object.assign(formData, existingResume.data)
    }
  }
})

// Auto-save functionality
watch(formData, () => {
  resumeStore.updateCurrentResume(formData)
}, { deep: true })
</script>
