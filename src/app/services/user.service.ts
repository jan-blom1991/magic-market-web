import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../shared/models/user';
import {ResponseData} from '../shared/models/response-data';
import {BaseService} from './base-service.service';
import {ProgressBarService} from "./progress-bar.service";


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  protected serviceUrl = this.baseUrl + '/users';

  constructor(httpClient: HttpClient, progressBarService: ProgressBarService) {
    super(httpClient, progressBarService);
  }

  getUser(emailAddress: string, password: string): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.serviceUrl}/${emailAddress}/?password=${password}`);
  }

  addUser(user: User): Observable<number> {
    return this.httpClient.post<number>(this.baseUrl, user, {responseType: 'json'});
  }
}
