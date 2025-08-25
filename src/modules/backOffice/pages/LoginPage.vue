<template>
  <!-- <div class="min-h-screen bg-content-bg flex items-center justify-center p-6 bg-primary"> -->
    <div class="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-md w-full">
      <div class="text-center mb-8">
        <component :is="LockClosedIcon" class="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 class="text-3xl font-bold text-gray-800">Login to Your Account</h1>
        <p class="text-gray-500">Access your dashboard and manage your data.</p>
      </div>

      <div v-if="step === 'login'" class="space-y-6">
        <div>
          <label for="email-step" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email-step"
            v-model="email"
            @input="emailError = ''" placeholder="Enter your email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition-shadow"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': emailError }" aria-required="true"
          />
          <p v-if="emailError" class="text-red-600 text-sm mt-1">{{ emailError }}</p>
        </div>
        <button
          @click="goToPassword"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          Continue
        </button>
      </div>

      <div v-if="step === 'password'" class="space-y-6">
        <div v-if="logoUrl" class="my-4 text-center">
            <img :src="logoUrl" alt="Company Logo" class="mx-auto h-12 max-h-16 object-contain" />
        </div>
        <div>
            <label for="email-readonly" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" id="email-readonly" :value="email" readonly class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"/>
        </div>
        <div>
            <label for="password-step" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
                type="password"
                id="password-step"
                v-model="password"
                @input="passwordError = ''" placeholder="Enter your password"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition-shadow"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': passwordError }" aria-required="true"
            />
            <p v-if="passwordError" class="text-red-600 text-sm mt-1">{{ passwordError }}</p> </div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            @click="submitLogin"
            class="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Login
          </button>
          <a @click="step = 'forgot'" class="text-sm text-primary hover:text-primary-dark cursor-pointer text-center sm:text-right">
            Forgot Password?
          </a>
        </div>
        <button @click="step = 'login'" class="w-full mt-2 text-sm text-gray-600 hover:text-primary cursor-pointer text-center">
            Back to email
        </button>
      </div>
     
      <p class="mt-8 text-center text-sm text-gray-600">
        Not a member? 
         <button class="text-blue-500" @click="handleSignupRedirect">Sign up here</button>
      </p>
    </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useToastStore } from '../../../stores/useToastStore.ts';
import { useAuthStore } from '../../../stores/useAuthStore.ts'; // your auth store

// Stores
const auth = useAuthStore();
const toastStore = useToastStore();

// Router
const router = useRouter();

// Icons
const LockClosedIcon = defineAsyncComponent(() => import('../../../assets/icons/LockClosedIcon.vue'));

// Form Steps
const step = ref<'login' | 'password' | 'forgot' | 'sent'>('login');
const email = ref('');
const password = ref('');

// Error States
const emailError = ref('');
const passwordError = ref('');

// Computed: Dynamic Logo Preview
const logoUrl = computed(() => {
  const domain = email.value.split('@')[1];
  return domain && domain.includes('.') ? `https://logo.clearbit.com/${domain}` : '';
});

// Validate Email Format
function isEmailValid(emailAddress: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(emailAddress);
}

// Step: Email → Password
function goToPassword() {
  if (isEmailValid(email.value)) {
    emailError.value = '';
    step.value = 'password';
  } else {
    emailError.value = 'Please enter a valid email address.';
  }
}

// Main Login Logic
async function submitLogin() {
  if (!email.value || !password.value) {
    toast('Password field cannot be empty.', { type: 'error' });
    return;
  }

  const domain = email.value.split('@')[1];

  if (domain === 'admin.com') {
    auth.setUserRole('admin');
    toastStore.show('Logged in as admin', 'success');
    await router.push('/backoffice');
  } else if (domain === 'hr.com') {
    auth.setUserRole('recruiter');
    toastStore.show('Logged in as recruiter', 'success');
    await router.push('/dashboard');
  } else {
    auth.setUserRole('viewer');
    toastStore.show('Logged in as Candidate', 'success');
    await router.push('/candidate');
  }
}

// Sign Up Redirect Handler
const emit = defineEmits(['go-to-signup']);
function handleSignupRedirect() {
  emit('go-to-signup');
}
</script>
