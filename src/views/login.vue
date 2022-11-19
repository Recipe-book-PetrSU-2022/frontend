<template>
  <div id="login_page__auth_block">
    <img id="login_page__auth_block__logo" src="@/assets/logo.svg" />
    <div class="form_blocks">
      <label>Логин:</label>
      <input v-model="username" />
    </div>
    <div class="form_blocks">
      <label>Пароль:</label>
      <input type="password" v-model="password" />
    </div>
    <div v-if="hasAuthError" class="error_message">Неверный логин или пароль</div>
    <div class="form_blocks">
      <button @click="signIn">Войти</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  import axios from 'axios';

  const username: Ref<string> = ref('');
  const password: Ref<string> = ref('');

  const auth = useAuthStore();
  const router = useRouter();

  function signIn() {
    axios
      .post('/api/v1/user/session', {
        username: username.value,
        password: password.value,
      })
      .then(() => {
        auth.setUserAuth(true);
        router.push({
          name: 'Main',
        });
      })
      .catch(() => {
        auth.setUserAuth(false);

        hasAuthError.value = true;
        setTimeout(() => {
          hasAuthError.value = false;
        }, 2 * 1000);
      });
  }

  const hasAuthError: Ref<Boolean> = ref(false);
</script>

<style lang="scss" scoped>
  #login_page__auth_block {
    position: absolute;
    width: 320px;
    height: 200px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 2px 4px 1px #ccc;
    top: 50%;
    left: 50%;
    margin-top: -120px;
    margin-left: -180px;
    padding: 20px;

    &__logo {
      display: block;
      position: absolute;
      height: 50px;
      left: 0px;
      top: -66px;
    }

    .form_blocks {
      padding: 8px 0px;
      width: 250px;
      margin: 0px auto;

      button {
        margin-top: 10px;
      }
    }

    .error_message {
      margin: 0px auto;
      width: 250px;
      display: flex;
      color: red;
      font-size: 14px;
    }
  }
</style>
