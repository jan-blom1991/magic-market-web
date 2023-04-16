import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardColorService {

  private baseUrl = 'http://localhost:8080/card-colors';

  constructor(private http: HttpClient) {}

  getCardColors(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

}
