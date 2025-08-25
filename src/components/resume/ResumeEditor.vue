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
            <input type="text" :value="data.personal.firstName" @input="updateData('personal.firstName', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Last Name</label>
            <input type="text" :value="data.personal.lastName" @input="updateData('personal.lastName', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-600">Headline</label>
            <input type="text" :value="data.personal.headline" @input="updateData('personal.headline', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" :value="data.personal.email1" @input="updateData('personal.email1', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">City</label>
            <input type="text" :value="data.personal.city" @input="updateData('personal.city', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">State</label>
            <input type="text" :value="data.personal.state" @input="updateData('personal.state', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
        </div>
      </div>
      
      <div class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-700">Employment & Skills</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">LinkedIn Profile</label>
            <input type="text" :value="data.employment.linkedinProfile" @input="updateData('employment.linkedinProfile', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-600">Skill Set (comma separated)</label>
            <input type="text" :value="data.employment.skillSet" @input="updateData('employment.skillSet', ($event.target as HTMLInputElement).value)" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
        </div>
      </div>
      
      <div class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-700">Work & Education History</h3>
        <div class="space-y-4 border border-gray-200 rounded-lg p-4">
          <h4 class="text-lg font-medium text-gray-700 flex justify-between items-center">
            Work History
            <button type="button" @click="addRow('workHistory')" class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">Add</button>
          </h4>
          <div v-for="(work, index) in data.history.workHistory" :key="index" class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md relative">
            <input type="text" placeholder="Company" :value="work.company" @input="updateArrayField('workHistory', index, 'company', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <input type="text" placeholder="Position" :value="work.position" @input="updateArrayField('workHistory', index, 'position', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <textarea placeholder="Description" :value="work.description" @input="updateArrayField('workHistory', index, 'description', ($event.target as HTMLTextAreaElement).value)" class="md:col-span-2 p-2 border rounded-md w-full" rows="3"></textarea>
            <input type="text" placeholder="From (YYYY-MM)" :value="work.from" @input="updateArrayField('workHistory', index, 'from', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <input type="text" placeholder="To (YYYY-MM or Present)" :value="work.to" @input="updateArrayField('workHistory', index, 'to', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <button @click="removeRow('workHistory', index)" class="absolute top-1 right-1 text-red-500">&times;</button>
          </div>
        </div>
        <div class="space-y-4 border border-gray-200 rounded-lg p-4">
          <h4 class="text-lg font-medium text-gray-700 flex justify-between items-center">
            Education History
            <button type="button" @click="addRow('educationHistory')" class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">Add</button>
          </h4>
          <div v-for="(edu, index) in data.history.educationHistory" :key="index" class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md relative">
            <input type="text" placeholder="School" :value="edu.school" @input="updateArrayField('educationHistory', index, 'school', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <input type="text" placeholder="Degree" :value="edu.degree" @input="updateArrayField('educationHistory', index, 'degree', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <input type="text" placeholder="From (YYYY-MM)" :value="edu.from" @input="updateArrayField('educationHistory', index, 'from', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <input type="text" placeholder="To (YYYY-MM)" :value="edu.to" @input="updateArrayField('educationHistory', index, 'to', ($event.target as HTMLInputElement).value)" class="p-2 border rounded-md w-full" />
            <button @click="removeRow('educationHistory', index)" class="absolute top-1 right-1 text-red-500">&times;</button>
          </div>
        </div>
      </div>
      
      <div class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-700">Additional Information</h3>
        <div>
          <label class="block text-sm font-medium text-gray-600">Summary / Resume Text</label>
          <textarea :value="data.additional.resumeText" @input="updateData('additional.resumeText', ($event.target as HTMLTextAreaElement).value)" rows="6" class="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
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
import type { WorkHistoryItem, EducationHistoryItem } from '../../types/resume';
import type { FormData } from '../../types/resume';
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
  }
}

// Functions to handle dynamic lists
function addRow(field: 'workHistory' | 'educationHistory') {
  if (field === 'workHistory') {
    props.data.history.workHistory.push({ company: '', position: '', description: '', from: '', to: '' });
  } else {
    props.data.history.educationHistory.push({ school: '', degree: '', from: '', to: '' });
  }
}

function removeRow(field: 'workHistory' | 'educationHistory', index: number) {
  props.data.history[field].splice(index, 1);
}

function updateArrayField<T>(field: 'workHistory' | 'educationHistory', index: number, subField: keyof T, value: string) {
  (props.data.history[field][index] as T)[subField as keyof T] = value as T[keyof T];
}

</script>