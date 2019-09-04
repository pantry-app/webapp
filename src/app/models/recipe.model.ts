export enum IngredientStatusEnum {
  EMPTY = 'empty',
  LOW = 'low',
  FULL = 'full'
}

export const IngredientStatusArray: IngredientStatusEnum[] = [
  IngredientStatusEnum.EMPTY,
  IngredientStatusEnum.LOW,
  IngredientStatusEnum.FULL
];

export interface Ingredient {
  id: string;
  name: string;
  status: IngredientStatusEnum;
  notes: string;
  active: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  active: boolean;
  url: string;
  notes: string;
}
