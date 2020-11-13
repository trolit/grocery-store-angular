import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeProductPriceComponent } from '../components/dialogs/change-product-price/change-product-price.component';

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
}
