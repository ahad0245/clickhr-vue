<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans rounded-lg shadow-md">
    <div class="lg:col-span-2">
      <div class="mb-6">
        <h1 class="text-3xl font-semibold text-gray-700 mb-2">Talent Application Form</h1>
        <p class="text-gray-500 max-w-md">Please verify and update your information to complete the application.</p>
      </div>

      <div class="mb-8 flex justify-center space-x-2"> 
        <div v-for="stepNum in totalSteps" :key="stepNum"
             @click="currentStep = stepNum"
             :class="{
               'flex items-center space-x-1 p-1 rounded-full cursor-pointer transition-all duration-300': true, 
               'bg-blue-500 text-white shadow-lg': currentStep === stepNum,
               'bg-gray-200 text-gray-600': currentStep > stepNum ? 'bg-green-500' : 'bg-gray-200'
             }">
          <div :class="{
                 'w-6 h-6 flex items-center justify-center rounded-full font-bold text-sm': true, 
                 'bg-white text-blue-500': currentStep === stepNum,
                 'bg-white text-green-500': currentStep > stepNum
               }">
            {{ stepNum }}
          </div>
          <span class="hidden lg:inline text-sm" :class="{'text-white': currentStep === stepNum}">{{ getStepName(stepNum) }}</span> 
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
                  <input type="text" v-model="formData.personal.firstName" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Last Name</label>
                  <input type="text" v-model="formData.personal.lastName" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
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
                  <input type="text" v-model="formData.personal.address1" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Address 2</label>
                  <input type="text" v-model="formData.personal.address2" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">City</label>
                  <input type="text" v-model="formData.personal.city" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">State/Province/Region</label>
                  <input type="text" v-model="formData.personal.state" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Zip/Postal Code</label>
                  <input type="text" v-model="formData.personal.zipCode" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Home Office</label>
                  <input type="text" v-model="formData.personal.homeOffice" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Geo Location</label>
                  <input type="text" v-model="formData.personal.geoLocation" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">School District</label>
                  <input type="text" v-model="formData.personal.schoolDistrict" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Mobile Phone</label>
                  <input type="text" v-model="formData.personal.mobilePhone" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Work Phone</label>
                  <input type="text" v-model="formData.personal.workPhone" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Home Phone</label>
                  <input type="text" v-model="formData.personal.homePhone" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Primary Email</label>
                  <input type="email" v-model="formData.personal.email1" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Secondary Email</label>
                  <input type="email" v-model="formData.personal.email2" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">SSN</label>
                  <input type="text" v-model="formData.personal.ssn" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 2" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Employment & Classification</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-600">Employment Type</label>
                  <input type="text" v-model="formData.employment.employmentType" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Talent Status</label>
                  <select v-model="formData.employment.talentStatus" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                    <option value="Applicant">Applicant</option>
                    <option value="Candidate">Candidate</option>
                    <option value="Employee">Employee</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Position Category</label>
                  <select v-model="formData.employment.positionCategory" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                    <option value="Nothing selected">Nothing selected</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="UX Designer">UX Designer</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Skill Set</label>
                  <input type="text" v-model="formData.employment.skillSet" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Applicant Tags</label>
                  <input type="text" v-model="formData.employment.applicantTags" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Details</label>
                  <input type="text" v-model="formData.employment.detailsNotes" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Industry Experience</label>
                  <input type="text" v-model="formData.employment.industryExperience" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Applicant Source</label>
                  <input type="text" v-model="formData.employment.applicantSource" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 3" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Work History</h2>
              <div class="space-y-4 border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-700 flex justify-between items-center">
                  Work History
                  <button type="button" @click="addRow('history', 'workHistory')"
                          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                    Add Work
                  </button>
                </h3>
                <div v-for="(work, index) in formData.history.workHistory" :key="index"
                     class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-md relative mb-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Company Name</label>
                    <input type="text" v-model="work.companyName" @input="e => updateArrayField('history', 'workHistory', index, 'companyName', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Job Title</label>
                    <input type="text" v-model="work.jobTitle" @input="e => updateArrayField('history', 'workHistory', index, 'jobTitle', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-4">
                    <label class="block text-sm font-medium text-gray-600">Job Description</label>
                    <textarea v-model="work.jobDescription" @input="e => updateArrayField('history', 'workHistory', index, 'jobDescription', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Start Date</label>
                    <input type="date" v-model="work.startDate" @input="e => updateArrayField('history', 'workHistory', index, 'startDate', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">End Date</label>
                    <input type="date" v-model="work.endDate" @input="e => updateArrayField('history', 'workHistory', index, 'endDate', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Job Location</label>
                    <input type="text" v-model="work.jobLocation" @input="e => updateArrayField('history', 'workHistory', index, 'jobLocation', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="flex items-center space-x-2">
                    <input type="checkbox" v-model="work.isCurrentJob" @change="e => updateArrayField('history', 'workHistory', index, 'isCurrentJob', (e.target as HTMLInputElement).checked)"
                           class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
                    <label class="text-sm font-medium text-gray-600">Current Job</label>
                  </div>
                  <button v-if="formData.history.workHistory.length > 1" type="button" @click="removeRow('history', 'workHistory', index)"
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
                  <button type="button" @click="addRow('history', 'educationHistory')"
                          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                    Add Education
                  </button>
                </h3>
                <div v-for="(edu, index) in formData.history.educationHistory" :key="index"
                     class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-md relative mb-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Institution Name</label>
                    <input type="text" v-model="edu.institutionName" @input="e => updateArrayField('history', 'educationHistory', index, 'institutionName', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Degree</label>
                    <input type="text" v-model="edu.degree" @input="e => updateArrayField('history', 'educationHistory', index, 'degree', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-600">Field of Study</label>
                    <input type="text" v-model="edu.fieldOfStudy" @input="e => updateArrayField('history', 'educationHistory', index, 'fieldOfStudy', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">Start Date</label>
                    <input type="date" v-model="edu.startDate" @input="e => updateArrayField('history', 'educationHistory', index, 'startDate', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">End Date</label>
                    <input type="date" v-model="edu.endDate" @input="e => updateArrayField('history', 'educationHistory', index, 'endDate', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                   <div class="flex items-center space-x-2">
                    <input type="checkbox" v-model="edu.isCurrentEducation" @change="e => updateArrayField('history', 'educationHistory', index, 'isCurrentEducation', (e.target as HTMLInputElement).checked)"
                           class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
                    <label class="text-sm font-medium text-gray-600">Currently Enrolled</label>
                  </div>
                  <button v-if="formData.history.educationHistory.length > 1" type="button" @click="removeRow('history', 'educationHistory', index)"
                          class="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="currentStep === 5" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Online Presence & Certifications</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-600">LinkedIn Profile</label>
                  <input type="text" v-model="formData.onlinePresence.linkedInProfile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Personal Site</label>
                  <input type="text" v-model="formData.onlinePresence.personalSite" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">GitHub Profile</label>
                  <input type="text" v-model="formData.onlinePresence.github" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Twitter Profile</label>
                  <input type="text" v-model="formData.onlinePresence.twitterProfile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
              </div>
              
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
                    <input type="text" v-model="cert.certificationName" @input="e => updateArrayField('certifications', index, 'certificationName', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-600">Body</label>
                    <input type="text" v-model="cert.certificationBody" @input="e => updateArrayField('certifications', index, 'certificationBody', (e.target as HTMLInputElement).value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-600">Date</label>
                    <input type="date" v-model="cert.certificationDate" @input="e => updateArrayField('certifications', index, 'certificationDate', (e.target as HTMLInputElement).value)"
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

            <div v-if="currentStep === 6" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Additional Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center space-x-2">
                  <input type="checkbox" id="hotlist" v-model="formData.additional.addToHotlist" class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
                  <label for="hotlist" class="text-sm font-medium text-gray-600">Add to Hotlist</label>
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-600">Resume Text</label>
                <textarea v-model="formData.additional.resumeText" rows="10" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm"></textarea>
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
          Submit Application
        </button>
      </div>
    </div>

    <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
      <h2 class="text-xl font-bold text-gray-800 mb-1">Applicant Data Preview</h2>
      <p class="text-gray-600 text-sm mb-4">Live summary of your application data</p>

      <div class="template-selection-buttons mb-4">
        <button 
          v-for="template in templatesList" 
          :key="template.id" 
          @click="switchTemplate(template.id)"
          class="template-button"
        >
          {{ template.name }}
        </button>
      </div>
      
      <component :is="currentTemplate" :formData="formData" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useResumeStore } from '@/stores/resumeStore';
