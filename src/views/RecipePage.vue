<template>
  <div class="mt-12 flex">
    <img class="w-[250px]" :src="getImgUrl(recipe?.StrRecipeImage)" alt="" />
    <div class="ml-12 flex-col">
      <div class="flex items-center gap-3">
        <div class="text-2xl font-bold">{{ recipe?.StrRecipeName }}</div>
        <!-- <vue-feather type="star" size="24" stroke="light-gray" fill="green" />
        <span class="text-2xl font-bold">{{ recipe?.rating }}</span> -->
        <div class="flex gap-2.5">
          <div
            v-for="filter in recipe?.filters"
            :key="filter + 1"
            class="px-2.5 py-1 h-7 flex items-center rounded border border-gray font-sans text-gray"
          >
            {{ filter }}
          </div>
        </div>
      </div>
      <div class="mt-12 flex flex-col gap-5">
        <div class="flex items-center gap-1">
          <span class="font-bold">Количество порций:</span>
          <span class="ml-11 font-sans">{{ recipe?.IntServings }}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-bold">Время приготовления:</span>
          <span class="ml-6 font-sans">{{ recipe?.IntTime }} мин</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-bold">Страна:</span>
          <span class="ml-36 font-sans">{{ recipe?.StrRecipeCountry }}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-bold">Тип блюда:</span>
          <span class="ml-[120px] font-sans">{{ recipe?.StrRecipeType }}</span>
        </div>
      </div>
    </div>
  </div>
  <hr class="mt-8 border-b border-dashed" />
  <div class="mt-8 text-2xl font-extrabold">Список ингредиентов</div>
  <div class="mt-8 flex flex-wrap gap-2.5">
    <div
      v-for="ingredient in recipe?.RecipeIngredients"
      :key="ingredient.ID"
      class="pl-2.5 w-60 h-20 rounded border border-gray"
    >
      <div class="mt-2.5 text-xl font-bold">
        {{ ingredient.Ingredient.StrIngredientName }}
      </div>
      <div class="mt-2.5 flex gap-2">
        <div class="font-bold">Количество:</div>
        <span class="font-sans">{{ ingredient.IntGrams }} граммов</span>
      </div>
    </div>
  </div>
  <hr class="mt-8 border-b border-dashed" />
  <div class="mt-8 text-2xl font-extrabold">Описание приготовления</div>
  <div class="mt-2 flex flex-col">
    <div
      v-for="(stage, index) in recipe?.RecipeStages"
      :key="stage.ID"
      class="stage mt-5 pb-8 border-b border-solid border-gray flex items-center"
    >
      <div class="font-bold text-5xl">
        {{ index > 9 ? index : `0${index}` }}
      </div>
      <div class="ml-12 w-[744px] font-sans">{{ stage.StrStageDesc }}</div>
    </div>
  </div>
  <!-- <hr class="mt-8 border-b border-dashed" /> -->
</template>

<script setup lang="ts">
  import { ref, watch, inject } from 'vue';
  import type { Recipe, Ingredient, Stage } from '@/stores/types';
  import type { Ref } from 'vue';

  import axios, { type AxiosResponse } from 'axios';

  import { useRoute } from 'vue-router';

  const route = useRoute();

  const recipe: Ref<Recipe | null> = ref(null);

  axios
    .get(`http://157.230.103.196:1337/recipe/${route.params.id}`)
    .then((res: AxiosResponse<Recipe>) => {
      recipe.value = res.data;
    });

  function getImgUrl(imgName: string | undefined) {
    return `http://157.230.103.196:1337/assets/${imgName}`;
  }
</script>
<style lang="scss">
  .stage:last-child {
    border: none;
  }
</style>
