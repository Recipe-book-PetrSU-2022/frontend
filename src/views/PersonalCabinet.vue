<template>
  <div class="mt-12 flex-col">
    <div class="flex gap-11">
      <img class="py-11 px-12 border" src="@/assets/profile.svg" />
      <div v-if="!isEditMode" class="mt-8 flex flex-col gap-12">
        <div class="flex-col gap-1">
          <div class="flex">
            <span class="font-extrabold">Логин:</span>
            <span class="ml-[134px] font-sans">Rakabidasta</span>
          </div>
          <div class="flex">
            <span class="font-extrabold">Почта:</span>
            <span class="ml-[134px] font-sans">rakabidasta@gmail.com</span>
          </div>
          <div class="flex">
            <span class="font-extrabold">Количество рецептов:</span>
            <span class="ml-2 font-sans">10</span>
          </div>
          <div class="flex">
            <span class="font-extrabold">Рейтинг:</span>
            <span class="ml-[114px] font-sans">4.6</span>
          </div>
        </div>
        <div class="flex">
          <div
            class="px-2.5 py-2 flex bg-gray text-main font-sans rounded gap-2.5 items-center hover:cursor-pointer"
            @click="isEditMode = !isEditMode"
          >
            <span class="font-sans">Редактировать</span>
            <vue-feather type="edit-2" size="14" stroke="white" fill="white" />
          </div>
          <div
            class="ml-2.5 px-2.5 py-2 flex bg-gray text-main rounded gap-2.5 items-center hover:cursor-pointer"
          >
            <span class="font-sans">Удалить</span>
            <vue-feather type="trash" size="14" stroke="white" fill="white" />
          </div>
        </div>
      </div>
      <div v-else class="mt-8 flex flex-col gap-12">
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center">
            <span class="font-extrabold">Логин:</span>
            <input
              v-model="password"
              class="ml-[165px] pl-2.5 w-52 h-9 border border-gray rounded placeholder:font-sans"
              placeholder="Введите..."
            />
          </div>
          <div class="flex items-center">
            <span class="font-extrabold">Почта:</span>
            <input
              v-model="password"
              class="ml-[165px] pl-2.5 w-52 h-9 border border-gray rounded placeholder:font-sans"
              placeholder="Введите..."
            />
          </div>
          <div class="flex items-center">
            <span class="font-extrabold">Пароль:</span>
            <input
              v-model="password"
              class="ml-[155px] pl-2.5 w-52 h-9 border border-gray rounded placeholder:font-sans"
              placeholder="Введите..."
            />
          </div>
          <div class="flex items-center">
            <span class="font-extrabold">Подтверждение пароля:</span>
            <input
              v-model="password"
              class="ml-[27px] pl-2.5 w-52 h-9 border border-gray rounded placeholder:font-sans"
              placeholder="Введите..."
            />
          </div>
        </div>
        <div v-if="!isEditMode" class="flex">
          <div
            class="px-2.5 py-2 flex bg-gray text-main font-sans rounded gap-2.5 items-center hover:cursor-pointer"
          >
            <span class="font-sans">Редактировать</span>
            <vue-feather type="edit-2" size="14" stroke="white" fill="white" />
          </div>
          <div
            class="ml-2.5 px-2.5 py-2 flex bg-gray text-main rounded gap-2.5 items-center hover:cursor-pointer"
          >
            <span class="font-sans">Удалить</span>
            <vue-feather type="trash" size="14" stroke="white" fill="white" />
          </div>
        </div>
        <div v-else class="flex">
          <div
            class="px-2.5 py-2 flex bg-gray text-main font-sans rounded gap-2.5 items-center hover:cursor-pointer"
            @click="isEditMode = !isEditMode"
          >
            <span class="font-sans">Сохранить</span>
            <vue-feather type="check" size="16" stroke="white" />
          </div>
        </div>
      </div>
    </div>
    <hr class="mt-8 border-b border-dashed" />
    <div class="mt-8 text-2xl font-extrabold">Мои рецепты</div>
    <div class="mt-7 flex gap-x-14 gap-y-8">
      <div class="py-2.5 px-2.5 h-72 border border-gray rounded hover:cursor-pointer">
        <div
          class="stroke w-[190px] h-full flex flex-col items-center justify-center bg-light-green"
        >
          <vue-feather type="plus" size="28" />
          <div class="mt-4 w-20 flex justify-center text-2xl font-extrabold">Новый рецепт</div>
        </div>
      </div>
      <div class="overflow-auto flex gap-x-14 gap-y-8">
        <RecipeCard
          v-for="recipe in recipesList"
          :key="recipe.id"
          :id="recipe.id"
          :rating="recipe.rating"
          :time="recipe.time"
          :portions-number="recipe.portionsNumber"
          :is-favorite="recipe.isFavorite"
          :name="recipe.name"
          :img-name="recipe.imgName"
          :filters="recipe.filters"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, inject } from 'vue';
  import type { Recipe, Ingredient, Stage } from '@/stores/types';
  import type { Ref } from 'vue';
  import RecipeCard from '@/components/RecipeCard.vue';

  import axios, { type AxiosResponse } from 'axios';

  import { useRoute } from 'vue-router';

  const route = useRoute();

  const recipe: Ref<Recipe | null> = ref(null);

  const isEditMode: Ref<boolean> = ref(false);

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

  const recipesList: Ref<Array<RecipePreview>> = ref([]);

  axios
    .get('/recipesPreview', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: AxiosResponse<Array<RecipePreview>>) => {
      recipesList.value = res.data;
    });
</script>
<style lang="scss">
  .stroke {
    position: relative;
  }
  .stroke::before {
    content: '';
    background-image: url('@/assets/stroke.png');
    background-size: contain;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.1;
  }
</style>
