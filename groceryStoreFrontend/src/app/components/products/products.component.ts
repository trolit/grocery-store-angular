/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Product } from 'src/app/models/product/product.model';
import { ProductOrder } from 'src/app/models/product/productOrder.model';
import { ProductPriceUpdate } from 'src/app/models/product/productPriceUpdate.model';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  nonSortedProducts: Product[];
  nonFilteredNorSortedProducts: Product[];
  products: Product[];
  lastSortKeyword = 'none';
  private cols: number;
  private totalPrice: number;
  wereProductsLoaded = false;
  @Input() areProductsVisible: boolean;
  lastFilterQuery: string;
  readonly SMALL_RES: number = 1030;
  readonly MED_RES: number = 1400;
  readonly HIGH_RES: number = 1800;
  readonly SORT_BY_STOCK: string = 'stock';
  readonly SORT_BY_PRICE: string = 'price';
  readonly SORT_BY_CATEGORY: string = 'category';

  constructor(private productService: ProductService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getProducts();
    this.defineColsNumber(window.innerWidth);
    this.bindMethodsForSharedService();
  }

  /* ******** EVENTS ********* */

  onScreenResize(event: UIEvent): void {
    const currentWidth = (event.target as Window).innerWidth;
    this.defineColsNumber(currentWidth);
  }

  onSliderInputChange(event: MatSliderChange, product: Product): void {
    this.totalPrice = product.price * event.value;
    product.totalPrice = this.totalPrice.toFixed(2);
  }

  /* ******** INITIALIZERS ********* */

  private bindMethodsForSharedService(): void {
    this.sharedService.onProductsFilteringRequest(this.filterProductsByQuery.bind(this));
    this.sharedService.onSortByCategoryRequest(this.sortProductsByCategory.bind(this));
    this.sharedService.onSortByPriceRequest(this.sortProductsByPriceAsc.bind(this));
    this.sharedService.onSortByStockRequest(this.sortProductsByStockDesc.bind(this));
    this.sharedService.onSortClear(this.clearSort.bind(this));
    this.sharedService.onProductPriceOverrideRequest(this.overrideProductPrice.bind(this));
    this.sharedService.onProductRemoveRequest(this.removeProduct.bind(this));
    this.sharedService.onAddProductRequest(this.addProductAndRearrangeData.bind(this));
    this.sharedService.onReturnAllProductsRequest(this.returnAllProducts.bind(this));
    this.sharedService.onUpdateStockOfEachOrderedProductRequest(
      this.updateStockPropertyOfEachOrderedProduct.bind(this),
    );
  }

  private getProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.setForEachProductTotalPrice(res);
      this.products = res;
      this.nonSortedProducts = res;
      this.nonFilteredNorSortedProducts = res;
      this.wereProductsLoaded = true;
      this.lastFilterQuery = '';
    });
  }

  private defineColsNumber(currentWidth: number): void {
    if (currentWidth <= this.SMALL_RES) {
      this.cols = 1;
    } else if (currentWidth > this.SMALL_RES && currentWidth < this.MED_RES) {
      this.cols = 2;
    } else if (currentWidth >= this.MED_RES && currentWidth < this.HIGH_RES) {
      this.cols = 3;
    } else if (currentWidth >= this.HIGH_RES) {
      this.cols = 4;
    } else {
      this.cols = 5;
    }
  }

  /* ******** PRODUCT SORTING ********* */

  private sortProductsIfLastSortKeywordIsNotNone(): void {
    switch (this.lastSortKeyword) {
      case this.SORT_BY_STOCK:
        this.sortProductsByStockDesc();
        break;
      case this.SORT_BY_PRICE:
        this.sortProductsByPriceAsc();
        break;
      case this.SORT_BY_CATEGORY:
        this.sortProductsByCategory();
        break;
      default:
        break;
    }
  }

  private sortProductsByCategory(): void {
    this.products = [...this.products].sort((a, b) => a.category.localeCompare(b.category));
    this.updateLastSortKeywordVariable(this.SORT_BY_CATEGORY);
  }

  private sortProductsByPriceAsc(): void {
    this.products = [...this.products].sort((a, b) => a.price - b.price);
    this.updateLastSortKeywordVariable(this.SORT_BY_PRICE);
  }

  private sortProductsByStockDesc(): void {
    this.products = [...this.products].sort((a, b) => b.stock - a.stock);
    this.updateLastSortKeywordVariable(this.SORT_BY_STOCK);
  }

  private updateLastSortKeywordVariable(sortKeyword: string): void {
    this.lastSortKeyword = sortKeyword;
  }

  private clearSort(): void {
    this.products = this.nonSortedProducts;
    this.updateLastSortKeywordVariable('none');
  }

  private setForEachProductTotalPrice(array: Product[]): void {
    array.forEach((item) => {
      item.totalPrice = item.price.toString();
    });
  }

  /* ******** PRODUCT UPDATING ********* */

  private updateStockPropertyOfEachOrderedProduct(order: ProductOrder) {
    const orderArr = order.order;
    for (let i = 0; i < orderArr.length; i += 2) {
      const productId = orderArr[i];
      const orderedAmount = orderArr[i + 1];
      this.updateProductStockInGivenArrayIfPossible(this.products, productId, orderedAmount);
    }
  }

  private updateProductStockInGivenArrayIfPossible(
    array: Product[],
    productId: string,
    orderedAmount: string,
  ) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].id === Number(productId)) {
        const orderedAmountAsNumber = Number(orderedAmount);
        array[i].stock -= orderedAmountAsNumber;
        break;
      }
    }
  }

  /* ******** OTHER ********* */

  private returnAllProducts(): Product[] {
    return this.nonFilteredNorSortedProducts;
  }

  sendProductToCart(productId: number): void {
    const product = this.findAndReturnProductById(productId);
    if (product !== null) {
      const amount = product.price > 0 ? Number(product.totalPrice) / product.price : 0;
      this.sharedService.requestProductAddToCart(product, amount);
    }
  }

  findAndReturnProductById(productId: number): Product {
    for (let i = 0; i < this.nonFilteredNorSortedProducts.length; i += 1) {
      if (this.nonFilteredNorSortedProducts[i].id === productId) {
        return this.nonFilteredNorSortedProducts[i];
      }
    }
    return null;
  }

  filterProductsByQuery(query: string): void {
    this.lastFilterQuery = query;
    this.productService.getFilteredProducts(query).subscribe((res) => {
      this.products = res;
      this.nonSortedProducts = res;
      this.sortProductsIfLastSortKeywordIsNotNone();
    });
  }

  overrideProductPrice(productPriceUpdate: ProductPriceUpdate): void {
    this.overrideProductPriceInArray(this.products, productPriceUpdate);
    this.overrideProductPriceInArray(this.nonSortedProducts, productPriceUpdate);
  }

  overrideProductPriceInArray(array: Product[], productPriceUpdate: ProductPriceUpdate): void {
    array.forEach((elem) => {
      if (elem.id === productPriceUpdate.id) {
        elem.price = productPriceUpdate.price;
        elem.previousPrice = productPriceUpdate.previousPrice;
        elem.percentagePriceDiff = productPriceUpdate.percentagePriceDiff;
        elem.priceStatus = productPriceUpdate.priceStatus;
      }
    });
  }

  removeProduct(id: number) {
    this.removeProductFromArray(this.products, id);
    this.removeProductFromArray(this.nonSortedProducts, id);
    this.removeProductFromArray(this.nonFilteredNorSortedProducts, id);
  }

  addProductAndRearrangeData(product: Product) {
    this.products.push(product);
    this.nonSortedProducts.push(product);
    this.nonFilteredNorSortedProducts.push(product);
    if (this.lastFilterQuery !== '') {
      this.filterProductsByQuery(this.lastFilterQuery);
    } else {
      this.sortProductsIfLastSortKeywordIsNotNone();
    }
  }

  removeProductFromArray(array: Product[], id: number): void {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].id === id) {
        array.splice(i, 1);
      }
    }
  }
}
