<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-primary to-blue-700 text-white">

    <div class="lg:w-1/2 flex flex-col p-10 text-center">
      <div class="flex-grow flex flex-col justify-center items-center space-y-6">
        <img src="../../../assets/white.png" class="h-10 w-45 mx-auto" alt="Click-HR logo" />
        <h1 class="text-4xl font-bold">Welcome to Click-HR Dashboard</h1>
        <p class="text-lg text-blue-100">
          We combine advanced technology with deep industry insights to redefine how companies recruit top talent!
        </p>
        <img src="../../../assets/company-01.svg" class="w-1/2 h-auto" alt="">
      </div>
      <footer class="text-sm text-blue-200 pt-10 text-center">
        &copy; {{ new Date().getFullYear() }} Click-HR. All rights reserved.
      </footer>
    </div>

    <div class="lg:w-1/2 bg-white text-gray-800 flex flex-col p-10 min-h-[400px] lg:h-screen lg:overflow-y-auto">
      <div class="max-w-md w-full mx-auto">
        <div class="flex justify-center mb-6 space-x-4">
          <button @click="activeTab = 'login'" :class="[
            'px-6 py-2 font-semibold rounded-full transition',
            activeTab === 'login' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
          ]">
            Login
          </button>
          <button @click="activeTab = 'signup'" :class="[
            'px-6 py-2 font-semibold rounded-full transition',
            activeTab === 'signup' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
          ]">
            Sign Up
          </button>
        </div>

        <div>
          <LoginForm v-if="activeTab === 'login'" @go-to-signup="switchToSignup" />
          <SignupForm v-else @go-to-login="switchToLogin" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './LoginPage.vue'
import SignupForm from './SignupPage.vue'

const activeTab = ref<'login' | 'signup'>('login')

function switchToSignup() {
  activeTab.value = 'signup'
}
function switchToLogin() {
  activeTab.value = 'login'
}
</script>

<style scoped>
/* Optional custom styles can go here */
</style>