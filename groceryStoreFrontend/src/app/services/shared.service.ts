import { Injectable } from '@angular/core';
import { Product } from '../models/product/product.model';
import { ProductPrice } from '../models/product/productPrice.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private filterProductsByQueryRef: (query: string) => void;
  private sortProductsByCategoryRef: () => void;
  private sortProductsByStockDescRef: () => void;
  private sortProductsByPriceAscRef: () => void;
  private clearSortRef: () => void;
  private overrideProductPriceRef: (productPrice: ProductPrice) => void;
  private returnProductsRef: () => Product[];

  onProductsFilteringRequest(filterProductsByQuery: () => void) {
    this.filterProductsByQueryRef = filterProductsByQuery;
  }

  onSortByCategoryRequest(sortProductsByCategory: () => void) {
    this.sortProductsByCategoryRef = sortProductsByCategory;
  }

  onSortByStockRequest(sortProductsByStock: () => void) {
    this.sortProductsByStockDescRef = sortProductsByStock;
  }

  onSortByPriceRequest(sortProductsByPrice: () => void) {
    this.sortProductsByPriceAscRef = sortProductsByPrice;
  }

  onSortClear(clearSort: () => void) {
    this.clearSortRef = clearSort;
  }

  onProductPriceOverrideRequest(overrideProductPrice: () => void) {
    this.overrideProductPriceRef = overrideProductPrice;
  }

  onReturnProductsRequest(returnProducts: () => Product[]) {
    this.returnProductsRef = returnProducts;
  }

  requestProductPriceOverride(productPrice: ProductPrice) {
    this.overrideProductPriceRef(productPrice);
  }

  requestProductsFiltering(query: string) {
    this.filterProductsByQueryRef(query);
  }

  requestProducts(): Product[] {
    return this.returnProductsRef();
  }

  requestProductsSorting(field: string) {
    switch (field) {
      case 'category':
        this.sortProductsByCategoryRef();
        break;
      case 'stock':
        this.sortProductsByStockDescRef();
        break;
      case 'price':
        this.sortProductsByPriceAscRef();
        break;
      default:
        this.clearSortRef();
        break;
    }
  }
}
