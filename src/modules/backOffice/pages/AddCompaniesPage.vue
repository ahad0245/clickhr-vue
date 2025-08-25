<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md font-sans">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">New Company Application</h1>
      <p class="text-gray-500 max-w-md">Enter details to create a new company profile.</p>
    </div>

    <!-- Step Indicator -->
    <div class="mb-8 flex justify-center space-x-4">
      <div v-for="stepNum in totalSteps" :key="stepNum"
           :class="['flex items-center space-x-2 p-2 rounded-full',
                    currentStep === stepNum ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-600',
                    currentStep > stepNum ? 'bg-green-500 text-white' : ''
                   ]">
        <div :class="['w-8 h-8 flex items-center justify-center rounded-full font-bold',
                       currentStep === stepNum ? 'bg-white text-blue-500' : 'bg-gray-300 text-gray-700',
                       currentStep > stepNum ? 'bg-white text-green-500' : ''
                      ]">
          {{ stepNum }}
        </div>
        <span class="hidden sm:inline">{{ getStepName(stepNum) }}</span>
      </div>
    </div>

    <!-- Form Sections -->
    <div class="bg-white rounded-lg shadow p-6 space-y-6 mb-8">
      <transition name="fade" mode="out-in">
        <div :key="currentStep">
          <div v-if="currentStep === 1" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-700">Company Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600">Company Name</label>
                <input type="text" v-model="formData.companyDetails.companyName" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Legal Name</label>
                <input type="text" v-model="formData.companyDetails.legalName" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Industry</label>
                <input type="text" v-model="formData.companyDetails.industry" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Company Size</label>
                <select v-model="formData.companyDetails.companySize" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-600">Website</label>
                <input type="url" v-model="formData.companyDetails.website" placeholder="https://www.example.com" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-600">Company Description</label>
                <textarea v-model="formData.companyDetails.description" rows="4" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm"></textarea>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 2" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-700">Contact & Location</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600">Main Email</label>
                <input type="email" v-model="formData.contactLocation.mainEmail" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Phone Number</label>
                <input type="text" v-model="formData.contactLocation.phoneNumber" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Fax Number</label>
                <input type="text" v-model="formData.contactLocation.faxNumber" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-600">Street Address</label>
                <input type="text" v-model="formData.contactLocation.streetAddress" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">City</label>
                <input type="text" v-model="formData.contactLocation.city" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">State/Province</label>
                <input type="text" v-model="formData.contactLocation.stateProvince" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Zip/Postal Code</label>
                <input type="text" v-model="formData.contactLocation.zipCode" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Country</label>
                <select v-model="formData.contactLocation.country" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                  <option value="">Select Country</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="India">India</option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 3" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-700">Financial & Other Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600">Tax ID</label>
                <input type="text" v-model="formData.financialOther.taxId" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Registration Number</label>
                <input type="text" v-model="formData.financialOther.registrationNumber" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Fiscal Year End</label>
                <input type="date" v-model="formData.financialOther.fiscalYearEnd" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-600">Company Tags</label>
                <input type="text" v-model="formData.financialOther.companyTags" placeholder="e.g., SaaS, B2B, Startup" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-600">Notes</label>
                <textarea v-model="formData.financialOther.notes" rows="4" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm"></textarea>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Navigation Buttons -->
    <div class="mt-6 flex justify-between">
      <button v-if="currentStep > 1" @click="prevStep"
              class="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors shadow-sm">
        Previous
      </button>
      <div v-else></div> <!-- Placeholder to maintain spacing -->

      <button v-if="currentStep < totalSteps" @click="nextStep"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md">
        Next
      </button>
      <button v-else @click="submitForm"
              class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-md">
        Submit Company
      </button>
    </div>

    <!-- Custom Modal for Messages -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full space-y-4 text-center">
        <h3 class="text-lg font-semibold text-gray-800">{{ modalTitle }}</h3>
        <p class="text-gray-600">{{ modalMessage }}</p>
        <button @click="closeModal" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// Modal state
const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');

const openModal = (title: string, message: string) => {
  modalTitle.value = title;
  modalMessage.value = message;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  modalTitle.value = '';
  modalMessage.value = '';
};

// Form State
const currentStep = ref(1);
const totalSteps = 3; // Now 3 steps for company form

const formData = reactive({
  companyDetails: {
    companyName: '',
    legalName: '',
    industry: '',
    companySize: '',
    website: '',
    description: '',
  },
  contactLocation: {
    mainEmail: '',
    phoneNumber: '',
    faxNumber: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    zipCode: '',
    country: '',
  },
  financialOther: {
    taxId: '',
    registrationNumber: '',
    fiscalYearEnd: '',
    companyTags: '',
    notes: '',
  },
});

// Step names for the indicator
const getStepName = (step: number) => {
  switch (step) {
    case 1: return 'Company Details';
    case 2: return 'Contact & Location';
    case 3: return 'Financial & Other';
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

// Form Submission
const submitForm = async () => {
  console.log("Company Form data submitted:", JSON.parse(JSON.stringify(formData))); // Log a deep copy

  try {
    // In a real application, you would replace this with your custom API call
    // const response = await fetch('/api/companies', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    //
    // if (response.ok) {
    //   const result = await response.json();
    //   console.log('API response:', result);
    //   openModal('Success!', 'Company profile submitted successfully!');
    // } else {
    //   const errorData = await response.json();
    //   console.error('API error:', errorData);
    //   openModal('Submission Error', `Failed to submit company profile: ${errorData.message || 'Unknown error'}`);
    // }

    // Simulate API call success after a short delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    openModal('Success!', 'Company profile submitted successfully!');

    // Optionally reset form after submission
    Object.assign(formData, { // Reset to initial empty state
      companyDetails: {
        companyName: '', legalName: '', industry: '', companySize: '', website: '', description: '',
      },
      contactLocation: {
        mainEmail: '', phoneNumber: '', faxNumber: '', streetAddress: '', city: '', stateProvince: '', zipCode: '', country: '',
      },
      financialOther: {
        taxId: '', registrationNumber: '', fiscalYearEnd: '', companyTags: '', notes: '',
      },
    });
    currentStep.value = 1;

  } catch (e) {
    console.error("Error submitting form:", e);
    openModal('Submission Error', 'There was an error submitting your company profile. Please try again.');
  }
};
</script>

<style scoped>
/* Base font for consistency with design reference */
.font-sans {
  font-family: 'Inter', sans-serif;
}

/* Custom fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
