import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardTypeService {

  private baseUrl = 'http://localhost:8080/card-types';

  constructor(private http: HttpClient) {}

  getCardTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

}
