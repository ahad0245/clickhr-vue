<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md font-sans">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">Talent Overview</h1>
      <p class="text-gray-500 max-w-md">Browse and manage talent profiles within your system.</p>
    </div>

    <!-- Filter and Search Section -->
    <div class="bg-white rounded-lg shadow p-6 space-y-4 mb-8">
      <h2 class="text-xl font-semibold text-gray-700">Filter & Search</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label for="search" class="block text-sm font-medium text-gray-600">Search by Name/Headline</label>
          <input type="text" id="search" v-model="searchTerm" placeholder="e.g., John Doe, Software Engineer"
                 class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        </div>
        <div>
          <label for="statusFilter" class="block text-sm font-medium text-gray-600">Talent Status</label>
          <select id="statusFilter" v-model="filterStatus"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
            <option value="">All Statuses</option>
            <option value="Applicant">Applicant</option>
            <option value="Candidate">Candidate</option>
            <option value="Employee">Employee</option>
            <option value="Hired">Hired</option>
          </select>
        </div>
        <div>
          <label for="categoryFilter" class="block text-sm font-medium text-gray-600">Position Category</label>
          <select id="categoryFilter" v-model="filterCategory"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
            <option value="">All Categories</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="UX Designer">UX Designer</option>
          </select>
        </div>
        <div>
          <label for="skillFilter" class="block text-sm font-medium text-gray-600">Skill Set</label>
          <select id="skillFilter" v-model="filterSkill"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
            <option value="">All Skills</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Vue.js">Vue.js</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="UX Design">UX Design</option>
            <option value="Figma">Figma</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Talent List Section -->
    <div class="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 class="text-xl font-semibold text-gray-700">All Talents ({{ filteredTalents.length }})</h2>

      <div v-if="filteredTalents.length === 0" class="text-center text-gray-500 py-10">
        <p>No talent profiles match your current filters.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="talent in filteredTalents" :key="talent.id"
             class="bg-gray-50 rounded-lg shadow-sm p-4 space-y-3 border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-medium">
                {{ talent.personal.firstName.charAt(0) }}{{ talent.personal.lastName.charAt(0) }}
              </span>
            </div>
            <div class="flex-grow">
              <h3 class="text-lg font-semibold text-gray-800">{{ talent.personal.firstName }} {{ talent.personal.lastName }}</h3>
              <p class="text-sm text-gray-500">{{ talent.personal.headline }}</p>
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm text-gray-600">
              <span class="font-medium">Status:</span>
              <span :class="['ml-1 px-2 py-0.5 rounded-full text-xs font-medium', getStatusClass(talent.employment.talentStatus)]">
                {{ talent.employment.talentStatus }}
              </span>
            </div>
            <p class="text-sm text-gray-600"><span class="font-medium">Category:</span> {{ talent.employment.positionCategory }}</p>
            <p class="text-sm text-gray-600"><span class="font-medium">Skills:</span> {{ talent.employment.skillSet }}</p>
            <p class="text-sm text-gray-600"><span class="font-medium">Country:</span> {{ talent.personal.country }}</p>
          </div>

          <div class="pt-2 border-t border-gray-200 flex justify-end">
            <button @click="viewTalent(talent)"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm shadow-sm">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Talent Profile Modal -->
    <div v-if="showProfileModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-auto">
      <div class="bg-white rounded-lg shadow-xl mt-auto p-6 max-w-3xl w-full my-8 relative">
        <button @click="closeProfileModal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedTalent?.personal?.firstName }} {{ selectedTalent?.personal?.lastName }}</h3>
        <p class="text-gray-600 text-lg mb-4">{{ selectedTalent?.personal?.headline }}</p>

        <!-- Key Details Section (Mimicking the image's top-right block) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6 text-sm text-gray-700 mb-6 pb-4 border-b border-gray-200">
            <p v-if="selectedTalent?.personal?.homeOffice"><strong>Home Office:</strong> {{ selectedTalent?.personal?.homeOffice }}</p>
            <p v-if="selectedTalent?.personal?.schoolDistrict"><strong>School District:</strong> {{ selectedTalent?.personal?.schoolDistrict }}</p>
            <p v-if="selectedTalent?.personal?.ssn"><strong>SSN:</strong> {{ selectedTalent?.personal?.ssn }}</p>
            <p v-if="selectedTalent?.employment?.linkedinProfile"><strong>LinkedIn:</strong> <a :href="selectedTalent?.employment?.linkedinProfile" target="_blank" class="text-blue-600 hover:underline">{{ selectedTalent?.employment?.linkedinProfile }}</a></p>
            <p v-if="selectedTalent?.employment?.personalSite"><strong>Personal Site:</strong> <a :href="selectedTalent?.employment?.personalSite" target="_blank" class="text-blue-600 hover:underline">{{ selectedTalent?.employment?.personalSite }}</a></p>
            <p v-if="selectedTalent?.employment?.applicantTags"><strong>Tags:</strong> {{ selectedTalent?.employment?.applicantTags }}</p>
            <p v-if="selectedTalent?.employment?.industryExperience"><strong>Industry Exp.:</strong> {{ selectedTalent?.employment?.industryExperience }}</p>
            <p v-if="selectedTalent?.employment?.companyExperience"><strong>Company Exp.:</strong> {{ selectedTalent?.employment?.companyExperience }}</p>
            <p v-if="selectedTalent?.employment?.applicantSource"><strong>Source:</strong> {{ selectedTalent?.employment?.applicantSource }}</p>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
          <!-- Personal Information (Detailed) -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-800 mb-1">Contact Details</h4>
            <p><strong>Email:</strong> {{ selectedTalent?.personal?.email1 }}</p>
            <p v-if="selectedTalent?.personal?.email2"><strong>Email 2:</strong> {{ selectedTalent?.personal?.email2 }}</p>
            <p><strong>Mobile Phone:</strong> {{ selectedTalent?.personal?.mobilePhone }}</p>
            <p v-if="selectedTalent?.personal?.workPhone"><strong>Work Phone:</strong> {{ selectedTalent?.personal?.workPhone }}</p>
            <p v-if="selectedTalent?.personal?.homePhone"><strong>Home Phone:</strong> {{ selectedTalent?.personal?.homePhone }}</p>
            <p><strong>Address:</strong> {{ selectedTalent?.personal?.address }}</p>
            <p><strong>City:</strong> {{ selectedTalent?.personal?.city }}</p>
            <p><strong>State:</strong> {{ selectedTalent?.personal?.state }}</p>
            <p><strong>Zip Code:</strong> {{ selectedTalent?.personal?.zipCode }}</p>
          </div>

          <!-- Employment & Classification (Detailed) -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-800 mb-1">Employment & Classification</h4>
            <p><strong>Status:</strong> <span :class="['ml-1 px-2 py-0.5 rounded-full text-xs font-medium', getStatusClass(selectedTalent?.employment?.talentStatus)]">{{ selectedTalent?.employment?.talentStatus }}</span></p>
            <p><strong>Category:</strong> {{ selectedTalent?.employment?.positionCategory }}</p>
            <p><strong>Skills:</strong> {{ selectedTalent?.employment?.skillSet }}</p>
            <p v-if="selectedTalent?.employment?.employmentType"><strong>Employment Type:</strong> {{ selectedTalent?.employment?.employmentType }}</p>
            <p v-if="selectedTalent?.employment?.custom1"><strong>Custom 1:</strong> {{ selectedTalent?.employment?.custom1 }}</p>
            <p v-if="selectedTalent?.employment?.custom2"><strong>Custom 2:</strong> {{ selectedTalent?.employment?.custom2 }}</p>
            <p v-if="selectedTalent?.employment?.details"><strong>Details:</strong> {{ selectedTalent?.employment?.details }}</p>
            <p v-if="selectedTalent?.employment?.citizenship"><strong>Citizenship:</strong> {{ selectedTalent?.employment?.citizenship }}</p>
            <p v-if="selectedTalent?.employment?.certification"><strong>Certification:</strong> {{ selectedTalent?.employment?.certification }}</p>
          </div>
        </div>

        <!-- Work History -->
        <div v-if="selectedTalent?.history?.workHistory?.length" class="mt-6 border-t pt-4">
          <h4 class="font-semibold text-gray-800 mb-2">Work History</h4>
          <div v-for="(job, index) in selectedTalent.history.workHistory" :key="index" class="mb-2 p-3 bg-gray-50 rounded-md border border-gray-200">
            <p class="font-medium text-gray-800">{{ job.company }}</p>
            <p class="text-sm text-gray-600">{{ job.from }} - {{ job.to }}</p>
          </div>
        </div>

        <!-- Education History -->
        <div v-if="selectedTalent?.history?.educationHistory?.length" class="mt-6 border-t pt-4">
          <h4 class="font-semibold text-gray-800 mb-2">Education History</h4>
          <div v-for="(edu, index) in selectedTalent.history.educationHistory" :key="index" class="mb-2 p-3 bg-gray-50 rounded-md border border-gray-200">
            <p class="font-medium text-gray-800">{{ edu.degree }} in {{ edu.field }}</p>
            <p class="text-sm text-gray-600">{{ edu.school }}</p>
            <p class="text-sm text-gray-600">{{ edu.from }} - {{ edu.to }}</p>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="mt-6 border-t pt-4 space-y-2">
          <h4 class="font-semibold text-gray-800">Additional Information</h4>
          <div class="flex items-center">
            <strong class="mr-2">Tags Rating:</strong>
            <div class="flex items-center">
              <template v-for="star in 5" :key="star">
                <svg :class="['h-5 w-5', star <= selectedTalent?.additional?.tagsRating ? 'text-yellow-400' : 'text-gray-300']"
                     fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </template>
            </div>
          </div>
          <p><strong>Hotlist:</strong> {{ selectedTalent?.additional?.hotlist ? 'Yes' : 'No' }}</p>
          <div v-if="selectedTalent?.additional?.resumeText">
            <h4 class="font-semibold text-gray-800 mt-4 mb-1">Resume Text:</h4>
            <p class="whitespace-pre-wrap border p-3 rounded-md bg-gray-50 text-gray-700 leading-relaxed">{{ selectedTalent?.additional?.resumeText }}</p>
          </div>
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
import { ref, computed } from 'vue';

// Define a more comprehensive type for a talent profile
interface Talent {
  id: string;
  personal: {
    firstName: string;
    lastName: string;
    headline: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    homeOffice?: string;
    geoCode?: string;
    schoolDistrict?: string;
    mobilePhone: string;
    workPhone?: string;
    homePhone?: string;
    email1: string;
    email2?: string;
    ssn?: string;
  };
  employment: {
    employmentType?: string;
    linkedinProfile?: string;
    personalSite?: string;
    custom1?: string;
    custom2?: string;
    talentStatus: string;
    positionCategory: string;
    skillSet: string;
    applicantTags?: string;
    details?: string;
    industryExperience?: string;
    companyExperience?: string;
    applicantSource?: string;
    citizenship?: string;
    certification?: string;
  };
  history: {
    workHistory: { company: string; from: string; to: string }[];
    educationHistory: { school: string; degree: string; field: string; from: string; to: string }[];
  };
  additional: {
    tagsRating: number;
    hotlist: boolean;
    resumeText: string;
  };
}

// Mock talent data for demonstration
// Expanded to include all fields from the form
const talents = ref<Talent[]>([
  {
    id: '1',
    personal: {
      firstName: 'Abdul',
      lastName: 'Ahad',
      headline: 'Senior Software Engineer specializing in Vue.js',
      country: 'United States of America',
      address: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '90210',
      mobilePhone: '555-123-4567', email1: 'alice.smith@example.com',
      homeOffice: 'Remote', geoCode: 'GEO-001', schoolDistrict: 'Springfield',
      workPhone: '555-987-6543', homePhone: '', email2: '', ssn: 'XXX-XX-1234',
    },
    employment: {
      employmentType: 'Full-time', linkedinProfile: 'https://linkedin.com/in/alice', personalSite: 'https://alice.dev',
      custom1: 'High Performer', custom2: 'Team Lead Potential',
      talentStatus: 'Candidate', positionCategory: 'Software Engineer', skillSet: 'Vue.js, JavaScript, Node.js',
      applicantTags: 'Frontend, Web, Agile', details: 'Highly skilled and motivated.',
      industryExperience: 'Tech, FinTech', companyExperience: 'Google, Apple', applicantSource: 'Referral',
      citizenship: 'US Citizen', certification: 'AWS Certified Developer',
    },
    history: {
      workHistory: [
        { company: 'Tech Solutions Inc.', from: '2020-01-15', to: 'Present' },
        { company: 'Web Dev Co.', from: '2017-06-01', to: '2019-12-31' },
      ],
      educationHistory: [
        { school: 'University of XYZ', degree: 'B.S.', field: 'Computer Science', from: '2013-09-01', to: '2017-05-30' },
      ],
    },
    additional: {
      tagsRating: 5, hotlist: true, resumeText: 'Highly experienced software engineer with a strong background in frontend development and a passion for building scalable web applications. Proven ability to lead projects and mentor junior developers. Seeking challenging roles in innovative environments.'
    },
  },
  {
    id: '2',
    personal: {
      firstName: 'Bob',
      lastName: 'Johnson',
      headline: 'Product Manager with AI/ML experience',
      country: 'Canada',
      address: '456 Oak Ave', city: 'Vancouver', state: 'BC', zipCode: 'V6B 1C1',
      mobilePhone: '604-111-2222', email1: 'bob.johnson@example.com',
    },
    employment: {
      talentStatus: 'Applicant', positionCategory: 'Product Manager', skillSet: 'Product Management, AI, UX Design',
    },
    history: { workHistory: [], educationHistory: [] },
    additional: { tagsRating: 4, hotlist: false, resumeText: '' },
  },
  {
    id: '3',
    personal: {
      firstName: 'Charlie',
      lastName: 'Brown',
      headline: 'Data Scientist passionate about Big Data',
      country: 'India',
      address: '789 Pine Rd', city: 'Mumbai', state: 'MH', zipCode: '400001',
      mobilePhone: '+91 98765 43210', email1: 'charlie.brown@example.com',
    },
    employment: {
      talentStatus: 'Employee', positionCategory: 'Data Scientist', skillSet: 'Python, R, Machine Learning',
    },
    history: { workHistory: [], educationHistory: [] },
    additional: { tagsRating: 5, hotlist: true, resumeText: 'An accomplished data scientist with expertise in statistical modeling, machine learning, and big data technologies. Adept at transforming complex datasets into actionable insights. Strong communication and collaboration skills.' },
  },
  {
    id: '4',
    personal: {
      firstName: 'Diana',
      lastName: 'Prince',
      headline: 'Experienced UX Designer and Researcher',
      country: 'United Kingdom',
      address: '10 Downing St', city: 'London', state: '', zipCode: 'SW1A 2AA',
      mobilePhone: '+44 7911 123456', email1: 'diana.prince@example.com',
    },
    employment: {
      talentStatus: 'Candidate', positionCategory: 'UX Designer', skillSet: 'User Research, Figma, Prototyping',
    },
    history: { workHistory: [], educationHistory: [] },
    additional: { tagsRating: 4, hotlist: false, resumeText: '' },
  },
]);

// Search and Filter State
const searchTerm = ref('');
const filterStatus = ref('');
const filterCategory = ref('');
const filterSkill = ref('');

// Computed property for filtered talents
const filteredTalents = computed(() => {
  return talents.value.filter(talent => {
    // Search by name or headline
    const matchesSearch = searchTerm.value === '' ||
      talent.personal.firstName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      talent.personal.lastName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      talent.personal.headline.toLowerCase().includes(searchTerm.value.toLowerCase());

    // Filter by status
    const matchesStatus = filterStatus.value === '' ||
      talent.employment.talentStatus === filterStatus.value;

    // Filter by category
    const matchesCategory = filterCategory.value === '' ||
      talent.employment.positionCategory === filterCategory.value;

    // Filter by skill (check if skillSet string contains the filtered skill)
    const matchesSkill = filterSkill.value === '' ||
      talent.employment.skillSet.toLowerCase().includes(filterSkill.value.toLowerCase());

    return matchesSearch && matchesStatus && matchesCategory && matchesSkill;
  });
});

// Modal State and Functions
const showProfileModal = ref(false);
const selectedTalent = ref<Talent | null>(null);

const viewTalent = (talent: Talent) => {
  selectedTalent.value = talent;
  showProfileModal.value = true;
};

const closeProfileModal = () => {
  showProfileModal.value = false;
  selectedTalent.value = null;
};

// Function to get appropriate class for talent status
const getStatusClass = (status: string) => {
  switch (status) {
    case 'Applicant':
      return 'bg-blue-100 text-blue-800';
    case 'Candidate':
      return 'bg-purple-100 text-purple-800';
    case 'Employee':
      return 'bg-green-100 text-green-800';
    case 'Hired':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
</script>

<style scoped>
/* Base font for consistency with design reference */
.font-sans {
  font-family: 'Inter', sans-serif;
}
</style>
