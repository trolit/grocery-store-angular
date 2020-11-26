import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorHandler } from 'src/app/handlers/errorHandler';
import { SnackBarHandler } from 'src/app/handlers/snackbarHandler';
import { Category } from 'src/app/models/category/category.model';
import { ProductCreate } from 'src/app/models/product/productCreate.model';
import { ProductMeasurement } from 'src/app/models/product/productMeasurement.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared.service';
import { BaseDialog } from '../base-dialog';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['../base-dialog-styles.scss'],
})
export class CreateProductComponent extends BaseDialog<CreateProductComponent> implements OnInit {
  categories: Category[];
  productMeasurements: ProductMeasurement[];
  selectedCategoryId = 0;
  selectedMeasurement = '';

  constructor(
    protected dialogRef: MatDialogRef<CreateProductComponent>,
    public sharedService: SharedService,
    protected productService: ProductService,
    protected snackbarHandler: SnackBarHandler,
    protected categoryService: CategoryService,
    protected errorHandler: ErrorHandler,
  ) {
    super(dialogRef, sharedService);
  }

  ngOnInit(): void {
    this.getCategories();
    this.getMeasurements();
  }

  private requestProductCreate(product: ProductCreate): void {
    this.productService.createProduct(product).subscribe(
      (productId) => {
        this.snackbarHandler.openSnackBarWithMessage(`Product #${productId} created :)`);
        this.productService.getProduct(productId).subscribe((productFromDb) => {
          this.sharedService.requestProductAdd(productFromDb);
        });
      },
      () => {
        this.snackbarHandler.openSnackBarWithMessage(
          `Error occured, product not created :(`,
          'custom-snackbar-2',
        );
        this.errorHandler.isApiOnline();
      },
    );
  }

  assignCategoryIdOnSelectionChange(categoryId: number): void {
    this.selectedCategoryId = categoryId;
  }

  assignMeasurementOnSelectionChange(measurement: string): void {
    this.selectedMeasurement = measurement;
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

  wrapDataAndRequestProductCreate(): void {
    const productName = document.getElementById('productName') as HTMLInputElement;
    const productPrice = document.getElementById('productPrice') as HTMLInputElement;
    const productStock = document.getElementById('productStock') as HTMLInputElement;
    const product: ProductCreate = {
      name: productName.value.trim(),
      price: Number(productPrice.value) < 0 ? 0 : Number(productPrice.value),
      stock: Number(productStock.value) < 0 ? 0 : Number(productStock.value),
      categoryId: this.selectedCategoryId,
      measurement: this.selectedMeasurement,
    };
    this.requestProductCreate(product);
  }
}
