<template>
  <div class="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
    <div class="container mx-auto max-w-7xl">

      <div class="mb-6">
        <router-link to="/candidate/jobs" class="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2 transition-colors">

        <!-- <a href="#" class="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2 transition-colors"> -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Back to Jobs
        <!-- </a> --> 
        </router-link>
      </div>

      <div v-if="isLoading" class="text-center py-12">
        <p class="text-gray-500">Loading job details...</p>
      </div>

      <div v-else-if="error" class="text-center py-12 bg-red-50 p-6 rounded-lg">
        <h2 class="text-2xl font-bold text-red-700">Job Not Found</h2>
        <p class="text-red-600 mt-2">{{ error }}</p>
      </div>

      <div v-else-if="job" class="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        <div class="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-start">
              <img :src="job.logoUrl" :alt="`${job.company} logo`" class="h-16 w-16 rounded-lg mr-5 object-contain border" />
              <div>
                <h1 class="text-3xl font-extrabold text-gray-900">{{ job.title }}</h1>
                <a :href="job.companyWebsite" target="_blank" class="text-lg font-medium text-indigo-600 hover:underline">{{ job.company }}</a>
                <p class="text-gray-500 mt-1">{{ job.location }}</p>
              </div>
            </div>
             <button @click.prevent="toggleSaveJob(job.id)" class="p-2 rounded-full hover:bg-indigo-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="isJobSaved(job.id) ? 'text-indigo-600 fill-current' : 'text-gray-400'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
             </button>
          </div>
          
          <div class="prose max-w-none prose-indigo">
            <p class="lead">{{ job.fullDescription }}</p>
            
            <h3>Responsibilities</h3>
            <ul>
              <li v-for="(item, index) in job.responsibilities" :key="index">{{ item }}</li>
            </ul>

            <h3>Qualifications</h3>
            <ul>
              <li v-for="(item, index) in job.qualifications" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>

        <aside class="lg:col-span-1 mt-8 lg:mt-0">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Job Summary</h2>
            <div class="space-y-4 text-gray-700">
              <div class="flex items-center">
                <span class="text-indigo-500 mr-3">💰</span>
                <div>
                  <p class="font-semibold">Salary</p>
                  <p>{{ job.salary }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <span class="text-indigo-500 mr-3">📍</span>
                <div>
                  <p class="font-semibold">Location</p>
                  <p>{{ job.location }}</p>
                </div>
              </div>
              <div class="flex items-center">
                 <span class="text-indigo-500 mr-3">📄</span>
                <div>
                  <p class="font-semibold">Job Type</p>
                  <p>{{ job.type }}</p>
                </div>
              </div>
               <div class="flex items-center">
                 <span class="text-indigo-500 mr-3">🗓️</span>
                <div>
                  <p class="font-semibold">Date Posted</p>
                  <p>{{ job.postedDate }}</p>
                </div>
              </div>
            </div>

            <div class="mt-6 space-y-3">
              <button @click="openApplyModal" class="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md">
                Apply Now
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>

  <div v-if="showApplyModal && job" @click.self="closeApplyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
    <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md m-4">
      <h2 class="text-2xl font-bold text-gray-800">Apply for {{ job.title }}</h2>
      <p class="text-gray-500 mb-6">Select a resume to submit for this role.</p>
      
      <div class="space-y-4">
        <div>
          <label for="resume-select" class="block text-sm font-semibold text-gray-600 mb-2">Your Resumes</label>
          <select v-model="selectedResumeId" id="resume-select" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white">
            <option disabled value="">Please select a resume</option>
            <option v-for="resume in userResumes" :key="resume.id" :value="resume.id">
              {{ resume.fileName }} ({{ resume.uploadDate }})
            </option>
          </select>
        </div>
        
        <div class="pt-4 flex justify-end space-x-3">
          <button @click="closeApplyModal" class="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
          <button @click="submitApplication" :disabled="!selectedResumeId" class="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed">
            Submit Application
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// --- TYPE DEFINITIONS ---
interface JobDetail {
  id: number;
  title: string;
  company: string;
  logoUrl: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  postedDate: string;
  salary: string;
  fullDescription: string;
  responsibilities: string[];
  qualifications: string[];
  companyWebsite: string;
}

interface Resume {
  id: number;
  fileName: string;
  uploadDate: string;
}

// --- PROPS ---
// In a real app, you'd get this from Vue Router's route params.
const props = defineProps<{
  jobId: number;
}>();

// --- REACTIVE STATE ---
const job = ref<JobDetail | null>(null);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);
const showApplyModal = ref(false);
const selectedResumeId = ref<number | ''>('');

