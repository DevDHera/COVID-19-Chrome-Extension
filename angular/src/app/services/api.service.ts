import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentStats(): Observable<Response> {
    const url = new URL(`${this.baseUrl}/get-current-statistical`);

    return this.http.get<Response>(url.toString());
  }
}
