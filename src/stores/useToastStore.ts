// stores/useToastStore.ts
import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
  state: () => ({
    message: '',
    type: 'success' as 'success' | 'error' | 'info',
  }),
  actions: {
    show(message: string, type: 'success' | 'error' | 'info' = 'success') {
      this.message = message;
      this.type = type;
    },
    clear() {
      this.message = '';
    },
  },
});
