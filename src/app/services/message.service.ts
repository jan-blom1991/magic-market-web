import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MessageData} from '../shared/models/message-data';
import {ResponseData} from '../shared/models/response-data';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<MessageData>(undefined);

  updateMessage(responseData: ResponseData): void {
    this.messageSubject.next({
      severity: responseData.severity,
      message: responseData.message
    });
  }

  getMessageData(): Observable<MessageData> {
    return this.messageSubject.asObservable();
  }
}
