import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import {ResponseData} from '../shared/models/response-data';
import {ProgressBarService} from "./progress-bar.service";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl = 'http://localhost:8080';

  constructor(protected httpClient: HttpClient,
              private progressBarService: ProgressBarService) {}

  get(serviceUrl: string, id: string): Observable<ResponseData> {
    this.progressBarService.activate();
    return this.httpClient.get<ResponseData>(`${serviceUrl}/${id}`);
  }

  search(serviceUrl: string, sort: string, order: SortDirection, page: number, size: number): Observable<ResponseData> {
    this.progressBarService.activate();
    return this.httpClient.get<ResponseData>(`${serviceUrl}?sort=${sort}&order=${order}&page=${page}&size=${size}`);
  }

  add(serviceUrl: string, body: object): Observable<ResponseData> {
    this.progressBarService.activate();
    return this.httpClient.post<ResponseData>(`${serviceUrl}`, body);
  }

  update(serviceUrl: string, body: object): Observable<ResponseData> {
    this.progressBarService.activate();
    return this.httpClient.put<ResponseData>(`${serviceUrl}`, body);
  }

  delete(serviceUrl: string, id: number): Observable<ResponseData> {
    this.progressBarService.activate();
    return this.httpClient.delete<ResponseData>(`${serviceUrl}/${id}`);
  }
}
