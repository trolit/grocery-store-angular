import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/handlers/errorHandler';
import { Category } from 'src/app/models/category/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private errorHandler: ErrorHandler) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${environment.apiUrl}/categories`)
      .pipe(catchError(this.errorHandler.handleError<Category[]>('getCategories', [])));
  }
}
