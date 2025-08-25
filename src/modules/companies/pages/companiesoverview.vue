<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md font-sans">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">Companies Overview</h1>
      <p class="text-gray-500 max-w-md">Browse and manage company profiles within your system.</p>
    </div>

    <!-- Filter and Search Section -->
    <div class="bg-white rounded-lg shadow p-6 space-y-4 mb-8">
      <h2 class="text-xl font-semibold text-gray-700">Filter & Search</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label for="companySearch" class="block text-sm font-medium text-gray-600">Search by Name/Industry</label>
          <input type="text" id="companySearch" v-model="searchTerm" placeholder="e.g., Tech Corp, SaaS"
                 class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        </div>
        <div>
          <label for="industryFilter" class="block text-sm font-medium text-gray-600">Industry</label>
          <select id="industryFilter" v-model="filterIndustry"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Education">Education</option>
          </select>
        </div>
        <div>
          <label for="sizeFilter" class="block text-sm font-medium text-gray-600">Company Size</label>
          <select id="sizeFilter" v-model="filterSize"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
            <option value="">All Sizes</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>
        <div>
          <label for="countryFilter" class="block text-sm font-medium text-gray-600">Country</label>
          <select id="countryFilter" v-model="filterCountry"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
            <option value="">All Countries</option>
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

    <!-- Companies List Section -->
    <div class="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 class="text-xl font-semibold text-gray-700">All Companies ({{ filteredCompanies.length }})</h2>

      <div v-if="filteredCompanies.length === 0" class="text-center text-gray-500 py-10">
        <p>No company profiles match your current filters.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="company in filteredCompanies" :key="company.id"
             class="bg-gray-50 rounded-lg shadow-sm p-4 space-y-3 border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-800 font-medium">
                {{ company.companyDetails.companyName.charAt(0) }}
              </span>
            </div>
            <div class="flex-grow">
              <h3 class="text-lg font-semibold text-gray-800">{{ company.companyDetails.companyName }}</h3>
              <p class="text-sm text-gray-500">{{ company.companyDetails.industry }}</p>
            </div>
          </div>

          <div class="space-y-1 text-sm text-gray-600">
            <p><span class="font-medium">Size:</span> {{ company.companyDetails.companySize }}</p>
            <p><span class="font-medium">Website:</span> <a :href="company.companyDetails.website" target="_blank" class="text-blue-600 hover:underline">{{ company.companyDetails.website }}</a></p>
            <p><span class="font-medium">Country:</span> {{ company.contactLocation.country }}</p>
          </div>

          <div class="pt-2 border-t border-gray-200 flex justify-end">
            <button @click="viewCompany(company)"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm shadow-sm">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Company Profile Modal -->
    <div v-if="showProfileModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-auto">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full my-8 relative">
        <button @click="closeProfileModal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedCompany?.companyDetails?.companyName }}</h3>
        <p class="text-gray-600 text-lg mb-4">{{ selectedCompany?.companyDetails?.industry }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
          <!-- Company Details -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-800 mb-1">Company Details</h4>
            <p><strong>Legal Name:</strong> {{ selectedCompany?.companyDetails?.legalName }}</p>
            <p><strong>Size:</strong> {{ selectedCompany?.companyDetails?.companySize }}</p>
            <p><strong>Website:</strong> <a :href="selectedCompany?.companyDetails?.website" target="_blank" class="text-blue-600 hover:underline">{{ selectedCompany?.companyDetails?.website }}</a></p>
            <p v-if="selectedCompany?.companyDetails?.description"><strong>Description:</strong> <span class="whitespace-pre-wrap">{{ selectedCompany?.companyDetails?.description }}</span></p>
          </div>

          <!-- Contact & Location -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-800 mb-1">Contact & Location</h4>
            <p><strong>Main Email:</strong> {{ selectedCompany?.contactLocation?.mainEmail }}</p>
            <p><strong>Phone:</strong> {{ selectedCompany?.contactLocation?.phoneNumber }}</p>
            <p v-if="selectedCompany?.contactLocation?.faxNumber"><strong>Fax:</strong> {{ selectedCompany?.contactLocation?.faxNumber }}</p>
            <p><strong>Address:</strong> {{ selectedCompany?.contactLocation?.streetAddress }}</p>
            <p><strong>City:</strong> {{ selectedCompany?.contactLocation?.city }}</p>
            <p><strong>State/Province:</strong> {{ selectedCompany?.contactLocation?.stateProvince }}</p>
            <p><strong>Zip Code:</strong> {{ selectedCompany?.contactLocation?.zipCode }}</p>
            <p><strong>Country:</strong> {{ selectedCompany?.contactLocation?.country }}</p>
          </div>
        </div>

        <!-- Financial & Other -->
        <div class="mt-6 border-t pt-4 space-y-2">
          <h4 class="font-semibold text-gray-800 mb-1">Financial & Other Information</h4>
          <p v-if="selectedCompany?.financialOther?.taxId"><strong>Tax ID:</strong> {{ selectedCompany?.financialOther?.taxId }}</p>
          <p v-if="selectedCompany?.financialOther?.registrationNumber"><strong>Registration No.:</strong> {{ selectedCompany?.financialOther?.registrationNumber }}</p>
          <p v-if="selectedCompany?.financialOther?.fiscalYearEnd"><strong>Fiscal Year End:</strong> {{ selectedCompany?.financialOther?.fiscalYearEnd }}</p>
          <p v-if="selectedCompany?.financialOther?.companyTags"><strong>Tags:</strong> {{ selectedCompany?.financialOther?.companyTags }}</p>
          <p v-if="selectedCompany?.financialOther?.notes"><strong>Notes:</strong> <span class="whitespace-pre-wrap">{{ selectedCompany?.financialOther?.notes }}</span></p>
        </div>

        <div class="mt-6 flex justify-end">
          <button @click="closeProfileModal" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// Define a comprehensive type for a company profile
interface Company {
  id: string;
  companyDetails: {
    companyName: string;
    legalName: string;
    industry: string;
    companySize: string;
    website: string;
    description: string;
  };
  contactLocation: {
    mainEmail: string;
    phoneNumber: string;
    faxNumber?: string;
    streetAddress: string;
    city: string;
    stateProvince: string;
    zipCode: string;
    country: string;
  };
  financialOther: {
    taxId?: string;
    registrationNumber?: string;
    fiscalYearEnd?: string;
    companyTags?: string;
    notes?: string;
  };
}

// Mock company data for demonstration
const companies = ref<Company[]>([
  {
    id: 'comp1',
    companyDetails: {
      companyName: 'Innovate Solutions Inc.',
      legalName: 'Innovate Solutions Incorporated',
      industry: 'Technology',
      companySize: '51-200',
      website: 'https://www.innovatesolutions.com',
      description: 'A leading technology company specializing in AI-driven software solutions.',
    },
    contactLocation: {
      mainEmail: 'info@innovatesolutions.com',
      phoneNumber: '+1-555-123-4567',
      faxNumber: '+1-555-123-4568',
      streetAddress: '100 Tech Blvd',
      city: 'Innoville',
      stateProvince: 'CA',
      zipCode: '90210',
      country: 'United States',
    },
    financialOther: {
      taxId: 'TXN-987654',
      registrationNumber: 'REG-ABC123',
      fiscalYearEnd: '2024-12-31',
      companyTags: 'SaaS, B2B, AI, Enterprise',
      notes: 'Strong growth trajectory. Looking to expand into European markets.',
    },
  },
  {
    id: 'comp2',
    companyDetails: {
      companyName: 'Global Finance Group',
      legalName: 'Global Finance Group Ltd.',
      industry: 'Finance',
      companySize: '1000+',
      website: 'https://www.globalfinance.com',
      description: 'A multinational financial services corporation offering a wide range of banking and investment products.',
    },
    contactLocation: {
      mainEmail: 'contact@globalfinance.com',
      phoneNumber: '+44-20-7946-0123',
      streetAddress: '20 Wall Street',
      city: 'London',
      stateProvince: 'England',
      zipCode: 'SW1A 2AA',
      country: 'United Kingdom',
    },
    financialOther: {
      companyTags: 'Banking, Investment, Public',
      notes: 'Recently acquired FinTech startup.',
    },
  },
  {
    id: 'comp3',
    companyDetails: {
      companyName: 'Health First Clinics',
      legalName: 'Health First Clinics LLC',
      industry: 'Healthcare',
      companySize: '201-500',
      website: 'https://www.healthfirst.org',
      description: 'A network of primary care clinics committed to community health.',
    },
    contactLocation: {
      mainEmail: 'admin@healthfirst.org',
      phoneNumber: '+1-800-HEALTHY',
      streetAddress: '500 Wellness Way',
      city: 'MedCity',
      stateProvince: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    financialOther: {
      companyTags: 'Clinic, Community, Non-profit',
    },
  },
  {
    id: 'comp4',
    companyDetails: {
      companyName: 'Retail Giant',
      legalName: 'Retail Giant Inc.',
      industry: 'Retail',
      companySize: '1000+',
      website: 'https://www.retailgiant.com',
      description: 'A large retail chain with a presence across North America, offering consumer goods.',
    },
    contactLocation: {
      mainEmail: 'info@retailgiant.com',
      phoneNumber: '+1-888-555-0000',
      streetAddress: '1 Retail Plaza',
      city: 'Shopton',
      stateProvince: 'TX',
      zipCode: '75001',
      country: 'United States',
    },
    financialOther: {
      companyTags: 'E-commerce, Consumer Goods, Logistics',
    },
  },
]);

// Search and Filter State
const searchTerm = ref('');
const filterIndustry = ref('');
const filterSize = ref('');
const filterCountry = ref('');

// Computed property for filtered companies
const filteredCompanies = computed(() => {
  return companies.value.filter(company => {
    // Search by name or industry
    const matchesSearch = searchTerm.value === '' ||
      company.companyDetails.companyName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      company.companyDetails.industry.toLowerCase().includes(searchTerm.value.toLowerCase());

    // Filter by industry
    const matchesIndustry = filterIndustry.value === '' ||
      company.companyDetails.industry === filterIndustry.value;

    // Filter by size
    const matchesSize = filterSize.value === '' ||
      company.companyDetails.companySize === filterSize.value;

    // Filter by country
    const matchesCountry = filterCountry.value === '' ||
      company.contactLocation.country === filterCountry.value;

    return matchesSearch && matchesIndustry && matchesSize && matchesCountry;
  });
});

// Modal State and Functions
const showProfileModal = ref(false);
const selectedCompany = ref<Company | null>(null);

const viewCompany = (company: Company) => {
  selectedCompany.value = company;
  showProfileModal.value = true;
};

const closeProfileModal = () => {
  showProfileModal.value = false;
  selectedCompany.value = null;
};
</script>

<style scoped>
/* Base font for consistency with design reference */
.font-sans {
  font-family: 'Inter', sans-serif;
}
</style>
