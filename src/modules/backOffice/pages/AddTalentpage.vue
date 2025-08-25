<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans rounded-lg shadow-md">
    <div class="lg:col-span-2">
      <div class="mb-6">
        <h1 class="text-3xl font-semibold text-gray-700 mb-2">Talent Application Form</h1>
        <p class="text-gray-500 max-w-md">Please verify and update your information to complete the application.</p>
      </div>
      <div class="mb-8 flex justify-center space-x-2"> <div v-for="stepNum in totalSteps" :key="stepNum"
             :class="{
               'flex items-center space-x-1 p-1 rounded-full': true, /* Adjusted p-2 to p-1, space-x-2 to space-x-1 */
               'bg-blue-500 text-white shadow-lg': currentStep === stepNum,
               'bg-gray-200 text-gray-600': currentStep !== stepNum,
               'bg-green-500 text-white': currentStep > stepNum
             }">
          <div :class="{
                 'w-6 h-6 flex items-center justify-center rounded-full font-bold text-sm': true, /* Adjusted w-8 h-8 to w-6 h-6, added text-sm */
                 'bg-white text-blue-500': currentStep === stepNum,
                 'bg-gray-300 text-gray-700': currentStep !== stepNum,
                 'bg-white text-green-500': currentStep > stepNum
               }">
            {{ stepNum }}
          </div>
          <span class="hidden lg:inline text-sm">{{ getStepName(stepNum) }}</span> </div>
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
                  <label class="block text-sm font-medium text-gray-600">Address</label>
                  <input type="text" v-model="formData.personal.address" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">City</label>
                  <input type="text" v-model="formData.personal.city" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">State</label>
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
                  <label class="block text-sm font-medium text-gray-600">Geo Code</label>
                  <input type="text" v-model="formData.personal.geoCode" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
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
                  <label class="block text-sm font-medium text-gray-600">Email</label>
                  <input type="email" v-model="formData.personal.email1" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Email 2</label>
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
                  <label class="block text-sm font-medium text-gray-600">LinkedIn Profile</label>
                  <input type="text" v-model="formData.employment.linkedinProfile" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Personal Site</label>
                  <input type="text" v-model="formData.employment.personalSite" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Custom 1</label>
                  <input type="text" v-model="formData.employment.custom1" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Custom 2</label>
                  <input type="text" v-model="formData.employment.custom2" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
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
                  <select v-model="formData.employment.skillSet" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                    <option value="Nothing selected">Nothing selected</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="React">React</option>
                    <option value="Vue.js">Vue.js</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Applicant Tags</label>
                  <input type="text" v-model="formData.employment.applicantTags" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Details</label>
                  <input type="text" v-model="formData.employment.details" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Industry Experience</label>
                  <input type="text" v-model="formData.employment.industryExperience" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Company Experience</label>
                  <input type="text" v-model="formData.employment.companyExperience" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Applicant Source</label>
                  <input type="text" v-model="formData.employment.applicantSource" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Citizenship</label>
                  <input type="text" v-model="formData.employment.citizenship" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600">Certification</label>
                  <input type="text" v-model="formData.employment.certification" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 3" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Work & Education History</h2>
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
                    <label class="block text-sm font-medium text-gray-600">Company</label>
                    <input type="text" v-model="work.company" @input="e => updateArrayField('history', 'workHistory', index, 'company', e.target.value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">From</label>
                    <input type="date" v-model="work.from" @input="e => updateArrayField('history', 'workHistory', index, 'from', e.target.value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">To</label>
                    <input type="date" v-model="work.to" @input="e => updateArrayField('history', 'workHistory', index, 'to', e.target.value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <button v-if="formData.history.workHistory.length > 1" type="button" @click="removeRow('history', 'workHistory', index)"
                          class="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

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
                  <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-600">School</label>
                    <input type="text" v-model="edu.school" @input="e => updateArrayField('history', 'educationHistory', index, 'school', e.target.value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-600">Degree</label>
                    <input type="text" v-model="edu.degree" @input="e => updateArrayField('history', 'educationHistory', index, 'degree', e.target.value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-600">Field</label>
                    <input type="text" v-model="edu.field" @input="e => updateArrayField('history', 'educationHistory', index, 'field', e.target.value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">From</label>
                    <input type="date" v-model="edu.from" @input="e => updateArrayField('history', 'educationHistory', index, 'from', e.target.value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-600">To</label>
                    <input type="date" v-model="edu.to" @input="e => updateArrayField('history', 'educationHistory', index, 'to', e.target.value)"
                           class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
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

            <div v-if="currentStep === 4" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-700">Additional Information & Resume</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-600">Tags Rating</label>
                  <div class="flex items-center space-x-1 mt-1">
                    <template v-for="star in 5" :key="star">
                      <svg @click="handleStarRating(star)"
                           :class="['h-6 w-6 cursor-pointer transition-colors duration-200',
                                     star <= formData.additional.tagsRating ? 'text-yellow-400' : 'text-gray-300']"
                           fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </template>
                  </div>
                </div>
                <div class="flex items-center mt-1">
                  <input type="checkbox" id="hotlist" v-model="formData.additional.hotlist" class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                  <label for="hotlist" class="ml-2 block text-sm font-medium text-gray-600">Add to Hotlist</label>
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

    <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md"> <h2 class="text-xl font-bold text-gray-800 mb-1">Applicant Data Preview</h2>
      <p class="text-gray-600 text-sm mb-4">Live summary of your application data</p>

      <div class="space-y-2 text-sm text-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ formData.personal.firstName }} {{ formData.personal.lastName }}</h3>
        <p class="text-gray-600 text-md mb-4">{{ formData.personal.headline }}</p>

        <div class="grid grid-cols-1 gap-y-2 gap-x-6 text-sm text-gray-700 mb-4 pb-2 border-b border-gray-200">
          <p v-if="formData.personal.homeOffice"><strong>Home Office:</strong> {{ formData.personal.homeOffice }}</p>
          <p v-if="formData.personal.schoolDistrict"><strong>School District:</strong> {{ formData.personal.schoolDistrict }}</p>
          <p v-if="formData.personal.ssn"><strong>SSN:</strong> {{ formData.personal.ssn }}</p>
          <p v-if="formData.employment.linkedinProfile"><strong>LinkedIn:</strong> <a :href="formData.employment.linkedinProfile" target="_blank" class="text-blue-600 hover:underline">{{ formData.employment.linkedinProfile }}</a></p>
          <p v-if="formData.employment.personalSite"><strong>Personal Site:</strong> <a :href="formData.employment.personalSite" target="_blank" class="text-blue-600 hover:underline">{{ formData.employment.personalSite }}</a></p>
          <p v-if="formData.employment.applicantTags"><strong>Tags:</strong> {{ formData.employment.applicantTags }}</p>
          <p v-if="formData.employment.industryExperience"><strong>Industry Exp.:</strong> {{ formData.employment.industryExperience }}</p>
          <p v-if="formData.employment.companyExperience"><strong>Company Exp.:</strong> {{ formData.employment.companyExperience }}</p>
          <p v-if="formData.employment.applicantSource"><strong>Source:</strong> {{ formData.employment.applicantSource }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-800 mb-1">Contact Details</h4>
            <p><strong>Email:</strong> {{ formData.personal.email1 }}</p>
            <p v-if="formData.personal.email2"><strong>Email 2:</strong> {{ formData.personal.email2 }}</p>
            <p><strong>Mobile Phone:</strong> {{ formData.personal.mobilePhone }}</p>
            <p v-if="formData.personal.workPhone"><strong>Work Phone:</strong> {{ formData.personal.workPhone }}</p>
            <p v-if="formData.personal.homePhone"><strong>Home Phone:</strong> {{ formData.personal.homePhone }}</p>
            <p><strong>Address:</strong> {{ formData.personal.address }}</p>
            <p><strong>City:</strong> {{ formData.personal.city }}</p>
            <p><strong>State:</strong> {{ formData.personal.state }}</p>
            <p><strong>Zip Code:</strong> {{ formData.personal.zipCode }}</p>
          </div>

          <div class="space-y-2">
            <h4 class="font-semibold text-gray-800 mb-1">Employment & Classification</h4>
            <p><strong>Status:</strong> <span :class="['ml-1 px-2 py-0.5 rounded-full text-xs font-medium', getStatusClass(formData.employment.talentStatus)]">{{ formData.employment.talentStatus }}</span></p>
            <p><strong>Category:</strong> {{ formData.employment.positionCategory }}</p>
            <p><strong>Skills:</strong> {{ formData.employment.skillSet }}</p>
            <p v-if="formData.employment.employmentType"><strong>Employment Type:</strong> {{ formData.employment.employmentType }}</p>
            <p v-if="formData.employment.custom1"><strong>Custom 1:</strong> {{ formData.employment.custom1 }}</p>
            <p v-if="formData.employment.custom2"><strong>Custom 2:</strong> {{ formData.employment.custom2 }}</p>
            <p v-if="formData.employment.details"><strong>Details:</strong> {{ formData.employment.details }}</p>
            <p v-if="formData.employment.citizenship"><strong>Citizenship:</strong> {{ formData.employment.citizenship }}</p>
            <p v-if="formData.employment.certification"><strong>Certification:</strong> {{ formData.employment.certification }}</p>
          </div>
        </div>

        <div v-if="formData.history.workHistory.length && formData.history.workHistory[0].company" class="mt-6 border-t pt-4">
          <h4 class="font-semibold text-gray-800 mb-2">Work History</h4>
          <div v-for="(job, index) in formData.history.workHistory" :key="index" class="mb-2 p-3 bg-gray-50 rounded-md border border-gray-200">
            <p class="font-medium text-gray-800">{{ job.company }}</p>
            <p class="text-sm text-gray-600">{{ job.from }} - {{ job.to }}</p>
          </div>
        </div>

        <div v-if="formData.history.educationHistory.length && formData.history.educationHistory[0].school" class="mt-6 border-t pt-4">
          <h4 class="font-semibold text-gray-800 mb-2">Education History</h4>
          <div v-for="(edu, index) in formData.history.educationHistory" :key="index" class="mb-2 p-3 bg-gray-50 rounded-md border border-gray-200">
            <p class="font-medium text-gray-800">{{ edu.degree }} in {{ edu.field }}</p>
            <p class="text-sm text-gray-600">{{ edu.school }}</p>
            <p class="text-sm text-gray-600">{{ edu.from }} - {{ edu.to }}</p>
          </div>
        </div>

        <div class="mt-6 border-t pt-4 space-y-2">
          <h4 class="font-semibold text-gray-800">Additional Information</h4>
          <div class="flex items-center">
            <strong class="mr-2">Tags Rating:</strong>
            <div class="flex items-center">
              <template v-for="star in 5" :key="star">
                <svg :class="['h-5 w-5', star <= formData.additional.tagsRating ? 'text-yellow-400' : 'text-gray-300']"
                     fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </template>
            </div>
          </div>
          <p><strong>Hotlist:</strong> {{ formData.additional.hotlist ? 'Yes' : 'No' }}</p>
          <div v-if="formData.additional.resumeText">
            <h4 class="font-semibold text-gray-800 mt-4 mb-1">Resume Text:</h4>
            <p class="whitespace-pre-wrap border p-3 rounded-md bg-gray-50 text-gray-700 leading-relaxed">{{ formData.additional.resumeText }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// Form State
const currentStep = ref(1);
const totalSteps = 4;

const formData = reactive({
  personal: {
    firstName: '',
    lastName: '',
    headline: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    homeOffice: '',
    geoCode: '',
    schoolDistrict: '',
    mobilePhone: '',
    workPhone: '',
    homePhone: '',
    email1: '',
    email2: '',
    ssn: '',
  },
  employment: {
    employmentType: '',
    linkedinProfile: '',
    personalSite: '',
    custom1: '',
    custom2: '',
    talentStatus: 'Applicant',
    positionCategory: 'Nothing selected',
    skillSet: 'Nothing selected',
    applicantTags: '',
    details: '',
    industryExperience: '',
    companyExperience: '',
    applicantSource: '',
    citizenship: '',
    certification: '',
  },
  history: {
    workHistory: [{ company: '', from: '', to: '' }],
    educationHistory: [{ school: '', degree: '', field: '', from: '', to: '' }],
  },
  additional: {
    tagsRating: 0,
    hotlist: false,
    resumeText: '',
  },
});

// Helper to get status class (for the talentStatus badge)
const getStatusClass = (status: string | undefined) => {
  switch (status) {
    case 'Applicant': return 'bg-blue-100 text-blue-800';
    case 'Candidate': return 'bg-purple-100 text-purple-800';
    case 'Employee': return 'bg-green-100 text-green-800';
    case 'Hired': return 'bg-emerald-100 text-emerald-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Step names for the indicator
const getStepName = (step: number) => {
  switch (step) {
    case 1: return 'Personal Info';
    case 2: return 'Employment';
    case 3: return 'History';
    case 4: return 'Addl. Info'; /* Shortened for smaller display */
    default: return '';
  }
};

// Navigation Functions
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

// Handler for dynamically added rows (Work/Education History)
const addRow = (section: 'history', field: 'workHistory' | 'educationHistory') => {
  if (field === 'workHistory') {
    formData[section][field].push({ company: '', from: '', to: '' });
  } else {
    formData[section][field].push({ school: '', degree: '', field: '', from: '', to: '' });
  }
};

const removeRow = (section: 'history', field: 'workHistory' | 'educationHistory', index: number) => {
  formData[section][field].splice(index, 1);
};

const updateArrayField = (section: 'history', field: 'workHistory' | 'educationHistory', index: number, subField: string, value: string) => {
  (formData[section][field][index] as any)[subField] = value;
};

// Star Rating Handler
const handleStarRating = (rating: number) => {
  formData.additional.tagsRating = rating;
};

// Form Submission
const submitForm = async () => {
  console.log("Form data submitted:", formData);

  try {
    // Simulate API call success after a short delay
    await new Promise(resolve => setTimeout(resolve, 500));

    alert('Your application has been submitted successfully! Check the preview on the right.');

    // Optionally reset form after submission for a new entry
    // Object.assign(formData, {
    //   personal: { firstName: '', lastName: '', /* ...other defaults */ },
    //   employment: { employmentType: '', /* ...other defaults */ },
    //   history: { workHistory: [{ company: '', from: '', to: '' }], educationHistory: [{ school: '', degree: '', field: '', from: '', to: '' }] },
    //   additional: { tagsRating: 0, hotlist: false, resumeText: '' },
    // });
    // currentStep.value = 1;

  } catch (e) {
    console.error("Error submitting form:", e);
    alert('There was an error submitting your application. Please try again.');
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>