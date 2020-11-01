import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { SnackBarHandler } from './snackbarHandler';

@Injectable({
    providedIn: 'root',
  })
  export class ErrorHandler {
    constructor(private connectionService: ConnectionService, private snackBarHandler: SnackBarHandler) { }
    isCheckingApi = false;
    isConnectionLost = false;

    handleError<T>(operation = 'operation', result?: T) {
      return (error: Error): Observable<T> => {
        this.isApiOnline();
        console.log(`${operation} failed: ${error.message}`);
        return of(result);
      };
    }

    isApiOnline() : boolean {
      if(!this.isCheckingApi) {
        this.isCheckingApi = true;
        this.connectionService.pingApi().subscribe(res => {
          console.log(res.status);
          this.isCheckingApi = false;
        },
        () => {
          this.isConnectionLost = true;
          this.snackBarHandler.openSnackBar();
          // TO:DO toggle snackbar       
          this.isCheckingApi = false;
          // TO:DO queue isApiOnline interval(every 5 seconds)
        });
      }
      return true;
    }
}