<template>
  <div class="mt-12 flex">
    <img class="w-[250px]" :src="getImgUrl(recipe?.imgName)" alt="" />
    <div class="ml-12 flex-col">
      <div class="flex items-center gap-3">
        <div class="text-2xl font-bold">{{ recipe?.name }}</div>
        <vue-feather type="star" size="24" stroke="light-gray" fill="green" />
        <span class="text-2xl font-bold">{{ recipe?.rating }}</span>
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
          <span class="ml-11 font-sans">{{ recipe?.servings }}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-bold">Время приготовления:</span>
          <span class="ml-6 font-sans">{{ recipe?.time }} мин</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-bold">Страна:</span>
          <span class="ml-36 font-sans">{{ recipe?.country }}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-bold">Тип блюда:</span>
          <span class="ml-32 font-sans">{{ recipe?.type }}</span>
        </div>
      </div>
    </div>
  </div>
  <hr class="mt-8 border-b border-dashed" />
  <div class="mt-8 text-2xl font-extrabold">Список ингредиентов</div>
  <div class="mt-8 flex gap-2.5">
    <div
      v-for="ingredient in recipe?.ingredients"
      :key="ingredient.id"
      class="pl-2.5 w-60 h-20 rounded border border-gray"
    >
      <div class="mt-2.5 text-xl font-bold">
        {{ ingredient.name }}
      </div>
      <div class="mt-2.5 flex gap-2">
        <div class="font-bold">Количество:</div>
        <span class="font-sans">{{ ingredient.capacity }} граммов</span>
      </div>
    </div>
  </div>
  <hr class="mt-8 border-b border-dashed" />
  <div class="mt-8 text-2xl font-extrabold">Описание приготовления</div>
  <div class="mt-2 flex flex-col">
    <div
      v-for="stage in recipe?.stages"
      :key="stage.id"
      class="stage mt-5 pb-8 border-b border-solid border-gray flex items-center"
    >
      <div class="font-bold text-5xl">
        {{ stage.number > 9 ? stage.number : `0${stage.number}` }}
      </div>
      <div class="ml-12 w-[744px] font-sans">{{ stage.description }}</div>
    </div>
  </div>
  <hr class="mt-8 border-b border-dashed" />
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
    .get('/recipes', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: AxiosResponse<Array<Recipe>>) => {
      recipe.value = res.data[route.params.id];
    });

  function getImgUrl(imgName: string | undefined) {
    return new URL(`../assets/icons/recipesPreview/${imgName}.svg`, import.meta.url).href;
  }
</script>
<style lang="scss">
  .stage:last-child {
    border: none;
  }
</style>
