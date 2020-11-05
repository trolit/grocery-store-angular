import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category.model';
import { ProductMeasurement } from 'src/app/models/product/productMeasurement.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  productNameInput: string;
  productCategorySelect: string;
  measurementSelect: string;
  categories: Category[];
  productMeasurements: ProductMeasurement[];

  constructor(private categoryService: CategoryService, private productService: ProductService) {}

  ngOnInit(): void {
    this.productNameInput = '';
    this.getCategories();
    this.getMeasurements();
  }

  onInputChange(inputValue: string): void {
    this.productNameInput = inputValue;
  }

  clearInput(id: string): void {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.value = '';
    this.onInputChange(inputElement.value);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getMeasurements(): void {
    this.productService.getAllMeasurements().subscribe((res) => {
      this.productMeasurements = res;
    });
  }
}
