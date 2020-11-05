import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.productNameInput = '';
    this.getCategories();
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
}
