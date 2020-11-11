import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarHandler } from 'src/app/handlers/snackbarHandler';
import { ProductPrice } from 'src/app/models/product/productPrice.model';
import { ProductService } from 'src/app/services/product/product.service';
import { BaseDialog } from '../base-dialog';

@Component({
  selector: 'app-change-product-price',
  templateUrl: './change-product-price.component.html',
  styleUrls: ['../base-dialog-styles.scss'],
})
export class ChangeProductPriceComponent extends BaseDialog<ChangeProductPriceComponent> {
  productServiceRef: ProductService;
  snackbarHandlerRef: SnackBarHandler;

  constructor(
    public dialogRef: MatDialogRef<ChangeProductPriceComponent>,
    productService: ProductService,
    snackbarHander: SnackBarHandler,
  ) {
    super(dialogRef);
    this.productServiceRef = productService;
    this.snackbarHandlerRef = snackbarHander;
  }

  createNewProduct(id: number, productPercentageOnlyDto: ProductPrice): void {
    this.productServiceRef.changeProductPriceByPercentage(id, productPercentageOnlyDto).subscribe(
      () => {
        this.snackbarHandlerRef.openSnackBarWithMessage(
          `Product #${id} price ${
            productPercentageOnlyDto.percentage > 100
              ? `increased by ${productPercentageOnlyDto.percentage - 100}%`
              : `decreased by ${100 - productPercentageOnlyDto.percentage}%`
          }`,
        );
      },
      () => {
        this.snackbarHandlerRef.openSnackBarWithMessage(
          `Error occured while changing product #${id} price :(`,
        );
      },
    );
  }

  wrapDataAndCreateProduct(): void {
    const productIdInput = document.getElementById('productId') as HTMLInputElement;
    const percentageInput = document.getElementById('percentage') as HTMLInputElement;
    const percentageInputValue = Number(percentageInput.value);
    if (percentageInputValue < 0) {
      return;
    }
    const productDto: ProductPrice = {
      percentage: percentageInputValue,
    };
    this.createNewProduct(Number(productIdInput.value), productDto);
  }
}
