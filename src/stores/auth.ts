/* eslint-disable import/prefer-default-export */
import type { Ref } from 'vue';
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthorized: ref(false),
  }),

  actions: {
    isUserAuthorized() {
      return this.isAuthorized;
    },

    setUserAuth(authStatus: boolean) {
      this.isAuthorized = authStatus;
    },

    signOut() {
      document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      this.setUserAuth(false);
    },
  },
});
