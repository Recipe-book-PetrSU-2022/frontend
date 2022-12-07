<template>
  <div class="mx-auto flex-col max-w-6xl">
    <div class="mt-12 w-[1160px] flex">
      <div class="text-black text-3xl font-extrabold">Кулинарная книга</div>
      <input
        class="ml-28 pl-2.5 w-[512px] border border-gray placeholder:text-gray"
        placeholder="Введите название рецепта..."
        name="searchRecipe"
        v-model="searchString"
      />
      <!--
      <button class="ml-2.5 w-16 h-9 border border-gray font-sans text-gray" type="submit">
        Искать
      </button>
      -->
      <vue-feather class="w-12 h-9 text-gray" type="search" size="20" />
      <button
        class="ml-auto mr-1 w-10 h-9 flex items-center justify-center bg-gray rounded hover:cursor-pointer"
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
        class="h-7 flex items-center justify-center select-none rounded border-2 border-gray hover:cursor-pointer"
        @click="selectFilter(filter)"
      >
        <div v-if="!filter.isSelected" class="rounded">
          <span class="px-2.5">{{ filter.name }}</span>
        </div>

        <div v-else class="flex items-center justify-center gap-1.5" :class="filter.bgColor">
          <span class="px-2.5">{{ filter.name }}</span>
          <vue-feather type="x" size="18" />
        </div>
      </div>
    </div>
    <hr class="mt-9 border-b border-dashed" />
    <div class="mt-12 flex items-end">
      <div class="text-2xl font-extrabold">Результаты поиска</div>
      <div class="ml-5 flex font-sans">Найдено {{ recipesSearchResult.length }} рецептов</div>
      <select
        class="ml-auto p-2.5 bg-gray text-main text-base rounded hover:cursor-pointer focus:ring-blue-500 focus:border-blue-500"
        v-model="sortParameter"
      >
        <option value="popular" selected>сначала популярные</option>
        <option value="fast">сначала быстрые</option>
        <option value="long">сначала долгие</option>
      </select>
    </div>
    <div class="mt-7 flex flex-wrap gap-x-12 gap-y-8">
      <RecipeCard
        v-for="recipe in recipesSearchResult"
        :key="recipe.id"
        :id="recipe.id"
        :rating="recipe.rating"
        :time="recipe.time"
        :portions-number="recipe.portionsNumber"
        :is-favorite="recipe.isFavorite"
        :name="recipe.name"
        :img-name="recipe.imgName"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { Ref } from 'vue';

  import axios, { type AxiosResponse } from 'axios';

  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  import RecipeCard from '@/components/RecipeCard.vue';

  interface Filter {
    id: number;
    name: string;
    isSelected: boolean;
    bgColor?: string;
  }

  interface RecipePreview {
    id: number;
    name: string;
    time: number;
    rating: number;
    portionsNumber: number;
    isFavorite: boolean;
    imgName: string;
    filters: string[];
  }

  const searchString: Ref<string> = ref('');
  const filters: Ref<Array<Filter>> = ref([]);
  const recipesList: Ref<Array<RecipePreview>> = ref([]);

  const recipesSearchResult: Ref<Array<RecipePreview>> = ref([]);
  const selectedFilters: Ref<Array<Filter>> = ref([]);

  const sortParameter: Ref<string> = ref('popular');

  watch(searchString, () => searchRecipes());

  function searchRecipes() {
    recipesSearchResult.value = recipesList.value;

    if (searchString.value !== '') {
      recipesSearchResult.value = recipesSearchResult.value.filter(
        (item) => item.name.indexOf(searchString.value) !== -1,
      );
    }

    if (selectedFilters.value.length !== 0) {
      recipesSearchResult.value = recipesSearchResult.value.filter((item) => {
        let hasFilter = false;
        selectedFilters.value.forEach((filter) => {
          if (item.filters.includes(filter.name)) {
            hasFilter = true;
          }
        });

        return hasFilter;
      });
    }
  }

  watch(sortParameter, (newVal) => sortRecipes(newVal));

  function sortRecipes(parameter: string) {
    if (parameter === 'popular') {
      recipesList.value = recipesList.value.sort((a, b) => b.rating - a.rating);
    } else if (parameter === 'fast') {
      recipesList.value = recipesList.value.sort((a, b) => a.time - b.time);
    } else {
      recipesList.value = recipesList.value.sort((a, b) => b.time - a.time);
    }
  }

  axios
    .get('/searchFilters', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: AxiosResponse<Array<Filter>>) => {
      filters.value = res.data;
    });

  axios
    .get('/recipesPreview', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: AxiosResponse<Array<RecipePreview>>) => {
      recipesList.value = res.data;
      recipesSearchResult.value = res.data;
    });

  const auth = useAuthStore();
  const router = useRouter();

  const hasAuthError: Ref<Boolean> = ref(false);

  function selectFilter(filter: Filter) {
    // eslint-disable-next-line no-param-reassign
    filter.isSelected = !filter.isSelected;

    setBackgroundColor(filter);

    if (!filter.isSelected) {
      selectedFilters.value.splice(
        selectedFilters.value.findIndex((item) => item.id === filter.id),
        1,
      );
    } else {
      selectedFilters.value.push(filter);
    }

    searchRecipes();
  }

  function setBackgroundColor(filter: Filter) {
    if (!filter.isSelected) return;

    const colors: Array<string> = ['bg-light-red', 'bg-light-yellow', 'bg-light-green'];

    // eslint-disable-next-line no-param-reassign
    filter.bgColor = colors[Math.floor(3 * Math.random())];
  }
</script>

<style lang="scss" scoped></style>
