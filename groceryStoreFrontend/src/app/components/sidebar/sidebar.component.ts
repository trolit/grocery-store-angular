import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { first } from 'rxjs/operators';
import { DialogHandler } from 'src/app/handlers/dialogHandler';
import { Category } from 'src/app/models/category/category.model';
import { ProductMeasurement } from 'src/app/models/product/productMeasurement.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  productNameInput = '';
  selectedCategoryId = 0;
  selectedMeasurement = '0';
  categories: Category[];
  productMeasurements: ProductMeasurement[];
  isAvailable = false;
  isOnDiscount = false;
  isTyping = false;
  isTypingTimerInvoked = false;
  productNameInputOnKeyUp = '';
  filteringQuery: string;
  shoppingCartCurrentSize = 0;
  query = '';
  queryPartsNames = [
    'isAvailable',
    'isOnDiscount',
    'productNameInput',
    'selectedCategoryId',
    'selectedMeasurement',
  ];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private sharedService: SharedService,
    private dialogHandler: DialogHandler,
  ) {}

  ngOnInit(): void {
    this.defaultValues();
    this.getCategories();
    this.getMeasurements();
    this.shoppingCartCurrentSize = Number(sessionStorage.getItem('shoppingCartCounterVal'));
    this.sharedService.onIncreaseShoppingCartCurrentSizeValueRequest(
      this.increaseShoppingCartCurrentSizeValue.bind(this),
    );
    this.sharedService.onShoppingCartCurrentSizeValueResetRequest(
      this.resetShoppingCartCurrentSizeValue.bind(this),
    );
    this.sharedService.onDecreaseShoppingCartCurrentSizeValueRequest(
      this.decreaseShoppingCartCurrentSizeValue.bind(this),
    );
    timer(500)
      .pipe(first())
      .subscribe(() => {
        this.dialogHandler.initShoppingCartDialog();
      });
  }

  onInputChange(inputValue: string): void {
    this.productNameInput = inputValue;
    if (this.productNameInput !== '') {
      this.isTyping = true;
    }
  }

  increaseShoppingCartCurrentSizeValue() {
    this.shoppingCartCurrentSize += 1;
  }

  decreaseShoppingCartCurrentSizeValue() {
    this.shoppingCartCurrentSize -= 1;
  }

  resetShoppingCartCurrentSizeValue() {
    this.shoppingCartCurrentSize = 0;
  }

  onProductNameInputKeyUp(): void {
    if (this.isTypingTimerInvoked === false) {
      this.isTypingTimerInvoked = true;
      timer(2200)
        .pipe(first())
        .subscribe(() => {
          if (this.productNameInputOnKeyUp === this.productNameInput) {
            this.isTyping = false;
            this.buildQuery();
          }
          this.isTypingTimerInvoked = false;
        });
    }
    this.productNameInputOnKeyUp = this.productNameInput;
  }

  defaultValues(): void {
    this.productNameInput = '';
    this.isAvailable = false;
    this.isOnDiscount = false;
  }

  clearInput(id: string): void {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.value = '';
    this.onInputChange(inputElement.value);
    this.buildQuery();
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

  assignValueOnCheckboxInteraction(value: string): void {
    if (value === 'isAvailable') {
      this.isAvailable = !this.isAvailable;
    } else if (value === 'isOnDiscount') {
      this.isOnDiscount = !this.isOnDiscount;
    }
    this.buildQuery();
  }

  assignCategoryIdOnSelectionChange(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.buildQuery();
  }

  assignMeasurementOnSelectionChange(measurement: string): void {
    this.selectedMeasurement = measurement;
    this.buildQuery();
  }

  buildQuery(): void {
    this.query = '';
    for (let i = 0; i < this.queryPartsNames.length; i += 1) {
      if (this.queryPartsNames[i].startsWith('is')) {
        this.addBooleanTypeFilter(this.queryPartsNames[i]);
      } else {
        this.addStringTypeFilter(this.queryPartsNames[i]);
      }
    }
    this.requestProductsFiltering();
  }

  addBooleanTypeFilter(propertyName: string): void {
    if (propertyName === this.queryPartsNames[0] && this.isAvailable) {
      this.addFilterToQuery('stock', '>', '0');
    } else if (propertyName === this.queryPartsNames[1] && this.isOnDiscount) {
      this.addFilterToQuery('priceStatus', ':', 'discount');
    }
  }

  addStringTypeFilter(propertyName: string): void {
    if (propertyName === this.queryPartsNames[2] && this.productNameInput.length > 0) {
      this.addFilterToQuery('name', ':', this.productNameInput);
    } else if (propertyName === this.queryPartsNames[3] && this.selectedCategoryId > 0) {
      this.addFilterToQuery('categoryId', ':', this.selectedCategoryId.toString());
    } else if (propertyName === this.queryPartsNames[4] && this.selectedMeasurement !== '0') {
      this.addFilterToQuery('measurement', ':', this.selectedMeasurement);
    }
  }

  addFilterToQuery(key: string, operation: string, value: string): void {
    this.query += `${key}${operation}${value},`;
  }

  requestProductsFiltering(): void {
    this.sharedService.requestProductsFiltering(this.query);
  }

  onSortSelectionPick(property: string): void {
    this.sharedService.requestProductsSorting(property);
  }

  toggleProductPriceChangeDialog(): void {
    this.dialogHandler.toggleProductPriceChangeDialog();
  }

  toggleProductCreateDialog(): void {
    this.dialogHandler.toggleProductCreateDialog();
  }

  toggleProductDeleteDialog(): void {
    this.dialogHandler.toggleProductDeleteDialog();
  }

  toggleShoppingCartDialog(): void {
    this.dialogHandler.toggleShoppingCartDialog();
  }
}
