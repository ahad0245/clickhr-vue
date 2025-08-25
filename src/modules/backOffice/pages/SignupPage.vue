<template>
  <div v-if="!showSuccessScreen" class="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full">
    <div class="flex border-b mb-8">
      <button
        @click="activeTab = 'candidate'"
        :class="['flex-1 py-3 text-center font-medium transition-colors', activeTab === 'candidate' ? 'border-b-2 border-indigo-600 text-primary' : 'text-gray-500 hover:text-gray-700']"
      >
        Candidate
      </button>
      <button
        @click="activeTab = 'company'"
        :class="['flex-1 py-3 text-center font-medium transition-colors', activeTab === 'company' ? 'border-b-2 border-indigo-600 text-primary' : 'text-gray-500 hover:text-gray-700']"
      >
        Company
      </button>
    </div>

    <div v-if="activeTab === 'candidate'">
        <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-800">Create a Candidate Account</h1>
            <p class="text-gray-500 mt-2">Join us and start your journey.</p>
        </div>
        <form @submit.prevent class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" id="firstName" v-model="candidate.firstName" placeholder="John" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                    <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</p>
                </div>
                <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" id="lastName" v-model="candidate.lastName" placeholder="Doe" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                    <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">{{ errors.lastName }}</p>
                </div>
            </div>
            <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" id="phone" v-model="candidate.phone" placeholder="+1234567890" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition">
                <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
            </div>
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email <span class="text-xs text-gray-500">(This will be used for login)</span></label>
                <input type="email" id="email" v-model="candidate.email" placeholder="you@example.com" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
            </div>
            <div>
                <div class="flex justify-between items-center mb-1">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <button type="button" @click="generateStrongPassword" class="text-sm font-medium text-primary hover:text-indigo-500">Generate Strong</button>
                </div>
                <div class="relative">
                    <input :type="passwordFieldType" id="password" v-model="candidate.password" @input="checkPasswordStrength" placeholder="Min. 8 characters" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                    <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                        <svg v-if="passwordFieldType === 'password'" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" /></svg>
                    </button>
                </div>
                <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
                <div v-if="candidate.password" class="mt-2">
                    <div class="h-2 w-full bg-gray-200 rounded-full">
                        <div class="h-full rounded-full" :class="strengthBarClass" :style="{ width: strength.score + '%' }"></div>
                    </div>
                    <p class="text-xs mt-1" :class="strengthTextClass">Password strength: {{ strength.label }}</p>
                </div>
            </div>
            <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input :type="passwordFieldType" id="confirmPassword" v-model="candidate.confirmPassword" placeholder="••••••••" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                <p v-if="candidate.password && candidate.confirmPassword && candidate.password !== candidate.confirmPassword" class="text-red-500 text-xs mt-1">Passwords do not match.</p>
            </div>
            <div class="pt-2">
                <div ref="slider" class="relative w-full h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-medium overflow-hidden select-none cursor-pointer" :class="{ 'bg-green-500 text-white': isSliderVerified }">
                    <div ref="sliderHandle" @mousedown="startSlide" @touchstart.prevent="startSlide" class="absolute top-0 left-0 h-full w-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg" :style="{ left: sliderHandlePos + 'px' }">
                        <svg v-if="!isSliderVerified" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                    <span class="transition-opacity" :class="{'opacity-0': isSliding}">{{ sliderText }}</span>
                </div>
            </div>
        </form>
    </div>

    <div v-if="activeTab === 'company'">
         <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-800">Create a Company Account</h1>
            <p class="text-gray-500 mt-2">Register your company to get started.</p>
        </div>
        <form @submit.prevent class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="companyName" class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" id="companyName" v-model="company.name" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                    <p v-if="errors.companyName" class="text-red-500 text-xs mt-1">{{ errors.companyName }}</p>
                </div>
                <div>
                    <label for="companyPhone" class="block text-sm font-medium text-gray-700 mb-1">Company Phone</label>
                    <input type="tel" id="companyPhone" v-model="company.phone" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                    <p v-if="errors.companyPhone" class="text-red-500 text-xs mt-1">{{ errors.companyPhone }}</p>
                </div>
            </div>
            <div>
                <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select id="country" v-model="selectedCountry" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition">
                    <option value="" disabled>Select a country</option>
                    <option v-for="c in countries" :key="c.isoCode" :value="c.isoCode">{{ c.name }}</option>
                </select>
                <p v-if="errors.country" class="text-red-500 text-xs mt-1">{{ errors.country }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State/Region/Province</label>
                    <select id="state" v-model="selectedState" :disabled="!states.length" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition">
                        <option value="" disabled>Select a state</option>
                        <option v-for="s in states" :key="s.isoCode" :value="s.isoCode">{{ s.name }}</option>
                    </select>
                    <p v-if="errors.state" class="text-red-500 text-xs mt-1">{{ errors.state }}</p>
                </div>
                <div>
                    <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select id="city" v-model="selectedCity" :disabled="!cities.length" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition">
                        <option value="" disabled>Select a city</option>
                        <option v-for="city in cities" :key="city.name" :value="city.name">{{ city.name }}</option>
                    </select>
                    <p v-if="errors.city" class="text-red-500 text-xs mt-1">{{ errors.city }}</p>
                </div>
            </div>
            <div>
                <label for="address1" class="block text-sm font-medium text-gray-700 mb-1">Address 1</label>
                <input type="text" id="address1" v-model="company.address1" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                <p v-if="errors.address1" class="text-red-500 text-xs mt-1">{{ errors.address1 }}</p>
            </div>
            <div>
                <label for="address2" class="block text-sm font-medium text-gray-700 mb-1">Address 2 <span class="text-xs text-gray-500">(Optional)</span></label>
                <input type="text" id="address2" v-model="company.address2" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
            </div>
            <div>
                <label for="zip" class="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
                <input type="text" id="zip" v-model="company.zip" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                <p v-if="errors.zip" class="text-red-500 text-xs mt-1">{{ errors.zip }}</p>
            </div>
            <div>
                <label for="companyEmail" class="block text-sm font-medium text-gray-700 mb-1">Company Email <span class="text-xs text-gray-500">(This will be used for login)</span></label>
                <input type="email" id="companyEmail" v-model="company.email" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                <p v-if="errors.companyEmail" class="text-red-500 text-xs mt-1">{{ errors.companyEmail }}</p>
            </div>
            <div>
                 <div class="flex justify-between items-center mb-1">
                    <label for="companyPassword" class="block text-sm font-medium text-gray-700">Password</label>
                    <button type="button" @click="generateStrongPassword" class="text-sm font-medium text-primary hover:text-indigo-500">Generate Strong</button>
                </div>
                <div class="relative">
                    <input :type="passwordFieldType" id="companyPassword" v-model="company.password" @input="checkPasswordStrength" placeholder="Min. 8 characters" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                    <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                        <svg v-if="passwordFieldType === 'password'" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" /></svg>
                    </button>
                </div>
                <p v-if="errors.companyPassword" class="text-red-500 text-xs mt-1">{{ errors.companyPassword }}</p>
                <div v-if="company.password" class="mt-2">
                    <div class="h-2 w-full bg-gray-200 rounded-full">
                        <div class="h-full rounded-full" :class="strengthBarClass" :style="{ width: strength.score + '%' }"></div>
                    </div>
                    <p class="text-xs mt-1" :class="strengthTextClass">Password strength: {{ strength.label }}</p>
                </div>
            </div>
            <div>
                <label for="companyConfirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input :type="passwordFieldType" id="companyConfirmPassword" v-model="company.confirmPassword" placeholder="••••••••" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
                <p v-if="company.password && company.confirmPassword && company.password !== company.confirmPassword" class="text-red-500 text-xs mt-1">Passwords do not match.</p>
            </div>
             <div class="pt-2">
                <div ref="slider" class="relative w-full h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-medium overflow-hidden select-none cursor-pointer" :class="{ 'bg-green-500 text-white': isSliderVerified }">
                    <div ref="sliderHandle" @mousedown="startSlide" @touchstart.prevent="startSlide" class="absolute top-0 left-0 h-full w-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg" :style="{ left: sliderHandlePos + 'px' }">
                        <svg v-if="!isSliderVerified" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                    <span class="transition-opacity" :class="{'opacity-0': isSliding}">{{ sliderText }}</span>
                </div>
            </div>
        </form>
    </div>

    <p class="mt-8 text-center text-sm text-gray-600">
      Already have an account?
      <button class="font-medium text-primary hover:text-indigo-500" @click="handleLoginRedirect">Log in here</button>
    </p>
  </div>

  <div v-if="showSuccessScreen" class="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center">
    <svg class="w-20 h-20 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
    <h1 class="text-2xl font-bold text-gray-800">Check Your Email</h1>
    <p class="text-gray-600 mt-3">We've sent a verification link to your email address. Please check your inbox (and spam folder) to complete your registration.</p>
    <div class="mt-8">
        <div class="mt-4 flex flex-wrap justify-center gap-4">
            <a href="https://mail.google.com/" target="_blank" class="inline-flex items-center gap-2.5 justify-center py-2.5 px-5 text-white font-medium bg-primary rounded-lg hover:opacity-90 transition-opacity">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.5v15c0 .83-.67 1.5-1.5 1.5H1.5C.67 21 0 20.33 0 19.5v-15C0 3.67.67 3 1.5 3h21C23.33 3 24 3.67 24 4.5zM12 12.75L21.75 6H2.25L12 12.75zM1.5 19.5h21V7.12l-9.75 6.37-9.75-6.37V19.5z"></path></svg>
                <span>Open Gmail</span>
            </a>
            
        </div>
    </div>
  </div>

  <div v-if="showTermsModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div class="p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">Terms and Conditions</h2>
        </div>
        <div ref="termsContent" @scroll="handleScroll" class="p-6 overflow-y-auto">
            <h3 class="font-semibold text-lg mb-2">1. Introduction</h3>
            <p class="text-gray-600 mb-4 text-sm">Welcome to our platform. By creating an account, you agree to these terms and conditions. Please read them carefully. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <h3 class="font-semibold text-lg mb-2">2. User Accounts</h3>
            <p class="text-gray-600 mb-4 text-sm">You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <h3 class="font-semibold text-lg mb-2">3. Prohibited Activities</h3>
            <p class="text-gray-600 mb-4 text-sm">You are prohibited from using the service for any unlawful purpose. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <h3 class="font-semibold text-lg mb-2">4. Content</h3>
            <p class="text-gray-600 mb-4 text-sm">Our Service allows you to post, link, store, share and otherwise make available certain information. You are responsible for the Content that you post on or through the Service. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <h3 class="font-semibold text-lg mb-2">5. Termination</h3>
            <p class="text-gray-600 mb-4 text-sm">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p class="text-gray-600 text-sm">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
        </div>
        <div class="p-6 border-t bg-gray-50 rounded-b-xl flex justify-end space-x-4">
            <button @click="disagreeAndClose" class="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition">Disagree</button>
            <button
                @click="agreeAndSignup"
                :disabled="!termsScrolledToEnd"
                class="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
            >
            Agree
          </button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed, onBeforeUnmount, reactive, watch } from 'vue';
