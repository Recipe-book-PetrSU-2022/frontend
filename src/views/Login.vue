<template>
  <div class="mt-24 mx-auto flex-col w-fit">
    <img src="@/assets/cooking-process.svg" alt="cooking-process" />
    <div class="mt-9 flex justify-center text-3xl font-extrabold">Вход</div>
    <input
      v-model="username"
      class="mt-8 pl-2.5 block w-72 h-9 border border-gray rounded placeholder:font-sans"
      placeholder="Введите логин или почту..."
    />
    <input
      v-model="password"
      class="mt-2.5 pl-2.5 w-72 h-9 border border-gray rounded placeholder:font-sans"
      placeholder="Введите пароль..."
    />
    <div
      v-if="hasAuthError"
      class="pl-1 mt-2.5 text-md text-red-700 font-medium font-sans rounded-lg"
      role="alert"
    >
      Неверный логин или пароль
    </div>
    <div class="mt-2.5 mx-auto w-16 h-8 flex justify-center bg-gray rounded hover:opacity-90">
      <button class="text-main font-sans" @click="signIn">Войти</button>
    </div>
    <div class="mt-2.5 flex gap-1 justify-center text-gray font-sans">
      <span>перейти на страницу</span>
      <RouterLink class="underline underline-offset-4" to="/registration">регистрации</RouterLink>
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
  const password: Ref<string> = ref('');

  const auth = useAuthStore();
  const router = useRouter();

  interface User {
    name: String;
    password: String;
  }

  async function signIn() {
    // users count
    await axios
      .get('/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res: AxiosResponse<User[]>) => {
        const user: User[] = res.data.filter(
          (item) => item.name === username.value && item.password === password.value,
        );

        if (user.length > 0) {
          auth.setUserAuth(true);
          router.push({
            name: 'Main',
          });
        } else {
          auth.setUserAuth(false);

          hasAuthError.value = true;
          setTimeout(() => {
            hasAuthError.value = false;
          }, 2 * 1000);
        }
      });
  }

  const hasAuthError: Ref<Boolean> = ref(false);
</script>