import { ATS_TEMPLATES } from '@/constants/resumeTemplates';
import type { FormData, WorkHistoryItem, EducationHistoryItem, CertificationItem } from '@/types/resume';

const currentStep = ref(1);
const totalSteps = 6;

const formData = reactive<FormData>({
  personal: {
    firstName: 'Qirrat Fatima',
    lastName: 'Zaidi',
    headline: 'Front-End Developer',
    country: 'India',
    address1: '123 Main St',
    address2: 'Apt 101',
    city: 'sINfH',
    state: 'Sindh',
    zipCode: '12345',
    homeOffice: 'Head Office',
    geoLocation: '24.860966, 66.990501',
    schoolDistrict: 'Karachi',
    mobilePhone: '123-456-7890',
    workPhone: '098-765-4321',
    homePhone: '555-555-5555',
    email1: 'qirrat@example.com',
    email2: 'fatima@example.com',
    ssn: 'XXX-XX-1234',
  },
  employment: {
    employmentType: 'Full-Time',
    talentStatus: 'Applicant',
    positionCategory: 'Software Engineer',
    skillSet: 'Vue.js, JavaScript, Node.js',
    applicantTags: 'Remote, Frontend',
    detailsNotes: 'Looking for a new challenge.',
    industryExperience: 'Tech',
    applicantSource: 'LinkedIn',
  },
  history: {
    workHistory: [
      { companyName: 'Example Corp', jobTitle: 'Junior Developer', jobDescription: 'Developed and maintained web applications.', startDate: '2020-01-01', endDate: '2022-01-01', isCurrentJob: false, jobLocation: 'New York, NY', jobType: 'Full-time' },
    ],
    educationHistory: [
      { institutionName: 'University of Engineering', degree: 'B.S. in Computer Science', fieldOfStudy: 'Computer Science', startDate: '2016-09-01', endDate: '2020-06-01', isCurrentEducation: false, educationLocation: 'Karachi, Sindh' }
    ],
  },
  onlinePresence: {
    linkedInProfile: 'https://linkedin.com/in/qirrat',
    personalSite: 'https://qirrat.dev',
    github: 'https://github.com/qirrat',
    twitterProfile: 'https://twitter.com/qirrat',
  },
  certifications: [
    { certificationName: 'AWS Certified Cloud Practitioner', certificationBody: 'Amazon Web Services', certificationDate: '2023-05-15' },
  ],
  additional: {
    resumeText: 'A highly motivated and skilled frontend developer with a passion for building intuitive user interfaces. Proficient in Vue.js, JavaScript, and modern web development practices.',
    addToHotlist: false,
  },
});

