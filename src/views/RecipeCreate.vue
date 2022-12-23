<template>
  <div class="relative pb-14">
    <div class="mt-12 flex">
      <div class="flex flex-col">
        <img
          class="w-[250px]"
          :src="
            photoUrl
              ? photoUrl
              : getImgUrl(recipe.StrRecipeImage ? recipe.StrRecipeImage : 'recipe')
          "
        />
        <label class="mt-2.5 block mb-2 text-md font-medium" for="files"> Иконка рецепта</label>
        <input
          class="block w-[210px] text-sm border rounded cursor-pointer overflow-ellipsis focus:outline-none"
          id="files"
          type="file"
          @change="onFileChange"
        />
      </div>
      <div class="ml-14 w-[430px] flex flex-col gap-4">
        <div class="text-2xl font-extrabold">Добавление рецепта</div>
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center justify-between">
            <span class="font-bold">Название рецепта*:</span>
            <input
              v-model="recipe.StrRecipeName"
              class="pl-2.5 w-52 h-9 border border-gray rounded placeholder:font-sans"
              placeholder="Введите..."
            />
          </div>
          <div class="flex items-center justify-between">
            <span class="font-bold">Количество порций*:</span>
            <input
              v-model="recipe.IntServings"
              class="pl-2.5 w-52 h-9 border border-gray rounded placeholder:font-sans"
              placeholder="Введите..."
            />
          </div>
          <div class="flex items-center justify-between">
            <span class="font-bold">Время приготовления*:</span>
            <input
              v-model="recipe.IntTime"
              class="pl-2.5 w-52 h-9 border border-gray rounded placeholder:font-sans"
              placeholder="Введите..."
            />
          </div>
          <div class="flex items-center justify-between">
            <span class="font-bold">Страна:</span>
            <input
              v-model="recipe.StrRecipeCountry"
              class="pl-2.5 w-52 h-9 border border-gray rounded placeholder:font-sans"
              placeholder="Введите..."
            />
          </div>
          <div class="flex items-center justify-between">
            <span class="font-bold">Тип блюда:</span>
            <input
              v-model="recipe.StrRecipeType"
              class="pl-2.5 w-52 h-9 border border-gray rounded placeholder:font-sans"
              placeholder="Введите..."
            />
          </div>
        </div>
      </div>
    </div>
    <hr class="mt-8 border-b border-dashed" />
    <div class="mt-8 text-2xl font-extrabold">Список ингредиентов</div>
    <div class="mt-8 flex flex-wrap gap-3.5">
      <div class="py-2.5 px-2.5 w-64 h-32 border border-gray rounded hover:cursor-pointer">
        <div
          class="pl-4 stroke h-full flex items-center justify-center gap-4 bg-light-green hover:opacity-95"
          @click="openModal"
        >
          <vue-feather type="plus" size="24" />
          <div class="text-2xl font-extrabold">Новый ингредиент</div>
        </div>
      </div>
      <div
        v-for="ingredient in ingredients"
        :key="ingredient.ID"
        class="delete-stroke pl-2.5 w-64 min-h-[120px] rounded border border-gray hover:bg-light-red cursor-pointer"
        @mouseover="ingredient.isMouseOnIngredient = true"
        @mouseleave="ingredient.isMouseOnIngredient = false"
      >
        <div
          v-if="ingredient.isMouseOnIngredient"
          class="h-full flex items-center"
          @click="removeIngredient(ingredient)"
        >
          <vue-feather class="w-14 h-8 z-10" type="trash" size="25" fill="black" />
          <div class="ml-3 text-2xl font-extrabold z-0"> Удалить ингредиент </div>
        </div>
        <div v-else>
          <div class="mt-2.5 text-xl font-bold">
            {{ ingredient.Ingredient.StrIngredientName }}
          </div>
          <div class="mt-2.5 flex gap-2">
            <div class="font-bold">Количество:</div>
            <span class="font-sans">{{ ingredient.IntGrams }} граммов</span>
          </div>
        </div>
      </div>
    </div>

    <hr class="mt-8 border-b border-dashed" />
    <div class="mt-8 text-2xl font-extrabold">Описание приготовления</div>
    <div class="mt-2 flex flex-col">
      <div
        v-for="(stage, index) in stages"
        :key="stage.id"
        class="stage mt-5 pb-8 border-b border-solid border-gray flex items-start"
      >
        <vue-feather
          class="cursor-pointer"
          type="x"
          stroke="gray"
          size="18"
          @click="removeStage(stage)"
        />
        <div class="ml-2.5 w-20 font-bold text-5xl">
          {{ index > 9 ? index : `0${index}` }}
        </div>
        <textarea
          class="px-2.5 py-2.5 ml-12 w-[744px] min-h-[120px] font-sans border border-gray rounded"
          v-model="stage.StrStageDesc"
          type="text"
        ></textarea>
      </div>
      <div class="mt-9 ml-20 flex gap-4 cursor-pointer select-none" @click="addStage">
        <vue-feather type="plus" stroke="gray" />
        <span class="font-bold">Добавить этап</span>
      </div>
      <div
        class="ml-auto mt-8 mr-4 px-2.5 py-2 w-32 h-9 flex gap-3 items-center bg-gray rounded hover:opacity-95 cursor-pointer"
        @click="saveRecipe"
      >
        <span class="flex items-center text-main font-sans">Сохранить</span>
        <vue-feather type="check" size="14" stroke="white" />
      </div>
    </div>
    <div class="modal" :class="isModalOpen ? 'block' : 'hidden'" ref="modal">
      <div class="modal-content w-[500px] h-80 flex flex-col rounded items-center bg-main">
        <div class="mt-12 text-2xl font-extrabold">Добавление ингредиента</div>
        <select
          class="mt-8 py-2 px-2.5 w-[303px] h-9 font-sans bg-main rounded border border-gray cursor-pointer"
          v-model="ingredientSelected"
        >
          <option value="" selected disabled>Варианты</option>
          <option v-for="item in ingredientsList" :key="item.ID" :value="item">
            {{ item.StrIngredientName }}
          </option>
        </select>
        <input
          class="mt-2.5 py-2 px-2.5 w-[303px] h-9 font-sans bg-main rounded border border-gray cursor-text"
          type="number"
          v-model="ingredientSelectedGrams"
        />
        <div class="px-5 mt-8 flex gap-5">
          <div
            class="px-2.5 py-2 w-26 h-9 flex gap-3 items-center bg-gray rounded hover:opacity-95 cursor-pointer"
            @click="closeModal"
          >
            <span class="flex items-center text-main font-sans">Отмена</span>
            <vue-feather type="x" size="14" stroke="white" />
          </div>
          <div
            class="px-2.5 py-2 w-26 h-9 flex gap-3 items-center bg-gray rounded hover:opacity-95 cursor-pointer"
            @click="saveModal"
          >
            <span class="flex items-center text-main font-sans">Сохранить</span>
            <vue-feather type="check" size="14" stroke="white" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <hr class="mt-8 border-b border-dashed" /> -->
