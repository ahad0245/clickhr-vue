import { defineStore } from 'pinia';

export type UserRole = 'admin' | 'recruiter' | 'viewer' | 'backoffice';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userRole: 'viewer' as UserRole,
  }),
  actions: {
    setUserRole(role: UserRole) {
      this.userRole = role;
    }
  }
});
