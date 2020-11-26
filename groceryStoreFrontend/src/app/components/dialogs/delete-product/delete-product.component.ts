import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorHandler } from 'src/app/handlers/errorHandler';
import { SnackBarHandler } from 'src/app/handlers/snackbarHandler';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared.service';
import { BaseDialog } from '../base-dialog';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['../base-dialog-styles.scss'],
})
export class DeleteProductComponent extends BaseDialog<DeleteProductComponent> {
  productId = 0;

  constructor(
    protected dialogRef: MatDialogRef<DeleteProductComponent>,
    protected sharedService: SharedService,
    private productService: ProductService,
    private snackbarHandler: SnackBarHandler,
    private errorHandler: ErrorHandler,
  ) {
    super(dialogRef, sharedService);
  }

  storeIdonProductSelect(id: number): void {
    this.productId = id;
  }

  requestProductDelete(): void {
    if (this.productId > 0 === false) {
      this.invokeErrorSnackbar();
      return;
    }
    this.productService.deleteProduct(this.productId).subscribe(
      (res) => {
        this.snackbarHandler.openSnackBarWithMessage(
          `${res.status} | product #${this.productId} has been removed :)`,
        );
        this.sharedService.requestProductRemoval(this.productId);
      },
      () => {
        this.invokeErrorSnackbar();
        this.errorHandler.isApiOnline();
      },
    );
  }

  invokeErrorSnackbar(): void {
    this.snackbarHandler.openSnackBarWithMessage(
      `Couldn't remove product #${this.productId}`,
      'custom-snackbar-2',
    );
  }
}
