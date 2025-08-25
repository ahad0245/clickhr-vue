<template>
  <div class="modern-template">
    <h2>{{ formData.personal.firstName }} {{ formData.personal.lastName }}</h2>
    <p>{{ formData.personal.headline }}</p>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/resume';
import { defineProps } from 'vue';

const props = defineProps<{
  formData: FormData;
}>();
</script>

<style scoped>
.modern-template {
  padding: 1rem;
}
</style>
