import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product.model';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/components/handlers/errorHandler';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private errorHandler : ErrorHandler) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`)
      .pipe(
        catchError(this.errorHandler.handleError<Product[]>('getProducts', []))
      );
  }
}
