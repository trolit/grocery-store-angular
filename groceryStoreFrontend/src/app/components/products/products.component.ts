/* eslint-disable no-param-reassign */
import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Product } from 'src/app/models/product/product.model';
import { ProductPrice } from 'src/app/models/product/productPrice.model';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  nonSortedProducts: Product[];
  products: Product[];
  lastSortKeyword = 'none';
  private cols: number;
  private totalPrice: number;
  wereProductsLoaded = false;
  @Input() areProductsVisible: boolean;

  constructor(private productService: ProductService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getProducts();
    this.defineColsNumber(window.innerWidth);
    this.bindMethodsForSharedService();
  }

  onScreenResize(event: UIEvent): void {
    const currentWidth = (event.target as Window).innerWidth;
    this.defineColsNumber(currentWidth);
  }

  private bindMethodsForSharedService(): void {
    this.sharedService.onProductsFilteringRequest(this.filterProductsByQuery.bind(this));
    this.sharedService.onSortByCategoryRequest(this.sortProductsByCategory.bind(this));
    this.sharedService.onSortByPriceRequest(this.sortProductsByPriceAsc.bind(this));
    this.sharedService.onSortByStockRequest(this.sortProductsByStockDesc.bind(this));
    this.sharedService.onSortClear(this.clearSort.bind(this));
    this.sharedService.onProductPriceOverrideRequest(this.overrideProductPrice.bind(this));
  }

  private getProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.nonSortedProducts = res;
      this.wereProductsLoaded = true;
    });
  }

  private sortProductsIfLastSortKeywordIsNotNone(): void {
    switch (this.lastSortKeyword) {
      case 'stock':
        this.sortProductsByStockDesc();
        break;
      case 'price':
        this.sortProductsByPriceAsc();
        break;
      case 'category':
        this.sortProductsByCategory();
        break;
      default:
        break;
    }
  }

  private sortProductsByCategory(): void {
    this.products = [...this.products].sort((a, b) => a.category.localeCompare(b.category));
    this.updateLastSortKeywordVariable('category');
  }

  private sortProductsByPriceAsc(): void {
    this.products = [...this.products].sort((a, b) => a.price - b.price);
    this.updateLastSortKeywordVariable('price');
  }

  private sortProductsByStockDesc(): void {
    this.products = [...this.products].sort((a, b) => b.stock - a.stock);
    this.updateLastSortKeywordVariable('stock');
  }

  private updateLastSortKeywordVariable(sortKeyword: string): void {
    this.lastSortKeyword = sortKeyword;
  }

  private clearSort(): void {
    this.products = this.nonSortedProducts;
    this.updateLastSortKeywordVariable('none');
  }

  private defineColsNumber(currentWidth: number): void {
    if (currentWidth <= 1030) {
      this.cols = 1;
    } else if (currentWidth > 1030 && currentWidth < 1400) {
      this.cols = 2;
    } else if (currentWidth >= 1400 && currentWidth < 1800) {
      this.cols = 3;
    } else if (currentWidth >= 1800) {
      this.cols = 4;
    } else {
      this.cols = 5;
    }
  }

  onSliderInputChange(event: MatSliderChange, product: Product): void {
    this.totalPrice = product.price * event.value;
    product.totalPrice = this.totalPrice.toFixed(2);
  }

  filterProductsByQuery(query: string): void {
    this.productService.getFilteredProducts(query).subscribe((res) => {
      this.products = res;
      this.nonSortedProducts = res;
      this.sortProductsIfLastSortKeywordIsNotNone();
    });
  }

  overrideProductPrice(productPrice: ProductPrice): void {
    this.overrideProductPriceInArray(this.products, productPrice);
    this.overrideProductPriceInArray(this.nonSortedProducts, productPrice);
  }

  overrideProductPriceInArray(array: Product[], productPrice: ProductPrice): void {
    array.forEach((elem) => {
      if (elem.id === productPrice.id) {
        elem.price = productPrice.price;
        elem.previousPrice = productPrice.previousPrice;
        elem.percentagePriceDiff = productPrice.percentagePriceDiff;
        elem.priceStatus = productPrice.priceStatus;
      }
    });
  }
}
