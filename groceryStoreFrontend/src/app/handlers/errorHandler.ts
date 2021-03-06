/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { OfflineSnackbarComponent } from '../components/custom-snackbars/offline-snackbar/offline-snackbar.component';
import { CommonMethodsHandler } from './commonMethodsHandler';
import { SnackBarHandler } from './snackbarHandler';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandler {
  isCheckingApi = false;
  isConnectionLost = false;

  constructor(
    private connectionService: ConnectionService,
    private snackBarHandler: SnackBarHandler,
    private commonMethodsHandler: CommonMethodsHandler,
  ) {}

  handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      this.isApiOnline();
      console.error(`${operation} failed: ${error.message} |> Make sure that server is online.`);
      return of(result);
    };
  }

  isApiOnline(): void {
    if (!this.isCheckingApi) {
      this.isCheckingApi = true;
      this.connectionService.pingApi().subscribe(
        () => {
          this.isCheckingApi = false;
        },
        () => {
          this.commonMethodsHandler.displayOfflineServerLayer();
          this.isConnectionLost = true;
          const snackbarRef = this.snackBarHandler.createSnackbarFromComponent(
            OfflineSnackbarComponent,
          );
          snackbarRef.afterDismissed().subscribe(() => {
            this.isCheckingApi = false;
          });
        },
      );
    }
  }
}