</template>

<script setup lang="ts">
  import { ref, watch, inject, onMounted } from 'vue';
  import type { Recipe, Ingredient, IngredientDescription, Stage } from '@/stores/types';
  import type { Ref } from 'vue';

  import axios, { type AxiosResponse } from 'axios';

  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();

  const route = useRoute();

  const props = defineProps(['id']);
  const isMouseOnIngredient = ref([]);
  const modal = ref(null);
  const isModalOpen = ref(false);
  const recipe: Ref<Recipe> = ref({
    ID: 0,
    StrRecipeName: '',
    IntTime: 0,
    rating: 0,
    IntServings: 0,
    isFavorite: false,
    StrRecipeImage: '',
    StrRecipeCountry: '',
    StrRecipeType: '',
    filters: [],
    RecipeStages: [],
    RecipeIngredients: [],
    RecipeComments: [],
    BoolRecipeVisibility: true,
  });

  const stages: Ref<Array<Stage>> = ref([]);

  const photoUrl = ref('');
  const ingredientsList: Ref<Ingredient[]> = ref([]);
  const ingredientSelected: Ref<Ingredient> = ref('');
  const ingredientSelectedGrams: Ref<number> = ref(0);
  const file = ref(null);

  const ingredients: Ref<IngredientDescription[]> = ref([]);

  window.onclick = (event) => {
    if (event.target === modal.value) {
      isModalOpen.value = false;
    }
  };

  if (props.id !== '-1') {
    axios
      .get(`http://157.230.103.196:1337/recipe/${route.params.id}`)
      .then((res: AxiosResponse<Recipe>) => {
        recipe.value = res.data;
        ingredients.value = recipe.value.RecipeIngredients;
        stages.value = recipe.value.RecipeStages;
      });
  } else {
    axios.post(`http://157.230.103.196:1337/my-recipe/add`).then((res) => {
      recipe.value.ID = res.data.id;
    });
  }

  function getImgUrl(imgName: string | undefined) {
    if (imgName === 'recipe') return new URL(`../assets/${imgName}.svg`, import.meta.url).href;
    return `http://157.230.103.196:1337/assets/${imgName}`;
  }

  function onFileChange(e) {
    file.value = e.target.files[0];

    console.log(file);

    photoUrl.value = URL.createObjectURL(file.value);

    const fd = new FormData();
    fd.append('file', file.value);

    axios.post(`http://157.230.103.196:1337/my-recipe/upload-cover/${recipe.value.ID}`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // stage

  async function addStage() {
    await axios
      .post(`http://157.230.103.196:1337/my-recipe/${recipe.value.ID}/stage/add`, {
        description: '',
      })
      .then((res) => {
        stages.value.push({
          index: stages.value.length,
          ID: res.data.id,
          StrStageDesc: '',
        });
      });
  }

  async function removeStage(stageItem: Stage) {
    await axios.delete(`http://157.230.103.196:1337/my-recipe/stage/${stageItem.ID}/delete`).then((res) => {
      const itemIndex = stages.value.findIndex((item) => item.index === stageItem.index);

      console.log(itemIndex);

      stages.value.splice(itemIndex, 1);

      stages.value.forEach((item, index) => (item.index = index));
    });
  }

  // modal

  async function openModal() {
    await axios.get(`http://157.230.103.196:1337/ingredient/all`).then((res) => {
      ingredientsList.value = res.data;
    });

    isModalOpen.value = true;
  }

  function closeModal() {
    isModalOpen.value = false;
  }

  async function saveModal() {
    if (ingredientSelected.value !== '') {
      await axios
        .post(`http://157.230.103.196:1337/my-recipe/${recipe.value.ID}/ingredient/add`, {
          ingredient_id: ingredientSelected.value.ID,
          grams: ingredientSelectedGrams.value,
        })
        .then((res) => {
          console.log(res);

          ingredients.value.push({
            ID: ingredients.value.length,
            IntGrams: ingredientSelectedGrams.value,
            Ingredient: ingredientSelected.value,
            isMouseOnIngredient: false,
          });
        });
    }

    closeModal();
  }

  // ingr

  async function removeIngredient(ingredient: IngredientDescription) {
    // await axios
    //   .post(`http://157.230.103.196:1337/my-recipe/${recipe.value.ID}/ingredient/delete`, {
    //     ingredient_id: ingredient.ID,
    //   })
    //   .then((res) => {
    //     console.log(res);

    //     ingredients.value.push({
    //       ID: ingredients.value.length,
    //       IntGrams: ingredientSelectedGrams.value,
    //       Ingredient: ingredientSelected.value,
    //       isMouseOnIngredient: false,
    //     });
    //   });
    const itemIndex = ingredients.value.findIndex((item) => item.ID === ingredient.ID);

    console.log(itemIndex);

    ingredients.value.splice(itemIndex, 1);

    ingredients.value.forEach((item, index) => (item.ID = index));
  }

  // recipe

  async function saveRecipe() {
    recipe.value.RecipeStages = stages.value;
    recipe.value.RecipeIngredients = ingredients.value;

    stages.value.forEach((stage) => {
      axios.post(`http://157.230.103.196:1337/my-recipe/stage/${stage.ID}/update`, {
        description: stage.StrStageDesc,
      });
    });

    // const formData = new FormData();

    // // eslint-disable-next-line no-restricted-syntax
    // for (const key in recipe.value) {
    //   if (Object.prototype.hasOwnProperty.call(recipe.value, key)) {
    //     console.log(recipe.value[key]);

    //     if (key === 'StrRecipeImage') {
    //       formData.append(key, file.value);
    //     } else {
    //       formData.append(key, JSON.stringify(recipe.value[key]));
    //     }
    //   }
    // }
    // console.log(formData.get('RecipeStages'));

    axios
      .post(
        `http://157.230.103.196:1337/my-recipe/complete/${recipe.value.ID}`,
        {
          name: recipe.value.StrRecipeName,
          servings: Number(recipe.value.IntServings),
          time: Number(recipe.value.IntTime),
          country: recipe.value.StrRecipeCountry,
          type: recipe.value.StrRecipeType,
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((res) => {
        router.push({ name: 'PersonalCabinet' });
      });
  }
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

  .delete-stroke {
    position: relative;
  }

  .delete-stroke:hover:before {
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

  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
