import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import {ResponseData} from '../domain/response-data';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl = 'http://localhost:8080';

  constructor(protected httpClient: HttpClient) {}

  get(serviceUrl: string, id: string): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${serviceUrl}/${id}`);
  }

  search(serviceUrl: string, sort: string, order: SortDirection, page: number, size: number): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${serviceUrl}?sort=${sort}&order=${order}&page=${page}&size=${size}`);
  }

  add(serviceUrl: string, body: object): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(`${serviceUrl}`, body);
  }

  update(serviceUrl: string, body: object): Observable<ResponseData> {
    return this.httpClient.put<ResponseData>(`${serviceUrl}`, body);
  }

  delete(serviceUrl: string, id: number): Observable<ResponseData> {
    return this.httpClient.delete<ResponseData>(`${serviceUrl}/${id}`);
  }
}
