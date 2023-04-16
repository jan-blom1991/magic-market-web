import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {User} from '../domain/user';
import {ResponseData} from '../domain/response-data';
import {BaseService} from './base-service.service';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  protected serviceUrl = this.baseUrl + '/users';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getUser(emailAddress: string, password: string): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.serviceUrl}/${emailAddress}/?password=${password}`);
  }

  addUser(user: User): Observable<number> {
    return this.httpClient.post<number>(this.baseUrl, user, {responseType: 'json'});
  }
}
