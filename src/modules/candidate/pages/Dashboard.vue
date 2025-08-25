<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans rounded-lg shadow-md">
    <div class="lg:col-span-3">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Hi, {{ candidate.name }} 👋</h1>
        <p class="text-gray-500">Here's your job search summary for today.</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-700">Profile Completion</h2>
            <span class="text-lg font-bold text-indigo-600">{{ profileCompleteness }}%</span>
        </div>
        <p class="text-sm text-gray-500 mt-1 mb-3">A complete profile increases your chances of getting noticed by 40%.</p>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-primary h-2.5 rounded-full" :style="{ width: `${profileCompleteness}%` }"></div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md">
        <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-700">My Applications</h2>
            <p class="text-sm text-gray-500 mt-1">Track the status of jobs you've applied for.</p>
        </div>
        <ul class="divide-y divide-gray-200">
            <li v-for="app in applications" :key="app.id" class="py-2 px-6  hover:bg-gray-50 transition-colors duration-200">
                <div class="flex flex-wrap items-center justify-between">
                    <div class="w-full sm:w-auto sm:flex-1 mb-4 sm:mb-0">
                        <p class="text-lg font-semibold text-gray-800">{{ app.jobTitle }}</p>
                        <p class="text-sm text-gray-500">{{ app.company }}</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-400">{{ app.dateApplied }}</span>
                        <span :class="getStatusClass(app.status)" class="text-xs font-semibold px-3 py-1 rounded-full">
                            {{ app.status }}
                        </span>
                    </div>
                </div>
            </li>
        </ul>
      </div>

    </div>

    <div class="lg:col-span-1">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">Upcoming Interviews</h2>
        <div v-if="upcomingInterviews.length > 0" class="space-y-4">
            <div v-for="interview in upcomingInterviews" :key="interview.id" class="flex items-start space-x-4">
                <div class="bg-indigo-100 text-indigo-600 p-2 rounded-lg flex flex-col items-center">
                    <span class="font-bold text-sm">{{ new Date(interview.date).toLocaleString('en-US', { month: 'short' }) }}</span>
                    <span class="text-xl font-extrabold">{{ new Date(interview.date).getDate() }}</span>
                </div>
                <div>
                    <p class="font-semibold text-gray-800">{{ interview.jobTitle }}</p>
                    <p class="text-sm text-gray-500">{{ interview.company }}</p>
                    <p class="text-sm text-gray-500">{{ interview.time }} - {{ interview.type }}</p>
                </div>
            </div>
        </div>
        <p v-else class="text-sm text-gray-400">No interviews scheduled yet.</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">Recommended Jobs</h2>
        <div class="space-y-4">
            <div v-for="job in recommendedJobs" :key="job.id" class="p-4 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors duration-200">
                <p class="font-semibold text-gray-800">{{ job.title }}</p>
                <p class="text-sm text-gray-500">{{ job.company }} - {{ job.location }}</p>
                <router-link to="/candidate/jobs" class="">
                <button class="w-full text-center mt-3 bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary">
                    View Details
                </button>
                </router-link>
                 
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// --- TYPE DEFINITIONS ---
interface Candidate {
  name: string;
  email: string;
}

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  dateApplied: string;
  status: 'Applied' | 'In Review' | 'Interview' | 'Offered' | 'Rejected';
}

interface Interview {
    id: number;
    jobTitle: string;
    company: string;
    date: string;
    time: string;
    type: 'Phone Screen' | 'Video Call' | 'On-site';
}

interface RecommendedJob {
    id: number;
    title: string;
    company: string;
    location: string;
}

// --- REACTIVE DATA ---
const candidate = reactive<Candidate>({
  name: 'Abdul Ahad',
  email: 'alex.doe@example.com',
});

const profileCompleteness = ref<number>(75);

const applications = reactive<Application[]>([
  { id: 1, jobTitle: 'Senior Frontend Developer', company: 'Innovatech', dateApplied: 'July 10, 2025', status: 'In Review' },
  { id: 2, jobTitle: 'UI/UX Designer', company: 'Creative Solutions', dateApplied: 'July 8, 2025', status: 'Interview' },
  { id: 3, jobTitle: 'Full-Stack Engineer', company: 'Data Systems Inc.', dateApplied: 'July 5, 2025', status: 'Rejected' },
  { id: 4, jobTitle: 'Vue.js Specialist', company: 'NextGen Apps', dateApplied: 'July 2, 2025', status: 'Applied' },
]);

const upcomingInterviews = reactive<Interview[]>([
    { id: 1, jobTitle: 'UI/UX Designer', company: 'Creative Solutions', date: '2025-07-21T10:00:00Z', time: '10:00 AM', type: 'Video Call' }
]);

const recommendedJobs = reactive<RecommendedJob[]>([
    { id: 1, title: 'Lead Product Designer', company: 'PixelPerfect', location: 'Remote'},
    { id: 2, title: 'TypeScript Developer', company: 'CodeCrafters', location: 'San Francisco, CA'}
]);


// --- HELPER FUNCTIONS ---
const getStatusClass = (status: Application['status']): string => {
  const statusMap: Record<Application['status'], string> = {
    'Applied': 'bg-blue-100 text-blue-800',
    'In Review': 'bg-yellow-100 text-yellow-800',
    'Interview': 'bg-purple-100 text-purple-800',
    'Offered': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800';
};

</script>

<style scoped>
/* Scoped styles can be added here if needed, but this design relies primarily on Tailwind CSS classes. */
</style>r