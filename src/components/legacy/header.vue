<template>
  <div id="header">
    <img id="header__logo" src="@/assets/logo.svg" />
    <div id="nav">
      <router-link to="/states-and-aggregators">Состояния и агрегаторы</router-link>
      <router-link to="/equipment-scheme-editor">Схема оборудования</router-link>
    </div>

    <button id="exit_button" @click="signOut()">Выход</button>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();

  function signOut() {
    router.push({
      name: 'Login',
    });

    authStore.signOut();
  }
</script>

<style lang="scss">
  #header {
    height: 50px;
    background: #333333;

    &__logo {
      display: block;
      height: 50px;
      float: left;
      margin-right: 20px;
      margin-left: 20px;
    }

    #nav {
      height: 100%;
      float: left;

      a {
        display: block;
        float: left;
        padding: 0px 20px;
        line-height: 50px;
        background: #444444;
        text-decoration: none;
        color: #dddddd;
        transition: 0.1s;
      }

      a:hover {
        background: #555555;
        color: #ffffff;
      }

      a.router-link-active {
        background: #56a13b;
        color: #ffffff;
      }
    }

    button#exit_button {
      background: #444444;
      margin: 9px 20px;
      color: #dddddd;
      border-radius: 0px;
      font-size: 10px;
    }

    button#exit_button:hover {
      background: #555555;
      color: #eeeeee;
    }

    button#exit_button:active {
      background: #666666;
      color: #ffffff;
    }
  }
</style>
