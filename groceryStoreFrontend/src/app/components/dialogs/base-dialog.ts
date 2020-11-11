import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class BaseDialog<T> {
  constructor(public dialogRef: MatDialogRef<T>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
