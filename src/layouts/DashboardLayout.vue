<template>
  <div>
    <Header />
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>


<script setup lang="ts">

import Header from '../modules/backOffice/components/Header.vue';
import { watch } from 'vue';
import { toast } from 'vue3-toastify';
import { useToastStore } from '../stores/useToastStore';

const toastStore = useToastStore();

watch(
  () => toastStore.message,
  (msg) => {
    if (msg) {
      toast(msg, { type: toastStore.type });
      toastStore.clear();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>