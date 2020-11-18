import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeProductPriceComponent } from '../components/dialogs/change-product-price/change-product-price.component';
import { CreateProductComponent } from '../components/dialogs/create-product/create-product.component';
import { DeleteProductComponent } from '../components/dialogs/delete-product/delete-product.component';
import { ShoppingCartComponent } from '../components/dialogs/shopping-cart/shopping-cart.component';

@Injectable({
  providedIn: 'root',
})
export class DialogHandler {
  basicWidth = '450px';

  constructor(public dialog: MatDialog) {}

  toggleProductPriceChangeDialog(): void {
    this.dialog.open(ChangeProductPriceComponent, {
      width: this.basicWidth,
    });
  }

  toggleProductCreateDialog(): void {
    this.dialog.open(CreateProductComponent, {
      width: this.basicWidth,
    });
  }

  toggleProductDeleteDialog(): void {
    this.dialog.open(DeleteProductComponent, {
      width: this.basicWidth,
    });
  }

  toggleShoppingCartDialog(): void {
    this.dialog.open(ShoppingCartComponent, {
      width: '500px',
      autoFocus: false,
    });
  }

  initShoppingCartDialog(): void {
    this.dialog
      .open(ShoppingCartComponent, {
        width: this.basicWidth,
        backdropClass: 'transparent-backdrop',
      })
      .close();
  }
}
