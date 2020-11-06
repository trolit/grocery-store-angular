import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private filterProductsByQueryRef: (query: string) => void;

  onProductsFilteringRequest(filterProductsByQuery: () => void) {
    this.filterProductsByQueryRef = filterProductsByQuery;
  }

  requestProductsFiltering(query: string) {
    this.filterProductsByQueryRef(query);
  }
}
