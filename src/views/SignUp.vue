<template>
  <div class="mt-24 mx-auto flex-col w-fit">
    <img src="@/assets/cooking-process.svg" alt="cooking-process" />
    <div class="mt-9 flex justify-center text-3xl font-extrabold">Регистрация</div>
    <input
      v-model="username"
      class="mt-8 pl-2.5 block w-72 h-9 border border-gray rounded placeholder:font-sans"
      placeholder="Введите логин..."
    />
    <input
      v-model="email"
      class="mt-2.5 pl-2.5 block w-72 h-9 border border-gray rounded placeholder:font-sans"
      placeholder="Введите почту..."
    />
    <input
      v-model="password1"
      class="mt-2.5 pl-2.5 block w-72 h-9 border border-gray rounded placeholder:font-sans"
      placeholder="Введите пароль..."
    />
    <input
      v-model="password2"
      class="mt-2.5 pl-2.5 block w-72 h-9 border border-gray rounded placeholder:font-sans"
      placeholder="Введите пароль повторно..."
    />
    <div
      v-if="hasAuthErrorDuplicateLogin"
      class="pl-1 mt-2.5 text-md text-red-700 font-medium font-sans rounded-lg"
      role="alert"
      >Данный логин уже зарегистрирован
    </div>
    <div
      v-if="error !== ''"
      class="pl-1 mt-2.5 text-md text-red-700 font-medium font-sans rounded-lg"
      role="alert"
      >{{ error }}
    </div>
    <div class="mt-2.5 mx-auto w-44 h-10 flex justify-center bg-gray rounded hover:opacity-90">
      <button class="text-main font-sans" @click="signUp">Зарегистрироваться</button>
    </div>
    <div class="mt-2.5 flex gap-1 justify-center text-gray font-sans">
      <span>перейти на страницу</span>
      <RouterLink class="underline underline-offset-4" to="/login">входа</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  import axios, { type AxiosResponse } from 'axios';

  const username: Ref<string> = ref('');
  const email: Ref<string> = ref('');
  const password1: Ref<string> = ref('');
  const password2: Ref<string> = ref('');
  const error = ref('');

  const auth = useAuthStore();
  const router = useRouter();

  interface User {
    username: String;
    password: String;
  }

  async function signUp() {
    // users count
    await axios
      .post('http://157.230.103.196:1337/signup', {
        login: username.value,
        email: email.value,
        password: password1.value,
        confirm_password: password2.value,
      })
      .then((res) => {
        router.push({ name: 'Main' });

        // if (user.length > 0) {
        //   hasAuthErrorDuplicateLogin.value = true;
        //   setTimeout(() => {
        //     hasAuthErrorDuplicateLogin.value = false;
        //   }, 2 * 1000);
        // } else if (password1.value !== password2.value) {
        //   hasAuthErrorPasswordNotEqual.value = true;
        //   setTimeout(() => {
        //     hasAuthErrorPasswordNotEqual.value = false;
        //   }, 2 * 1000);
        // }
      })
      .catch((err) => {
        error.value = err.response.data.message;
        setTimeout(() => {
          error.value = '';
        }, 2 * 1000);
      });
  }

  const hasAuthErrorDuplicateLogin: Ref<Boolean> = ref(false);
  const hasAuthErrorPasswordNotEqual: Ref<Boolean> = ref(false);
</script>
