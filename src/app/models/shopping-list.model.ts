import { Ingredient } from './recipe.model';

export interface ShoppingList {
  id: string;
  ingredients: Ingredient[];
}
