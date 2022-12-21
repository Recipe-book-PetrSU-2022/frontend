// export interface Recipe {
//   id: number;
//   name: string;
//   servings: number;
//   time: number;
//   country: string;
//   type: string;
//   rating: number;
//   imgName: string;
//   filters: string[];
//   ingredients: Ingredient[];
//   stages: Stage[];
// }

export interface Recipe {
  ID: number;
  StrRecipeName: string;
  IntTime: number;
  rating: number;
  IntServings: number;
  isFavorite: boolean;
  StrRecipeImage: string;
  StrRecipeCountry: string;
  StrRecipeType: string;
  filters: string[];
  RecipeStages: Stage[];
  RecipeIngredients: IngredientDescription[];
  RecipeComments: Comment[];
}
export interface Comment {
  ID: number;
  UpdatedAt: string;
  IntRate: number;
  StrCommentDesc: string;
}

export interface Ingredient {
  ID: number;
  StrIngredientName: string;
  IntCalories: number;
  IntProteins: number;
  IntFats: number;
  IntCarbohydrates: number;
}

export interface IngredientDescription {
  ID: number;
  IntGrams: number;
  Ingredient: Ingredient;
}

export interface Stage {
  id: number;
  StrStageDesc: string;
}