import { Country, State, City } from 'country-state-city';

const router = useRouter();

// --- SHARED STATE ---
const activeTab = ref('candidate');
const passwordFieldType = ref('password');
const showTermsModal = ref(false);
const termsContent = ref(null);
const termsScrolledToEnd = ref(false);
const errors = reactive({});
// UPDATE: New state for showing the success screen
const showSuccessScreen = ref(false);


// --- LOCATION STATE ---
const countries = Country.getAllCountries();
const selectedCountry = ref('');
const selectedState = ref('');
const selectedCity = ref('');
const states = ref([]);
const cities = ref([]);

watch(selectedCountry, (newCountry) => {
  states.value = State.getStatesOfCountry(newCountry);
  selectedState.value = '';
  cities.value = [];
});

watch(selectedState, (newState) => {
  cities.value = City.getCitiesOfState(selectedCountry.value, newState);
  selectedCity.value = '';
});

// --- FORM STATE ---
const candidate = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const company = reactive({
  name: '',
  phone: '',
  address1: '',
  address2: '',
  zip: '',
  email: '',
  password: '',
  confirmPassword: '',
});

// Reset form state and errors when tab changes
watch(activeTab, () => {
    isSliderVerified.value = false;
    sliderHandlePos.value = 0;
    Object.keys(errors).forEach(key => delete errors[key]);
    strength.value = { score: 0, label: 'Too short' };
});

