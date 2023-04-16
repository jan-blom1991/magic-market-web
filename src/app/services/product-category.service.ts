import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseUrl = 'http://localhost:8080/product-categories';

  constructor(private http: HttpClient) {}

  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

}
