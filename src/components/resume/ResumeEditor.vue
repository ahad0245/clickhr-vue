<template>
  <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
    <div class="p-6 border-b flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Edit Applicant Data</h2>
      <button @click="emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
    </div>
    
    <div class="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
      <div class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-700">Personal & Contact Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">First Name</label>
            <input type="text" :value="data.personal.first_name" @input="updateData('personal.first_name', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Last Name</label>
            <input type="text" :value="data.personal.last_name" @input="updateData('personal.last_name', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-600">Headline</label>
            <input type="text" :value="data.personal.headline" @input="updateData('personal.headline', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" :value="data.personal.email_0" @input="updateData('personal.email_0', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">City</label>
            <input type="text" :value="data.personal.city" @input="updateData('personal.city', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">State/Province/Region</label>
            <input type="text" :value="data.personal.state_province_region" @input="updateData('personal.state_province_region', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
        </div>
      </div>
      
      <div class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-700">Employment & Skills</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">LinkedIn Profile</label>
            <input type="text" :value="data.online_presence.linked_in_profile" @input="updateData('online_presence.linked_in_profile', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-600">Skill Set (comma separated)</label>
            <input type="text" :value="data.employment.applicant_tags" @input="updateData('employment.applicant_tags', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
        </div>
      </div>
      
      <div class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-700">Work & Education History</h3>
        <div class="space-y-4 border border-gray-200 rounded-lg p-4">
          <h4 class="text-lg font-medium text-gray-700 flex justify-between items-center">
            Work History
            <button type="button" @click="addRow('work_history')" class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">Add</button>
          </h4>
          <div v-for="(work, index) in data.history.work_history" :key="index" class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md relative">
            <input type="text" placeholder="Company" :value="work.company_name" @input="updateArrayField('work_history', index, 'company_name', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <input type="text" placeholder="Job Title" :value="work.job_title" @input="updateArrayField('work_history', index, 'job_title', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <textarea placeholder="Description" :value="work.job_description" @input="updateArrayField('work_history', index, 'job_description', ($event.target as HTMLTextAreaElement).value)" class="md:col-span-2 p-2 border rounded-md w-full" rows="3"></textarea>
            <input type="date" placeholder="Start Date" :value="work.start_date" @input="updateArrayField('work_history', index, 'start_date', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <input type="date" placeholder="End Date" :value="work.end_date" @input="updateArrayField('work_history', index, 'end_date', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <button @click="removeRow('work_history', index)" class="absolute top-1 right-1 text-red-500">&times;</button>
          </div>
        </div>
        <div class="space-y-4 border border-gray-200 rounded-lg p-4">
          <h4 class="text-lg font-medium text-gray-700 flex justify-between items-center">
            Education History
            <button type="button" @click="addRow('education_history')" class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">Add</button>
          </h4>
          <div v-for="(edu, index) in data.history.education_history" :key="index" class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md relative">
            <input type="text" placeholder="Institution Name" :value="edu.institution_name" @input="updateArrayField('education_history', index, 'institution_name', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <input type="text" placeholder="Degree" :value="edu.degree" @input="updateArrayField('education_history', index, 'degree', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <input type="date" placeholder="Start Date" :value="edu.start_date" @input="updateArrayField('education_history', index, 'start_date', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <input type="date" placeholder="End Date" :value="edu.end_date" @input="updateArrayField('education_history', index, 'end_date', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <button @click="removeRow('education_history', index)" class="absolute top-1 right-1 text-red-500">&times;</button>
          </div>
        </div>
      </div>
      
      <div class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-700">Additional Information</h3>
        <div>
          <label class="block text-sm font-medium text-gray-600">Summary / Resume Text</label>
          <textarea :value="data.additional.resume_text" @input="updateData('additional.resume_text', ($event.target as HTMLTextAreaElement).value)" rows="6" class="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
        </div>
      </div>
    </div>
    
    <div class="p-6 border-t bg-gray-50 flex justify-end">
      <button @click="emit('close')" class="px-6 py-2 bg-gray-300 text-gray-800 rounded-md mr-3 hover:bg-gray-400">Cancel</button>
      <button @click="emit('save')" class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save Changes</button>
    </div>
  </div>
</template>

<script setup lang="ts">
 import { defineProps, defineEmits } from 'vue';
import type { FormData } from '@/types/resume';
const props = defineProps<{
  data: FormData;
}>();

const emit = defineEmits(['update:data', 'close', 'save']);

// Generic function to update a nested property using a string path
function updateData(path: string, value: string) {
  const [parent, child] = path.split('.');
  if (parent === 'personal') {
    (props.data.personal as any)[child] = value;
  } else if (parent === 'employment') {
    (props.data.employment as any)[child] = value;
  } else if (parent === 'additional') {
    (props.data.additional as any)[child] = value;
  } else if (parent === 'online_presence') {
    (props.data.online_presence as any)[child] = value;
  }
}

// Functions to handle dynamic lists
function addRow(field: 'work_history' | 'education_history') {
  if (field === 'work_history') {
    props.data.history.work_history.push({ company_name: '', job_title: '', job_description: '', start_date: '', end_date: '', is_current_job: false, job_location: '', job_type: '', job_status: '' });
  } else {
    props.data.history.education_history.push({ institution_name: '', degree: '', field_of_study: '', start_date: '', end_date: '', is_current_education: false, education_location: '', education_status: '' });
  }
}

function removeRow(field: 'work_history' | 'education_history', index: number) {
  props.data.history[field].splice(index, 1);
}

function updateArrayField<T>(field: 'work_history' | 'education_history', index: number, subField: keyof T, value: string) {
  (props.data.history[field][index] as T)[subField as keyof T] = value as T[keyof T];
}
</script>
