import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../models';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private subject = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): Observable<Recipe[]> {
    this.http.get<Recipe[]>(`${environment.api}/recipes/`)
      .subscribe(
      next => this.subject.next(next)
    );

    return this.subject.asObservable();
  }

  create(recipe: Partial<Recipe>): Observable<boolean> {
    return this.http
      .post(`${environment.api}/recipes/`, recipe)
      .pipe(
        tap(
          () => this.getAll()
        ),
        map(
          () => true
        )
      );
  }

  update(recipe: Recipe): Observable<boolean> {
    return this.http
      .patch(`${environment.api}/recipes/${recipe.id}/`, recipe)
      .pipe(
        tap(
          () => this.getAll()
        ),
        map(
          () => true
        )
      );
  }

  delete(recipe: Recipe): Observable<boolean> {
    return this.http
      .delete(`${environment.api}/recipes/${recipe.id}/`)
      .pipe(
        tap(
          () => this.getAll()
        ),
        map(
          () => true
        )
      );
  }
}