// --- PASSWORD STRENGTH LOGIC ---
const strength = ref({ score: 0, label: 'Too short' });

const checkPasswordStrength = () => {
  const p = activeTab.value === 'candidate' ? candidate.password : company.password;
  let score = 0;
  if (p.length >= 8) { score += 25; }
  if (/[a-z]/.test(p)) { score += 25; }
  if (/[A-Z]/.test(p)) { score += 25; }
  if (/\d/.test(p)) { score += 15; }
  if (/[^A-Za-z0-9]/.test(p)) { score += 10; }
  score = Math.min(score, 100);

  let label = 'Weak';
  if (score >= 100) label = 'Very Strong';
  else if (score >= 75) label = 'Strong';
  else if (score >= 50) label = 'Medium';
  else if (p.length > 0) label = 'Weak';
  else label = 'Too short';
  strength.value = { score, label };
};

const strengthBarClass = computed(() => {
  if (strength.value.score >= 75) return 'bg-green-500';
  if (strength.value.score >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
});

const strengthTextClass = computed(() => {
  if (strength.value.score >= 75) return 'text-green-600';
  if (strength.value.score >= 50) return 'text-yellow-600';
  return 'text-red-600';
});

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const generateStrongPassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let newPassword = '';
  for (let i = 0; i < 14; i++) {
    newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  if (activeTab.value === 'candidate') {
      candidate.password = newPassword;
      candidate.confirmPassword = newPassword;
  } else {
      company.password = newPassword;
      company.confirmPassword = newPassword;
  }
  checkPasswordStrength();
};


// --- FORM VALIDATION ---
const validateForm = () => {
    Object.keys(errors).forEach(key => delete errors[key]);
    let isValid = true;
    const requiredFieldMsg = "This field is required";

    if (activeTab.value === 'candidate') {
        if (!candidate.firstName) { errors.firstName = requiredFieldMsg; isValid = false; }
        if (!candidate.lastName) { errors.lastName = requiredFieldMsg; isValid = false; }
        if (!candidate.phone) { errors.phone = requiredFieldMsg; isValid = false; }
        if (!candidate.email) { errors.email = requiredFieldMsg; isValid = false; }
        if (!candidate.password) { errors.password = requiredFieldMsg; isValid = false; }
        else if (strength.value.label === 'Weak' || strength.value.label === 'Too short') { errors.password = "Password is too weak."; isValid = false; }
        if (candidate.password !== candidate.confirmPassword) { isValid = false; }
    } else {
        if (!company.name) { errors.companyName = requiredFieldMsg; isValid = false; }
        if (!company.phone) { errors.companyPhone = requiredFieldMsg; isValid = false; }
        if (!selectedCountry.value) { errors.country = requiredFieldMsg; isValid = false; }
        if (!selectedState.value) { errors.state = requiredFieldMsg; isValid = false; }
        if (!selectedCity.value) { errors.city = requiredFieldMsg; isValid = false; }
        if (!company.address1) { errors.address1 = requiredFieldMsg; isValid = false; }
        if (!company.zip) { errors.zip = requiredFieldMsg; isValid = false; }
        if (!company.email) { errors.companyEmail = requiredFieldMsg; isValid = false; }
        if (!company.password) { errors.companyPassword = requiredFieldMsg; isValid = false; }
        else if (strength.value.label === 'Weak' || strength.value.label === 'Too short') { errors.companyPassword = "Password is too weak."; isValid = false; }
        if (company.password !== company.confirmPassword) { isValid = false; }
    }
    return isValid;
}


// --- SLIDER LOGIC ---
const slider = ref(null);
const sliderHandle = ref(null);
const isSliding = ref(false);
const sliderHandlePos = ref(0);
const isSliderVerified = ref(false);

const sliderText = computed(() => isSliderVerified.value ? 'Verified!' : 'Slide to Create Account');

const startSlide = (event) => {
  if (isSliderVerified.value || !validateForm()) return;
  isSliding.value = true;
  document.addEventListener('mousemove', onSlide);
  document.addEventListener('mouseup', endSlide);
  document.addEventListener('touchmove', onSlide, { passive: false });
  document.addEventListener('touchend', endSlide);
};

const onSlide = (event) => {
  if (!isSliding.value) return;
  const sliderRect = slider.value.getBoundingClientRect();
  const handleRect = sliderHandle.value.getBoundingClientRect();
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  let newLeft = clientX - sliderRect.left - handleRect.width / 2;
  const maxLeft = sliderRect.width - handleRect.width;
  if (newLeft < 0) newLeft = 0;
  if (newLeft > maxLeft) newLeft = maxLeft;
  sliderHandlePos.value = newLeft;
  if (newLeft >= maxLeft - 5) {
    verifySliderAndShowTerms();
  }
};

const endSlide = () => {
  if (!isSliding.value) return;
  isSliding.value = false;
  document.removeEventListener('mousemove', onSlide);
  document.removeEventListener('mouseup', endSlide);
  document.removeEventListener('touchmove', onSlide);
  document.removeEventListener('touchend', endSlide);
  if (!isSliderVerified.value) {
      sliderHandle.value.style.transition = 'left 0.3s ease-out';
      sliderHandlePos.value = 0;
      setTimeout(() => { if(sliderHandle.value) sliderHandle.value.style.transition = ''; }, 300);
  }
};

const verifySliderAndShowTerms = () => {
  if (isSliderVerified.value || !validateForm()) {
    endSlide();
    return;
  }
  isSliderVerified.value = true;
  endSlide();
  showTermsModal.value = true;
};


// --- MODAL & FINAL SIGNUP LOGIC ---
const handleScroll = () => {
  const el = termsContent.value;
  if (el && el.scrollHeight - el.scrollTop <= el.clientHeight + 5) {
    termsScrolledToEnd.value = true;
  }
};

const disagreeAndClose = () => {
  showTermsModal.value = false;
  isSliderVerified.value = false;
  sliderHandlePos.value = 0;
  termsScrolledToEnd.value = false;
};

const agreeAndSignup = () => {
  if (!termsScrolledToEnd.value) return;
  if (activeTab.value === 'candidate') {
    handleCandidateSignup();
  } else {
    handleCompanySignup();
  }
  showTermsModal.value = false;
};

// =================================================================
// GUIDE: How to add your API Call
// =================================================================
// 1. Make these functions `async` to use `await`.
// 2. Prepare the `payload` object with the data your API needs.
// 3. Use a `try...catch` block to handle network requests gracefully.
// 4. Inside `try`, use `fetch()` or `axios` to send the data.
// 5. If the API call is successful, show the success screen.
// 6. If it fails, you can set an error message to show the user.
// =================================================================

const handleCandidateSignup = async () => {
  // Step 2: Prepare the payload for your API.
  const payload = {
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      phone: candidate.phone,
      email: candidate.email,
      password: candidate.password,
      // Add any other fields your API requires
  };

  try {
    // Step 3 & 4: Make the API call (example is commented out).
    // Replace '/api/register/candidate' with your actual API endpoint.
    /*
    const response = await fetch('/api/register/candidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // If server responds with an error (like 400 or 500)
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create account.');
    }
    */
   
    // Step 5: If the API call is successful, show the success screen.
    console.log('API call successful for:', payload);
    showSuccessScreen.value = true;

  } catch (error) {
    // Step 6: Handle any errors from the API call.
    console.error('Signup failed:', error);
    // You could set a specific error message here, e.g.,
    // errors.apiError = error.message;
    alert(`Signup failed: ${error.message}`); // Or show error to user
  }
};

const handleCompanySignup = async () => {
  // Step 2: Prepare the payload for your API.
  const payload = {
    companyName: company.name,
    companyPhone: company.phone,
    email: company.email,
    password: company.password,
    address: {
      line1: company.address1,
      line2: company.address2,
      city: selectedCity.value,
      state: selectedState.value,
      country: selectedCountry.value,
      postalCode: company.zip,
    }
  };
  
  try {
    // Step 3 & 4: Make the API call (example is commented out).
    // Replace '/api/register/company' with your actual API endpoint.
    /*
    const response = await fetch('/api/register/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create company account.');
    }
    */
    
    // Step 5: If the API call is successful, show the success screen.
    console.log('API call successful for:', payload);
    showSuccessScreen.value = true;
    
  } catch (error) {
    // Step 6: Handle any errors from the API call.
    console.error('Company signup failed:', error);
    alert(`Signup failed: ${error.message}`);
  }
};

// --- ROUTING & CLEANUP ---
const emit = defineEmits(['go-to-login']);

function handleLoginRedirect() {
  emit('go-to-login');
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onSlide);
  document.removeEventListener('mouseup', endSlide);
  document.removeEventListener('touchmove', onSlide);
  document.removeEventListener('touchend', endSlide);
});
</script>

<style>
.select-none {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.cursor-pointer {
  cursor: pointer;
}
.transition-opacity {
  font-size: 13px;
}
</style>