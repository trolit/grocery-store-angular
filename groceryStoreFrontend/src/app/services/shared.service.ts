import { Injectable } from '@angular/core';
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

  requestProductPriceOverride(productPrice: ProductPrice) {
    this.overrideProductPriceRef(productPrice);
  }

  requestProductsFiltering(query: string) {
    this.filterProductsByQueryRef(query);
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
