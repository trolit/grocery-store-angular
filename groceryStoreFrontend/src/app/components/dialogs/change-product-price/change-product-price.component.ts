import { OnInit, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarHandler } from 'src/app/handlers/snackbarHandler';
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
  productIdInput: HTMLInputElement;

  constructor(
    protected dialogRef: MatDialogRef<ChangeProductPriceComponent>,
    protected productService: ProductService,
    protected snackbarHandler: SnackBarHandler,
    protected sharedService: SharedService,
  ) {
    super(dialogRef, sharedService);
  }

  ngOnInit() {
    this.productIdInput = document.getElementById('productId') as HTMLInputElement;
  }

  requestPriceChange(id: number, productPercentage: ProductPercentage): void {
    this.productService.changeProductPriceByPercentage(id, productPercentage).subscribe(
      (res) => {
        this.snackbarHandler.openSnackBarWithMessage(
          `Product #${id} price ${
            productPercentage.percentage > 100
              ? `increased by ${productPercentage.percentage - 100}%`
              : `decreased by ${100 - productPercentage.percentage}%`
          }`,
        );
        this.sharedService.requestProductPriceOverride(res);
      },
      () => {
        this.snackbarHandler.openSnackBarWithMessage(
          `Error occured while changing product #${id} price :(`,
          'custom-snackbar-2',
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
