<template>
  <div class="mx-auto flex-col max-w-6xl">
    <TheHeader @search="updSearchString" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import { ref, type Ref, provide } from 'vue';
  import TheHeader from '@/components/TheHeader.vue';
  import { useAuthStore } from '@/stores/auth';

  const auth = useAuthStore();
  const searchString: Ref<string> = ref('');
  provide('searchString', searchString);

  auth.checkAuth();

  function updSearchString(search: string) {
    searchString.value = search;
  }
</script>

<style>
  @import '@/style.css';
</style>
<style lang="scss">
  @import '../src/sass/fonts';
  * {
    box-sizing: border-box;
    font-family: 'Playfair Display';
  }
</style>
