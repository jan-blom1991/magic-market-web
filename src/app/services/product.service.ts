import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {SortDirection} from '@angular/material/sort';
import {BaseService} from './base-service.service';
import {ResponseData} from '../shared/models/response-data';
import {ProgressBarService} from "./progress-bar.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  private serviceUrl = this.baseUrl + '/products';

  constructor(httpClient: HttpClient, progressBarService: ProgressBarService) {
    super(httpClient, progressBarService);
  }

  getProduct(id: number): Observable<ResponseData> {
    return this.get(this.serviceUrl, id.toString());
  }

  searchProducts(sort: string, order: SortDirection, page: number, size: number): Observable<ResponseData> {
    return this.search(this.serviceUrl, sort, order, page, size);
  }

  addProduct(body: FormGroup): Observable<ResponseData> {
    return this.add(this.serviceUrl, body);
  }

  updateProduct(body: FormGroup): Observable<ResponseData> {
    return this.update(this.serviceUrl, body);
  }

  deleteProduct(id: number): Observable<ResponseData> {
    return this.delete(this.serviceUrl, id);
  }
}