const getStatusClass = (status: string | undefined) => {
  switch (status) {
    case 'Applicant': return 'bg-blue-100 text-blue-800';
    case 'Candidate': return 'bg-purple-100 text-purple-800';
    case 'Employee': return 'bg-green-100 text-green-800';
    case 'Hired': return 'bg-emerald-100 text-emerald-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStepName = (step: number) => {
  switch (step) {
    case 1: return 'Personal Info';
    case 2: return 'Employment';
    case 3: return 'Work History';
    case 4: return 'Education History';
    case 5: return 'Online Presence & Certifications';
    case 6: return 'Additional Info';
    default: return '';
  }
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

const addRow = (section: 'history' | 'certifications', field?: 'workHistory' | 'educationHistory') => {
  if (section === 'history') {
    if (field === 'workHistory') {
      formData.history.workHistory.push({ companyName: '', jobTitle: '', jobDescription: '', startDate: '', endDate: '', isCurrentJob: false });
    } else if (field === 'educationHistory') {
      formData.history.educationHistory.push({ institutionName: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', isCurrentEducation: false });
    }
  } else if (section === 'certifications') {
    formData.certifications.push({ certificationName: '', certificationBody: '', certificationDate: '' });
  }
};

const removeRow = (section: 'history' | 'certifications', index: number, field?: 'workHistory' | 'educationHistory') => {
    if (section === 'history' && field) {
        formData.history[field].splice(index, 1);
    } else if (section === 'certifications') {
        formData.certifications.splice(index, 1);
    }
};

const updateArrayField = (section: 'history' | 'certifications', field: 'workHistory' | 'educationHistory' | undefined, index: number, subField: string, value: any) => {
  if (section === 'history' && field) {
    (formData.history[field][index] as any)[subField] = value;
  } else if (section === 'certifications') {
    (formData.certifications[index] as any)[subField] = value;
  }
};


const submitForm = async () => {
  console.log("Form data submitted:", formData);

  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    alert('Your application has been submitted successfully! Check the preview on the right.');
  } catch (e) {
    console.error("Error submitting form:", e);
    alert('There was an error submitting your application. Please try again.');
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
.template-selection-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
.template-button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}
.template-button:hover {
  background-color: #e0e0e0;
}
</style>