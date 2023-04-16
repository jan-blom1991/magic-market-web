import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MessageData} from '../domain/message-data';
import {ResponseData} from '../domain/response-data';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<MessageData>(undefined);

  updateMessage(responseData: ResponseData): void {
    this.messageSubject.next({
      statusCode: responseData.statusCode,
      statusPhrase: responseData.statusPhrase,
      severity: responseData.severity,
      message: responseData.message,
      errors: responseData.errors
    });
  }

  getMessageData(): Observable<MessageData> {
    return this.messageSubject.asObservable();
  }
}
