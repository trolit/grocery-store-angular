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
    private commonMethodsHander: CommonMethodsHandler,
  ) {}

  handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      // this.isApiOnline();
      // eslint-disable-next-line no-console
      console.log(`${operation} failed: ${error.message}`);
      return of(result);
    };
  }

  isApiOnline(): boolean {
    if (!this.isCheckingApi) {
      this.isCheckingApi = true;
      this.connectionService.pingApi().subscribe(
        () => {
          this.isCheckingApi = false;
        },
        () => {
          this.commonMethodsHander.displayOfflineServerLayer();
          this.isConnectionLost = true;
          this.snackBarHandler.createSnackbarFromComponent(OfflineSnackbarComponent);
          // this.snackBarHandler.openSnackBar();
          // TO:DO toggle snackbar
          this.isCheckingApi = false;
          // TO:DO queue isApiOnline interval(every 5 seconds)
        },
      );
    }
    return true;
  }
}
