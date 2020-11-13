import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product/product.model';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/handlers/errorHandler';
import { ProductMeasurement } from 'src/app/models/product/productMeasurement.model';
import { StatusResponse } from 'src/app/models/statusResponse.model';
import { ProductCreate } from 'src/app/models/product/productCreate.model';
import { ProductPercentage } from 'src/app/models/product/productPercentage.model';
import { ProductPrice } from 'src/app/models/product/productPrice.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private errorHandler: ErrorHandler) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${environment.apiUrl}/products`)
      .pipe(catchError(this.errorHandler.handleError<Product[]>('getProducts', [])));
  }

  getFilteredProducts(query: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${environment.apiUrl}/products${query.length > 0 ? `?search=${query}` : ''}`)
      .pipe(catchError(this.errorHandler.handleError<Product[]>('getFilteredProducts', [])));
  }

  getAllMeasurements(): Observable<ProductMeasurement[]> {
    return this.http
      .get<ProductMeasurement[]>(`${environment.apiUrl}/products/measurements`)
      .pipe(catchError(this.errorHandler.handleError<ProductMeasurement[]>('getMeasurements', [])));
  }

  deleteProduct(id: number): Observable<StatusResponse> {
    return this.http
      .delete(`${environment.apiUrl}/products/${id}`, { observe: 'response' })
      .pipe(catchError(this.errorHandler.handleError<StatusResponse>('deleteProduct')));
  }

  createProduct(productToAdd: ProductCreate): Observable<number> {
    return this.http
      .post<number>(`${environment.apiUrl}/products`, productToAdd)
      .pipe(catchError(this.errorHandler.handleError<number>('createProduct')));
  }

  changeProductPriceByPercentage(
    id: number,
    productPercentage: ProductPercentage,
  ): Observable<ProductPrice> {
    return this.http.patch<ProductPrice>(
      `${environment.apiUrl}/products/${id}/price`,
      productPercentage,
    );
  }
}
