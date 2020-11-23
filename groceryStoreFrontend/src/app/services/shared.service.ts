import { Injectable } from '@angular/core';
import { Product } from '../models/product/product.model';
import { ProductOrder } from '../models/product/productOrder.model';
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
  private removeProductRef: (id: number) => void;
  private addProductRef: (product: Product) => void;
  private returnAllProductsRef: () => Product[];
  private addProductToCartRef: (product: Product, amount: number) => void;
  private increaseShoppingCartCurrentSizeValueRef: () => void;
  private resetShoppingCartCurrentSizeValueRef: () => void;
  private decreaseShoppingCartCurrentSizeValueRef: () => void;
  private updateShoppingCartCurrentSizeRef: () => void;
  private updateStockOfEachOrderedProductRef: (order: ProductOrder) => void;

  /* ******** BINDING FUNCTIONS ********* */

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

  onProductRemoveRequest(removeProduct: () => void) {
    this.removeProductRef = removeProduct;
  }

  onAddProductRequest(addProduct: () => void) {
    this.addProductRef = addProduct;
  }

  onAddProductToCartRequest(addProductToCart: () => void) {
    this.addProductToCartRef = addProductToCart;
  }

  onIncreaseShoppingCartCurrentSizeValueRequest(increaseShoppingCartCurrentSizeValue: () => void) {
    this.increaseShoppingCartCurrentSizeValueRef = increaseShoppingCartCurrentSizeValue;
  }

  onDecreaseShoppingCartCurrentSizeValueRequest(decreaseShoppingCartCurrentSizeValue: () => void) {
    this.decreaseShoppingCartCurrentSizeValueRef = decreaseShoppingCartCurrentSizeValue;
  }

  onShoppingCartCurrentSizeValueResetRequest(resetShoppingCartCurrentSizeValue: () => void) {
    this.resetShoppingCartCurrentSizeValueRef = resetShoppingCartCurrentSizeValue;
  }

  onUpdateShoppingCartCurrentSizeRequest(updateShoppingCartCurrentSize: () => void) {
    this.updateShoppingCartCurrentSizeRef = updateShoppingCartCurrentSize;
  }

  onUpdateStockOfEachOrderedProductRequest(updateStockOfEachOrderedProduct: () => void) {
    this.updateStockOfEachOrderedProductRef = updateStockOfEachOrderedProduct;
  }

  onReturnAllProductsRequest(returnAllProducts: () => Product[]) {
    this.returnAllProductsRef = returnAllProducts;
  }

  /* ******** REQUESTS (CALLABLE VIA OTHER COMPONENTS) ********* */

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

  requestProductPriceOverride(productPrice: ProductPrice) {
    this.overrideProductPriceRef(productPrice);
  }

  requestProductRemoval(id: number) {
    this.removeProductRef(id);
  }

  requestProductAdd(product: Product) {
    this.addProductRef(product);
  }

  requestProductAddToCart(product: Product, amount: number) {
    this.addProductToCartRef(product, amount);
  }

  increaseShoppingCartCurrentSizeValue() {
    this.increaseShoppingCartCurrentSizeValueRef();
  }

  decreaseShoppingCartCurrentSizeValue() {
    this.decreaseShoppingCartCurrentSizeValueRef();
  }

  resetShoppingCartCurrentSizeValue() {
    this.resetShoppingCartCurrentSizeValueRef();
  }

  updateShoppingCartCurrentSize() {
    this.updateShoppingCartCurrentSizeRef();
  }

  requestProductsFiltering(query: string) {
    this.filterProductsByQueryRef(query);
  }

  requestAllProducts(): Product[] {
    return this.returnAllProductsRef();
  }

  requestStockUpdateOfEachOrderedProduct(order: ProductOrder) {
    this.updateStockOfEachOrderedProductRef(order);
  }
}
