<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';

  const auth = useAuthStore();
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
