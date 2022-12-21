/* eslint-disable import/prefer-default-export */
import type { Ref } from 'vue';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthorized: ref(false),
  }),

  actions: {
    checkAuth() {
      if (localStorage.getItem('token')) {
        this.isAuthorized = true;
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
      }
    },

    setUserAuth(authStatus: boolean, token: string) {
      this.isAuthorized = authStatus;

      if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        this.signOut();
      }
    },

    signOut() {
      localStorage.removeItem('token');
      this.setUserAuth(false, '');
    },
  },
});
