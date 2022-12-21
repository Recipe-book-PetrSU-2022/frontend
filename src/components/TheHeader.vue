<template>
  <div class="mt-12 w-[1160px] flex">
    <div
      class="text-black text-3xl font-extrabold hover:cursor-pointer select-none"
      @click="router.push({ name: 'Main' })"
      >Кулинарная книга</div
    >
    <div
      v-if="router.currentRoute.value.name === 'Main'"
      class="relative ml-28 w-[512px] text-gray-600 focus-within:text-gray-400"
    >
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <vue-feather class="text-gray" type="search" size="22" />
      </span>
      <input
        class="pl-9 w-full h-full border border-gray placeholder:text-gray"
        placeholder="Введите название рецепта..."
        name="searchRecipe"
        v-model="searchString"
      />
    </div>
    <!--
      <button class="ml-2.5 w-16 h-9 border border-gray font-sans text-gray" type="submit">
        Искать
      </button>
      -->
    <button
      v-if="!authStore.isAuthorized"
      class="ml-auto mr-1 w-10 h-9 flex items-center justify-center bg-gray rounded hover:cursor-pointer"
      @click="router.push({ name: 'Login' })"
    >
      <vue-feather type="log-in" size="20" stroke="white" />
    </button>
    <div v-else class="ml-auto mr-1 flex gap-2.5">
      <button
        class="w-10 h-9 flex items-center justify-center bg-gray rounded hover:cursor-pointer"
        @click="signOut"
      >
        <vue-feather type="log-out" size="20" stroke="white" />
      </button>
      <button
        class="w-9 h-9 flex items-center justify-center border border-gray rounded hover:cursor-pointer"
      >
        <vue-feather type="user" size="20" stroke="gray" fill="gray" />
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { watch, ref, type Ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();
  // eslint-disable-next-line no-undef
  const emit = defineEmits(['search']);
  const searchString: Ref<string> = ref('');

  watch(searchString, () => emit('search', searchString.value));

  function signOut() {
    authStore.setUserAuth(false, '');
    router.push({ name: 'Login' });
  }
</script>
