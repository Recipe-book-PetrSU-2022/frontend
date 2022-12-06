<template>
  <div class="px-2.5 w-48 h-72 rounded border border-gray">
    <div class="relative mt-2.5 w-[170px] h-44 rounded">
      <div class="relative z-10 flex justify-between">
        <div
          class="w-11 h-6 flex gap-0.5 items-center bg-main border border-gray font-bold rounded-tl rounded-br"
        >
          <span class="ml-1.5">{{ props.rating }}</span>
          <vue-feather type="star" size="9" />
        </div>
        <div
          class="w-9 h-6 flex items-center justify-center bg-main border border-gray rounded-tr rounded-bl hover:cursor-pointer"
        >
          <vue-feather type="bookmark" size="20" />
        </div>
      </div>
      <img class="absolute top-0" src="@/assets/icons/blini.svg" alt="" />
    </div>
    <div class="flex flex-wrap width-[170px] text-xl font-bold">
      {{ props.name }}
    </div>
    <div class="flex justify-between">
      <div class="font-bold">{{ props.portionsNumber }} пор</div>
      <div class="font-bold">{{ props.time }} мин</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  // import axios from 'axios';

  interface Filter {
    name: string;
    isSelected: boolean;
    bgColor: string;
  }

  // eslint-disable-next-line no-undef
  const props = defineProps({
    name: String,
    rating: Number,
    isFavorite: Boolean,
    time: Number,
    portionsNumber: Number,
  });

  const auth = useAuthStore();
  const router = useRouter();

  const hasAuthError: Ref<Boolean> = ref(false);

  function setBackgroundColor(filter: Filter) {
    if (!filter.isSelected) return;

    const colors: Array<string> = ['bg-light-red', 'bg-light-yellow', 'bg-light-green'];

    // eslint-disable-next-line no-param-reassign
    filter.bgColor = colors[Math.floor(3 * Math.random())];
  }
</script>

<style lang="scss" scoped></style>
