import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IngredientStatusEnum, Recipe } from '../../models';

const RECIPES: Recipe[] = [
  {
    id: 'id',
    name: 'Chickpea Curry',
    ingredients: [
      {
        id: 'id3',
        name: 'Chickpeas',
        notes: '16oz can',
        status: IngredientStatusEnum.FULL,
        active: true,
      }
    ],
    active: true,
    url: '',
    notes: ''
  },
  {
    id: 'id2',
    name: 'Chili',
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
    ],
    active: true,
    url: '',
    notes: ''
  },
];

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Recipe[]> {
    return of(RECIPES);
    // return this.http
    //   .get<Recipe[]>(`${environment.api}/checkin/user/`);
  }

  get(id: string): Observable<Recipe> {
    return this.http
      .get<Recipe>(`${environment.api}/checkin/${id}`);
  }

  create(): Observable<void> {
    const data = {
    };

    return this.http
      .post<void>(`${environment.api}/checkin`, data);
  }

  update(): Observable<void> {
    const data = {
    };

    return this.http
      .put<void>(`${environment.api}/checkin/${42}`, data);
  }
}
