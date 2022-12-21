import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

import App from '@/App.vue';
import Login from '@/views/Login.vue';
import MainPage from '@/views/MainPage.vue';
import RecipePage from '@/views/RecipePage.vue';
import NotFound from '@/components/NotFound.vue';
import SignUp from '@/views/SignUp.vue';
import PersonalCabinet from '@/views/PersonalCabinet.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/recipe/:id',
    name: 'RecipePage',
    component: RecipePage,
  },
  {
    path: '/cabinet',
    name: 'PersonalCabinet',
    component: PersonalCabinet,
  },
  {
    path: '/login',
    name: 'Login',
    // eslint-disable-next-line consistent-return
    // redirect: () => {
    //   const authStore = useAuthStore();
    //   console.log(authStore, authStore.isAuthorized);

    //   if (authStore.isAuthorized) {
    //     return '/';
    //   }
    // },
    component: Login,
  },
  {
    path: '/registration',
    name: 'SignUp',
    // eslint-disable-next-line consistent-return
    // redirect: () => {
    //   const authStore = useAuthStore();
    //   console.log(authStore, authStore.isAuthorized);

    //   if (authStore.isAuthorized) {
    //     return '/';
    //   }
    // },
    component: SignUp,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    redirect: () => {
      return { name: 'Main' };
    },
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