// In a real app, this state would be managed globally with a store like Pinia
// to ensure it's consistent across components.
const savedJobs = reactive<Set<number>>(new Set([2]));

// Mock user resume data
const userResumes = reactive<Resume[]>([
  { id: 101, fileName: 'Software_Engineer_Resume_2025.pdf', uploadDate: 'Jul 2025' },
  { id: 102, fileName: 'Frontend_Specialist_Resume_Vue.pdf', uploadDate: 'Jun 2025' },
  { id: 103, fileName: 'General_Tech_Profile.pdf', uploadDate: 'Jan 2025' },
]);

// --- MOCK DATA SOURCE ---
const allJobs: JobDetail[] = [
  {
    id: 1,
    title: 'Senior Vue.js Developer',
    company: 'Innovatech Solutions',
    logoUrl: 'https://via.placeholder.com/150/92C950/FFFFFF?text=I',
    location: 'Remote',
    type: 'Full-time',
    postedDate: '2d ago',
    salary: '$120,000 - $150,000 USD',
    fullDescription: 'Innovatech Solutions is at the forefront of digital transformation. We are seeking an experienced Vue.js Developer to lead the development of our flagship single-page application, contributing to a high-performance, user-centric platform.',
    responsibilities: [
      'Develop and maintain user-facing features using Vue.js and TypeScript.',
      'Collaborate with product managers and UI/UX designers to translate designs into technical solutions.',
      'Optimize components for maximum performance across a vast array of web-capable devices and browsers.',
      'Mentor junior developers and conduct code reviews.',
    ],
    qualifications: [
      '5+ years of professional experience in frontend development.',
      'Expertise in Vue.js (Vue 3 preferred) and its core principles.',
      'Strong proficiency in TypeScript, HTML5, and CSS3.',
      'Experience with state management libraries like Pinia or Vuex.',
      'Familiarity with RESTful APIs and modern authorization mechanisms.',
    ],
    companyWebsite: '#',
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Creative Minds',
    logoUrl: 'https://via.placeholder.com/150/F97316/FFFFFF?text=C',
    location: 'Karachi, PK',
    type: 'Contract',
    postedDate: '5d ago',
    salary: 'Competitive Hourly Rate',
    fullDescription: 'Creative Minds is a design agency that helps startups and established companies create beautiful and intuitive digital products. We are looking for a freelance UX/UI designer for a 3-month contract.',
    responsibilities: [
      'Create wireframes, storyboards, user flows, and site maps.',
      'Design graphic user interface elements, like menus, tabs, and widgets.',
      'Adhere to style standards on fonts, colors, and images.',
    ],
    qualifications: [
      'Proven UX/UI design experience with a strong portfolio.',
      'Proficiency in Figma, Sketch, or Adobe XD.',
      'Excellent visual design skills with sensitivity to user-system interaction.',
    ],
    companyWebsite: '#',
  }
];

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  fetchJobDetails(props.jobId);
});

// --- METHODS ---
const fetchJobDetails = (id: number) => {
  isLoading.value = true;
  error.value = null;

  setTimeout(() => {
    const foundJob = allJobs.find(j => j.id === id);
    if (foundJob) {
      job.value = foundJob;
    } else {
      error.value = `No job could be found with the ID "${id}". Please check the ID and try again.`;
    }
    isLoading.value = false;
  }, 500);
};

const isJobSaved = (jobId: number): boolean => savedJobs.has(jobId);

const toggleSaveJob = (jobId: number) => {
  if (savedJobs.has(jobId)) {
    savedJobs.delete(jobId);
  } else {
    savedJobs.add(jobId);
  }
};

const openApplyModal = () => {
  selectedResumeId.value = '';
  showApplyModal.value = true;
};

const closeApplyModal = () => {
  showApplyModal.value = false;
};

const submitApplication = () => {
  if (!selectedResumeId.value || !job.value) return;

  const selectedResume = userResumes.find(r => r.id === selectedResumeId.value);
//   alert(`Successfully submitted "${selectedResume?.fileName}" for the role of "${job.value.title}"!`);
toast.success(`Successfully submitted for the role of "${job.value.title}"!`);
  
  console.log({
    jobId: job.value.id,
    resumeId: selectedResumeId.value,
  });
  
  closeApplyModal();
};
</script>

<style scoped>
/* Using the Tailwind Typography plugin via the 'prose' class for beautiful article styling */
.prose ul > li::before {
  background-color: #4f46e5; /* indigo-600 */
}
</style>