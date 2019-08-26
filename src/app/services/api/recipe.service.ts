import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<void> {
    return this.http
      .get<void>(`${environment.api}/checkin/user/`);
  }

  get(id: number): Observable<void> {
    return this.http
      .get<void>(`${environment.api}/checkin/${id}`);
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
