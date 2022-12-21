<template>
  <div
    class="px-2.5 w-48 h-72 flex flex-col rounded border border-gray hover:cursor-pointer"
    @click="router.push({ name: 'RecipePage', params: { id: props.id } })"
  >
    <div class="relative mt-2.5 w-[170px] h-44 rounded">
      <div class="relative z-10 flex justify-between">
        <div
          v-if="props.rating !== -1"
          class="w-11 h-6 flex gap-0.5 items-center bg-main border border-gray font-bold rounded-tl rounded-br"
        >
          <span class="ml-1.5">{{ props.rating }}</span>
          <vue-feather type="star" size="9" />
        </div>
        <div
          v-if="authStore.isAuthorized"
          class="w-9 h-6 flex items-center justify-center bg-main border border-gray rounded-tr rounded-bl hover:cursor-pointer hover:outline hover:outline-1"
          @click.stop="addToFavorite"
        >
          <vue-feather v-if="!isFavoriteLocal" type="bookmark" size="20" />
          <vue-feather v-else type="bookmark" fill="#EA7F70" size="20" />
        </div>
      </div>
      <img class="absolute top-0 select-none" :src="getImgUrl(props.imgName)" alt="" />
    </div>
    <div class="flex flex-wrap width-[170px] text-xl font-bold select-none">
      {{ props.name }}
    </div>
    <div class="mt-auto mb-2.5 flex justify-between">
      <div class="font-bold">{{ props.portionsNumber }} пор</div>
      <div class="font-bold">{{ props.time }} мин</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, type PropType } from 'vue';
  import type { Ref } from 'vue';

  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  import axios from 'axios';

  interface Filter {
    name: string;
    isSelected: boolean;
    bgColor: string;
  }

  // eslint-disable-next-line no-undef
  const props = defineProps({
    id: Number,
    name: String,
    rating: Number,
    isFavorite: Boolean,
    time: Number,
    portionsNumber: Number,
    imgName: String,
    filters: Array as PropType<String[]>,
  });

  const authStore = useAuthStore();
  const router = useRouter();
  const isFavoriteLocal: Ref<boolean> = ref(false);

  if (props.isFavorite) {
    isFavoriteLocal.value = true;
  }

  function getImgUrl(imgName: string) {
    return `http://157.230.103.196:1337/assets/${imgName}`;
  }

  function addToFavorite() {
    isFavoriteLocal.value = !isFavoriteLocal.value;

    axios.put(
      `/recipesPreview/${props.id}`,
      { ...props, isFavorite: !props.isFavorite },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
</script>

<style lang="scss" scoped></style>
