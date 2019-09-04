import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Ingredient, Recipe } from '../../models';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  search(): Observable<Ingredient[]> {
    return of([]);
  }

  create(ingredient: Partial<Ingredient>, recipe: Recipe): Observable<boolean> {
    return this.http
      // Create the ingredient via http
      .post<Ingredient>(`${environment.api}/ingredients/`, ingredient)
      .pipe(
        switchMap(
          ingr => this.addToRecipe(ingr, recipe)
        ),
        map(
          () => true
        )
      );
  }

  addToRecipe(ingredient: Ingredient, recipe: Recipe): Observable<boolean> {
    return this.http
      // Add the ingredient to the recipe
      .post(
        `${environment.api}/recipes/${recipe.id}/add_ingredient/`,
        {ingredient: ingredient.id}
      )
      .pipe(
        tap(
          // Request the recipe service update its data store
          () => this.recipeService.getAll()
        ),
        map(
          () => true
        )
      );
  }

  removeFromRecipe(ingredient: Ingredient, recipe: Recipe): Observable<boolean> {
    return this.http
      // Remove the ingredient from the recipe
      .post(
        `${environment.api}/recipes/${recipe.id}/remove_ingredient/`,
        {ingredient: ingredient.id}
      )
      .pipe(
        tap(
          // Request the recipe service update its data store
          () => this.recipeService.getAll()
        ),
        map(
          () => true
        )
      );
  }

  update(ingredient: Ingredient): Observable<boolean> {
    // Update the ingredient via http
    return this.http
      .patch(`${environment.api}/ingredients/${ingredient.id}/`, ingredient)
      .pipe(
        tap(
          () => this.recipeService.getAll()
        ),
        map(
          () => true
        )
      );
  }
}
