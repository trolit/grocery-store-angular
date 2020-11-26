import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CommonMethodsHandler } from './commonMethodsHandler';

@Injectable({
  providedIn: 'root',
})
export class SnackBarHandler {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private commonMethodsHandler: CommonMethodsHandler) {}

  openSnackBarWithMessage(message: string, color = 'custom-snackbar-1'): void {
    const snackBarRef = this.snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [color],
    });
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }

  createSnackbarFromComponent<T>(data: ComponentType<T>): MatSnackBarRef<T> {
    const snackBarRef = this.snackBar.openFromComponent(data, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['custom-snackbar-1'],
    });
    this.attachDismissButtons(snackBarRef, 'offlineSnackbarCloseBtn');
    return snackBarRef;
  }

  attachDismissButtons<T>(snackbarRef: MatSnackBarRef<T>, className: string): void {
    const places = document.getElementsByClassName(className);
    for (let i = 0; i < places.length; i += 1) {
      places[i].appendChild(this.createDismissBtn(snackbarRef));
    }
  }

  private createDismissBtn<T>(snackbarRef: MatSnackBarRef<T>): HTMLButtonElement {
    const commondMethodsHandlerRef = this.commonMethodsHandler;
    const btn = document.createElement('button');
    btn.setAttribute('class', 'mat-focus-indicator mat-raised-button mat-button-base mat-basic');
    btn.setAttribute('color', 'basic');
    btn.setAttribute('ng-reflect-color', 'basic');
    btn.textContent = 'Close';
    btn.onclick = function () {
      snackbarRef.dismiss();
      commondMethodsHandlerRef.hideOfflineServerLayer();
    };
    return btn;
  }
}
