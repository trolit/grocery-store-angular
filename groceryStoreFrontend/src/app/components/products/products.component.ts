import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  private products: Product[];
  private cols: number;
  private totalPrice: number;

  @Input() areProductsVisible: boolean;

  constructor(private productService: ProductService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getProducts();
    this.defineColsNumber(window.innerWidth);
    this.sharedService.onProductsFilteringRequest(this.filterProductsByQuery.bind(this));
  }

  onScreenResize(event: UIEvent): void {
    const currentWidth = (event.target as Window).innerWidth;
    this.defineColsNumber(currentWidth);
  }

  private getProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
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
    // eslint-disable-next-line no-param-reassign
    product.totalPrice = this.totalPrice.toFixed(2);
  }

  filterProductsByQuery(query: string): void {
    this.productService.getFilteredProducts(query).subscribe((res) => {
      this.products = res;
    });
  }
}
