<script setup>
import { reactive, ref, watch } from 'vue';
import { Country, State, City } from 'country-state-city';

const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');

const openModal = (title, message) => {
  modalTitle.value = title;
  modalMessage.value = message;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  modalTitle.value = '';
  modalMessage.value = '';
};

const form = reactive({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  role_id: '',
  backoffice_users_status: 'active',
  is_super_admin: false,
  mobile_phone: '',
  city: '',
  country: '',
  state: ''
});

const countries = Country.getAllCountries();
const selectedCountry = ref('');
const selectedState = ref('');
const states = ref([]);
const cities = ref([]);

watch(selectedCountry, (newCountry) => {
  states.value = State.getStatesOfCountry(newCountry);
  selectedState.value = '';
  cities.value = [];
  form.country = countries.find(c => c.isoCode === newCountry)?.name || '';
});

watch(selectedState, (newState) => {
  cities.value = City.getCitiesOfState(selectedCountry.value, newState);
  form.state = states.value.find(s => s.isoCode === newState)?.name || '';
});

const handleSubmit = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    openModal('Validation Error', 'Invalid email format. Please enter a valid email address.');
    return;
  }

  try {
    console.log('Sending data to API...', JSON.parse(JSON.stringify(form)));
    await new Promise(resolve => setTimeout(resolve, 1000));
    openModal('Success!', 'User created successfully!');
    Object.assign(form, {
      email: '', password: '', first_name: '', last_name: '', role_id: '',
      backoffice_users_status: 'active', is_super_admin: false,
      mobile_phone: '', city: '', country: '', state: ''
    });
    selectedCountry.value = '';
    selectedState.value = '';
    states.value = [];
    cities.value = [];
  } catch (err) {
    console.error('Error creating user:', err);
    openModal('Error', 'Error creating user. Please try again.');
  }
};
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md font-sans">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">Create BackOffice User</h1>
      <p class="text-gray-500 max-w-md">Fill in the details to create a new back-office user account.</p>
    </div>

    <div class="bg-white rounded-lg shadow p-6 space-y-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-700">User Details</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <input v-model="form.email" type="email" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Password</label>
            <input v-model="form.password" type="password" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">First Name</label>
            <input v-model="form.first_name" type="text" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Last Name</label>
            <input v-model="form.last_name" type="text" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Role</label>
            <select v-model="form.role_id" class="mt-1 p-2 border border-gray-300 rounded-md w-full">
              <option value="">Select Role</option>
              <option value="1">Admin</option>
              <option value="2">Editor</option>
              <option value="3">Viewer</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Status</label>
            <select v-model="form.backoffice_users_status" class="mt-1 p-2 border border-gray-300 rounded-md w-full">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Is Super Admin?</label>
            <select v-model="form.is_super_admin" class="mt-1 p-2 border border-gray-300 rounded-md w-full">
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Mobile Phone</label>
            <input v-model="form.mobile_phone" type="text" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Country</label>
            <select v-model="selectedCountry" class="mt-1 p-2 border border-gray-300 rounded-md w-full">
              <option v-for="c in countries" :key="c.isoCode" :value="c.isoCode">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">State</label>
            <select v-model="selectedState" class="mt-1 p-2 border border-gray-300 rounded-md w-full" :disabled="!states.length">
              <option v-for="s in states" :key="s.isoCode" :value="s.isoCode">{{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">City</label>
            <select v-model="form.city" class="mt-1 p-2 border border-gray-300 rounded-md w-full" :disabled="!cities.length">
              <option v-for="city in cities" :key="city.name">{{ city.name }}</option>
            </select>
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Create User
          </button>
        </div>
      </form>
    </div>

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

<style scoped>
.font-sans {
  font-family: 'Inter', sans-serif;
}
</style>
