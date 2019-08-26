export enum IngredientStatusEnum {
  EMPTY = 'empty',
  LOW = 'low',
  FULL = 'full'
}

export interface Ingredient {
  id: string;
  name: string;
  status: IngredientStatusEnum;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  active: boolean;
  url: string;
  notes: string;
}
