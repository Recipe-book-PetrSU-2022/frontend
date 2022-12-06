import { createRouter, createWebHistory } from 'vue-router';

import Empty from '@/components/Empty.vue';
import App from '@/App.vue';
import login from '@/views/login.vue';
import { useAuthStore } from '@/stores/auth';
import MainPage from '@/views/MainPage.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/login',
    name: 'Login',
    // eslint-disable-next-line consistent-return
    // redirect: () => {
    //   const authStore = useAuthStore();

    //   if (authStore.isUserAuthorized()) {
    //     return { name: 'Main' };
    //   }
    // },
    component: login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// eslint-disable-next-line consistent-return
// router.beforeEach(async (to) => {
//   const authStore = useAuthStore();

//   if (
//     // make sure the user is authenticated
//     !authStore.isUserAuthorized() &&
//     // ❗️ Avoid an infinite redirect
//     to.name !== 'Login'
//   ) {
//     // redirect the user to the login page
//     return { name: 'Login' };
//   }
// });

export default router;
