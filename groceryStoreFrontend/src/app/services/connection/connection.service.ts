import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/components/handlers/errorHandler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient, private errorHandler: ErrorHandler) {}

  pingApi() : Observable<unknown> {
    return this.http
      .get(`${environment.apiUrl}/online`, { observe: 'response' })
      .pipe(catchError(this.errorHandler.handleError<unknown>('pingApi')));
  }
}
