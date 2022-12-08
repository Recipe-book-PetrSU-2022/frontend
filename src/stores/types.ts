export interface Recipe {
  id: number;
  name: string;
  servings: number;
  time: number;
  country: string;
  type: string;
  rating: number;
  imgName: string;
  filters: string[];
  ingredients: Ingredient[];
  stages: Stage[];
}

export interface Ingredient {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  capacity: string | number;
}

export interface Stage {
  id: number;
  description: string;
  number: number;
}
