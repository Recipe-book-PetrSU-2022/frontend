<template>
  <div class="mx-auto flex-col max-w-6xl">
    <div class="mt-12 w-[1160px] flex">
      <div class="text-black text-3xl font-extrabold">Кулинарная книга</div>
      <input
        class="ml-28 pl-2.5 w-[512px] border border-gray placeholder:text-gray"
        placeholder="Введите название рецепта..."
        name="searchRecipe"
      />
      <button class="ml-2.5 w-16 h-9 border border-gray font-sans text-gray" type="submit">
        Искать
      </button>
      <button
        class="ml-28 w-10 h-9 flex items-center justify-center bg-gray rounded hover:cursor-pointer"
      >
        <vue-feather type="log-out" size="20" stroke="white" />
      </button>
    </div>
    <div class="mt-12 text-2xl font-extrabold">Фильтры поиска</div>
    <div class="mt-8 flex flex-wrap gap-2.5">
      <!-- eslint-disable-next-line vue/require-v-for-key-->
      <div
        v-for="filter in filters"
        :key="filter.name + 1"
        class="h-7 flex items-center justify-center rounded border-2 border-gray hover:cursor-pointer"
        @click="setBackgroundColor(filter)"
      >
        <div
          v-if="!filter.isSelected"
          class="rounded"
          @click="filter.isSelected = !filter.isSelected"
        >
          <span class="px-2.5">{{ filter.name }}</span>
        </div>

        <div
          v-else
          class="flex items-center justify-center gap-1.5"
          @click="filter.isSelected = !filter.isSelected"
          :class="filter.bgColor"
        >
          <span class="px-2.5">{{ filter.name }}</span>
          <vue-feather type="x" size="18" />
        </div>
      </div>
    </div>
    <hr class="mt-9 border-b border-dashed" />
    <div class="mt-12 flex items-end">
      <div class="text-2xl font-extrabold">Результаты поиска</div>
      <div class="ml-5 flex font-sans">Найдено 25 рецептов</div>
      <select
        class="ml-auto p-2.5 bg-gray text-main text-base rounded hover:cursor-pointer focus:ring-blue-500 focus:border-blue-500"
      >
        <option selected>сортировка</option>
        <option value="popular">сначала популярные</option>
        <option value="fast">сначала быстрые</option>
        <option value="long">сначала долгие</option>
      </select>
    </div>
    <div class="mt-7 flex flex-wrap gap-x-12 gap-y-8">
      <RecipeCard
        v-for="n in 30"
        :rating="4.3"
        :time="30"
        :portions-number="4"
        :is-favorite="true"
        name="Блины с творогом"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  import RecipeCard from '@/components/RecipeCard.vue';

  // import axios from 'axios';

  interface Filter {
    name: string;
    isSelected: boolean;
    bgColor: string;
  }

  const filters: Ref<Array<Filter>> = ref([
    {
      name: 'завтрак',
      isSelected: true,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'обед',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'ужин',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'десерт',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'мясо',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'рыба',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'напитки',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'горячее',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'холодное',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'закуска',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'углеводы',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
    {
      name: 'выпечка',
      isSelected: false,
      bgColor: 'bg-light-yellow',
    },
  ]);

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
