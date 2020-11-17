import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product/product.model';
import { SharedService } from 'src/app/services/shared.service';

@Injectable()
export class BaseDialog<T> {
  public products: Product[];

  constructor(protected dialogRef: MatDialogRef<T>, protected sharedService: SharedService) {
    this.products = this.sharedService.requestAllProducts();
  }

  dismissDialog(): void {
    this.dialogRef.close();
  }
}
