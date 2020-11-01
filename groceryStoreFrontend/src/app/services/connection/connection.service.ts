import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusResponse } from 'src/app/models/statusResponse.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient) {}

  pingApi() : Observable<StatusResponse> {
    return this.http
      .get(`${environment.apiUrl}/online`, { observe: 'response' });
  }
}
