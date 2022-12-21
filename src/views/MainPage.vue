<template>
  <!-- <div class="mt-12 text-2xl font-extrabold">Фильтры поиска</div>
  <div class="mt-8 flex flex-wrap gap-2.5">
    <div
      v-for="filter in filters"
      :key="filter.name + 1"
      class="h-7 flex items-center justify-center select-none rounded border-2 border-gray hover:cursor-pointer hover:outline hover:outline-1"
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
  </div> -->
  <!-- <hr class="mt-9 border-b border-dashed" /> -->
  <div class="mt-12 flex items-end">
    <div class="text-2xl font-extrabold">Результаты поиска</div>
    <div class="ml-5 flex font-sans">Найдено {{ recipesSearchResult.length }} рецептов</div>
    <select
      class="ml-auto p-2.5 bg-gray text-main text-base rounded hover:cursor-pointer active:border-0 focus:outline-none"
      v-model="sortParameter"
    >
      <!-- <option value="popular" selected>сначала популярные</option> -->
      <option value="fast" selected>сначала быстрые</option>
      <option value="long">сначала долгие</option>
    </select>
  </div>
  <div class="mt-7 flex flex-wrap gap-x-12 gap-y-8">
    <RecipeCard
      v-for="recipe in recipesSearchResult"
      :key="recipe.ID"
      :id="recipe.ID"
      :rating="-1"
      :time="recipe.IntTime"
      :portions-number="recipe.IntServings"
      :is-favorite="recipe.isFavorite"
      :name="recipe.StrRecipeName"
      :img-name="recipe.StrRecipeImage"
      :filters="recipe.filters"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, inject } from 'vue';
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
    ID: number;
    StrRecipeName: string;
    IntTime: number;
    rating: number;
    IntServings: number;
    isFavorite: boolean;
    StrRecipeImage: string;
    filters: string[];
  }

  const recipesList: Ref<Array<RecipePreview>> = ref([]);

  const searchString: Ref<string> = inject('searchString', '');
  const filters: Ref<Array<Filter>> = ref([]);

  const recipesSearchResult: Ref<Array<RecipePreview>> = ref([]);
  const selectedFilters: Ref<Array<Filter>> = ref([]);

  const sortParameter: Ref<string> = ref('fast');

  watch(searchString, () => searchRecipes());

  function searchRecipes() {
    recipesSearchResult.value = recipesList.value;

    if (searchString.value !== '') {
      recipesSearchResult.value = recipesSearchResult.value.filter(
        (item) => item.StrRecipeName.toLowerCase().indexOf(searchString.value.toLowerCase()) !== -1,
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
      // recipesSearchResult.value = recipesSearchResult.value.sort((a, b) => b.rating - a.rating);
    } else if (parameter === 'fast') {
      recipesSearchResult.value = recipesSearchResult.value.sort((a, b) => a.IntTime - b.IntTime);
    } else {
      recipesSearchResult.value = recipesSearchResult.value.sort((a, b) => b.IntTime - a.IntTime);
    }
  }

  // axios
  //   .get('/searchFilters', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then((res: AxiosResponse<Array<Filter>>) => {
  //     filters.value = res.data;
  //   });

  axios
    .get('http://157.230.103.196:1337/recipe/all', {
      headers: {
        'Access-Control-Allow-Origin': '*',
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
