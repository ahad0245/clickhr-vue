<template>
  <div class="bg-gray-50 min-h-screen font-sans rounded-lg shadow-md">
    <div class="container mx-auto p-4 sm:p-6 lg:p-8">
      <div class="mb-6">
        <h1 class="text-3xl font-semibold text-gray-700 mb-2">Find Your Next Opportunity</h1>
        <p class="text-gray-500">Search through thousands of open roles to find your perfect match.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside class="lg:col-span-1">
          <div class="bg-white p-6 rounded-xl shadow-lg sticky top-8">
            <h2 class="text-xl font-bold text-gray-700 mb-4 border-b pb-3">Search For Jobs</h2>
            <div class="space-y-6">
              <div>
                <label for="keywords" class="block text-sm font-semibold text-gray-600 mb-2">Keywords</label>
                <input 
                  type="text" 
                  id="keywords" 
                  v-model="filters.keywords"
                  placeholder="Job title, company..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              
              <div>
                <label for="location" class="block text-sm font-semibold text-gray-600 mb-2">Location</label>
                <input 
                  type="text" 
                  id="location"
                  v-model="filters.location"
                  placeholder="City, Country Code..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label for="job-type" class="block text-sm font-semibold text-gray-600 mb-2">Contract Type</label>
                <select 
                  id="job-type"
                  v-model="filters.type"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label for="work-model" class="block text-sm font-semibold text-gray-600 mb-2">Job Type</label>
                <select 
                  id="work-model"
                  v-model="filters.workModel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
                >
                  <option value="">All Models</option>
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

            </div>
          </div>
        </aside>

        <main class="lg:col-span-3">
          <div class="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-lg">
            <p class="text-gray-600 mb-2 sm:mb-0">Showing <span class="font-bold text-gray-800">{{ filteredJobs.length }}</span> jobs</p>
            <div class="flex items-center space-x-2">
              <span class="text-sm font-semibold text-gray-600">View:</span>
              <button @click="viewMode = 'card'" :class="['p-2 rounded-lg transition-colors', viewMode === 'card' ? 'bg-primary text-white shadow' : 'bg-gray-200 text-gray-600 hover:bg-gray-300']">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button @click="viewMode = 'list'" :class="['p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-primary text-white shadow' : 'bg-gray-200 text-gray-600 hover:bg-gray-300']">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
              </button>
            </div>
          </div>

          <div v-if="viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <router-link v-for="job in filteredJobs" :key="job.id" :to="`/jobs/${job.id}`" class="block bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
              <div class="flex flex-col h-full">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-start">
                    <img :src="job.logoUrl" :alt="`${job.company} logo`" class="h-14 w-14 rounded-lg mr-4 object-contain" />
                    <div>
                      <h3 class="text-xl font-bold text-gray-800 group-hover:text-indigo-600">{{ job.title }}</h3>
                      <p class="text-gray-500 font-medium">{{ job.company }}</p>
                    </div>
                  </div>
                  <button @click.prevent="toggleSaveJob(job.id)" class="p-2 rounded-full hover:bg-indigo-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="isJobSaved(job.id) ? 'text-indigo-600 fill-current' : 'text-gray-400'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
                <p class="text-gray-600 flex-grow">{{ job.shortDescription }}</p>
                <div class="flex flex-wrap gap-2 my-4">
                    <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{{ job.type }}</span>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{{ job.workModel }}</span>
                    <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{{ job.location }}</span>
                </div>
                <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <p class="text-sm text-gray-400">{{ job.postedDate }}</p>
                  <span class="text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Details &rarr;</span>
                </div>
              </div>
            </router-link>
          </div>

          <div v-if="viewMode === 'list'" class="space-y-4">
            <router-link v-for="job in filteredJobs" :key="job.id" :to="`/jobs/${job.id}`" class="bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 group">
              <div class="flex items-center mb-4 sm:mb-0 w-full sm:w-1/2">
                <img :src="job.logoUrl" :alt="`${job.company} logo`" class="h-12 w-12 rounded-lg mr-4 object-contain" />
                <div>
                  <h3 class="text-lg font-bold text-gray-800 group-hover:text-indigo-600">{{ job.title }}</h3>
                  <p class="text-gray-500 font-medium">{{ job.company }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {{ job.location }}
                </span>
                <span class="hidden md:flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {{ job.type }}
                </span>
              </div>
              <div class="mt-4 sm:mt-0 flex items-center space-x-4">
                <p class="text-sm text-gray-400">{{ job.postedDate }}</p>
                <button @click.prevent="toggleSaveJob(job.id)" class="p-2 rounded-full hover:bg-indigo-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="isJobSaved(job.id) ? 'text-indigo-600 fill-current' : 'text-gray-400'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </router-link>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// --- TYPE DEFINITIONS (MODIFIED) ---
interface Job {
  id: number;
  title: string;
  company: string;
  logoUrl: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship'; // Removed 'Contract' as per request
  workModel: 'Remote' | 'On-site' | 'Hybrid'; // NEW: Work model property
  postedDate: string;
  shortDescription: string;
}

interface Filters {
  keywords: string;
  location: string;
  type: '' | 'Full-time' | 'Part-time' | 'Internship';
  workModel: '' | 'Remote' | 'On-site' | 'Hybrid'; // NEW: Work model filter state
}

// --- REACTIVE STATE ---
const viewMode = ref<'card' | 'list'>('card');

// MODIFIED: Added workModel to filters
const filters = reactive<Filters>({
  keywords: '',
  location: '',
  type: '',
  workModel: '',
});

// MODIFIED: Updated mock data with new properties and structure
const allJobs = reactive<Job[]>([
  {
    id: 1,
    title: 'Senior Vue.js Developer',
    company: 'Innovatech Solutions',
    logoUrl: 'https://dummyimage.com/150x150/92C950/ffffff&text=V',
    location: 'New York, US',
    type: 'Full-time',
    workModel: 'Remote',
    postedDate: '2d ago',
    shortDescription: 'Join our team to build next-gen web applications with Vue 3, TypeScript, and Pinia.'
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Creative Minds',
    logoUrl: 'https://dummyimage.com/150x150/f97316/ffffff&text=C',
    location: 'Karachi, PK',
    type: 'Part-time',
    workModel: 'Hybrid',
    postedDate: '5d ago',
    shortDescription: 'We are looking for a talented designer to create amazing user experiences for our clients.'
  },
  {
    id: 3,
    title: 'Backend Go Engineer',
    company: 'DataFlow Systems',
    logoUrl: 'https://dummyimage.com/150x150/3b82f6/ffffff&text=D',
    location: 'Lahore, PK', 
    type: 'Full-time',
    workModel: 'On-site',
    postedDate: '1w ago',
    shortDescription: 'Design and implement scalable microservices using Go and modern cloud technologies.'
  },
  {
    id: 4,
    title: 'Marketing Intern',
    company: 'Growth Co.',
    logoUrl: 'https://dummyimage.com/150x150/ef4444/ffffff&text=G',
    location: 'London, UK',
    type: 'Internship',
    workModel: 'Hybrid',
    postedDate: '1w ago',
    shortDescription: 'An exciting opportunity for a student to learn about digital marketing and content strategy.'
  },
]);

// --- NEW: COMPUTED PROPERTY FOR FILTERING ---
const filteredJobs = computed(() => {
  return allJobs.filter(job => {
    const keywordMatch = filters.keywords.trim() === '' || 
                         job.title.toLowerCase().includes(filters.keywords.toLowerCase()) || 
                         job.company.toLowerCase().includes(filters.keywords.toLowerCase());

    const locationMatch = filters.location.trim() === '' || 
                          job.location.toLowerCase().includes(filters.location.toLowerCase());

    const typeMatch = filters.type === '' || job.type === filters.type;

    const workModelMatch = filters.workModel === '' || job.workModel === filters.workModel;

    return keywordMatch && locationMatch && typeMatch && workModelMatch;
  });
});


// State for saved jobs. In a real app, this might come from a store like Pinia.
const savedJobs = reactive<Set<number>>(new Set([2]));

// --- METHODS ---
const isJobSaved = (jobId: number): boolean => {
  return savedJobs.has(jobId);
};

const toggleSaveJob = (jobId: number) => {
  if (savedJobs.has(jobId)) {
    savedJobs.delete(jobId);
  } else {
    savedJobs.add(jobId);
  }
};
</script>