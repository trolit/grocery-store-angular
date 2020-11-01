import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarHandler {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(): void {
    const snackBarRef = this._snackBar.open('Cannonball!!', 'End now', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['custom-snackbar-1'],
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
    });
  }

  createSnackbarFromComponent<T>(data: ComponentType<T>): void {
    const snackBarRef = this._snackBar.openFromComponent(data, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['custom-snackbar-1'],
    });
    this.createDismissButton(snackBarRef, 'offlineSnackbarCloseBtn');
  }

  createDismissButton<T>(snackbarRef: MatSnackBarRef<T>, id: string): void {
    const btn = document.createElement('button');
    btn.setAttribute('class', 'mat-focus-indicator mat-raised-button mat-button-base mat-basic');
    btn.setAttribute('color', 'basic');
    btn.setAttribute('ng-reflect-color', 'basic');
    btn.textContent = 'Close';
    btn.onclick = function () {
      snackbarRef.dismiss();
    };
    document.getElementById(id).appendChild(btn);
  }
}