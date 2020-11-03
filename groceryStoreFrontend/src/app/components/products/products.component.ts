import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  cols: number;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    this.defineColsNumber(window.innerWidth);
  }

  onScreenResize(event: UIEvent): void {
    const currentWidth = (event.target as Window).innerWidth;
    this.defineColsNumber(currentWidth);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      console.log(this.products);
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
}
