import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ShoppingList } from '../../models/shopping-list.model';
import { Ingredient, IngredientStatusEnum } from '../../models';

const SHOPPING_LIST: ShoppingList = {
  id: 'ABCDEF',
  ingredients: [
    {
      id: 'id3',
      name: 'Corn',
      notes: '12oz can',
      status: IngredientStatusEnum.FULL,
      active: true,
    },
    {
      id: 'id3',
      name: 'Tomato Sauce',
      notes: '8oz can',
      status: IngredientStatusEnum.FULL,
      active: true,
    },
    {
      id: 'id3',
      name: 'Diced Tomatoes',
      notes: '12oz can',
      status: IngredientStatusEnum.FULL,
      active: true,
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private http: HttpClient) { }

  get(): Observable<ShoppingList | null> {
    // Attempt to retrieve the current, active shopping list,
    //  returning null if there isn't one
    return of(null);
  }

  create(): Observable<ShoppingList> {
    // Create a shopping list
    return of(SHOPPING_LIST);
  }

  refresh(): Observable<ShoppingList> {
    // Update the contents of the active shopping list
    return of(SHOPPING_LIST);
  }

  submit(ingredients: Ingredient[]): Observable<boolean> {
    return of(true);
  }
}
