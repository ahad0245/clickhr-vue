<template>
  <div class="basic-template">
    <h1>{{ formData.personal.firstName }} {{ formData.personal.lastName }}</h1>
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
.basic-template {
  padding: 1rem;
}
</style>
