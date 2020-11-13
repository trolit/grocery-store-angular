import { OnInit, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarHandler } from 'src/app/handlers/snackbarHandler';
import { Product } from 'src/app/models/product/product.model';
import { ProductPercentage } from 'src/app/models/product/productPercentage.model';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared.service';
import { BaseDialog } from '../base-dialog';

@Component({
  selector: 'app-change-product-price',
  templateUrl: './change-product-price.component.html',
  styleUrls: ['../base-dialog-styles.scss'],
})
export class ChangeProductPriceComponent
  extends BaseDialog<ChangeProductPriceComponent>
  implements OnInit {
  productServiceRef: ProductService;
  snackbarHandlerRef: SnackBarHandler;
  sharedServiceRef: SharedService;
  products: Product[];
  productIdInput: HTMLInputElement;

  constructor(
    public dialogRef: MatDialogRef<ChangeProductPriceComponent>,
    productService: ProductService,
    snackbarHander: SnackBarHandler,
    sharedService: SharedService,
  ) {
    super(dialogRef);
    this.productServiceRef = productService;
    this.snackbarHandlerRef = snackbarHander;
    this.sharedServiceRef = sharedService;
  }

  ngOnInit() {
    this.productIdInput = document.getElementById('productId') as HTMLInputElement;
    this.products = this.sharedServiceRef.requestProducts();
  }

  requestPriceChange(id: number, productPercentage: ProductPercentage): void {
    this.productServiceRef.changeProductPriceByPercentage(id, productPercentage).subscribe(
      (res) => {
        this.snackbarHandlerRef.openSnackBarWithMessage(
          `Product #${id} price ${
            productPercentage.percentage > 100
              ? `increased by ${productPercentage.percentage - 100}%`
              : `decreased by ${100 - productPercentage.percentage}%`
          }`,
        );
        this.sharedServiceRef.requestProductPriceOverride(res);
      },
      () => {
        this.snackbarHandlerRef.openSnackBarWithMessage(
          `Error occured while changing product #${id} price :(`,
        );
      },
    );
  }

  wrapDataAndRequestPriceChange(): void {
    const percentageInput = document.getElementById('percentage') as HTMLInputElement;
    const percentageInputValue = Number(percentageInput.value);
    if (percentageInputValue < 0) {
      return;
    }
    const productDto: ProductPercentage = {
      percentage: percentageInputValue,
    };
    this.requestPriceChange(Number(this.productIdInput.value), productDto);
  }

  onProductSelectSupplyProductIdInput(id: number): void {
    this.productIdInput.value = id.toString();
  }
}
