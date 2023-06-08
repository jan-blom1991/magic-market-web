import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, EMPTY, Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ProgressBarService} from "../services/progress-bar.service";
import {Injectable} from "@angular/core";
import {MessageService} from "../services/message.service";
import {Router} from "@angular/router";
import {Path} from "../shared/models/path";
import {ResponseData} from "../shared/models/response-data";
import {ResponseSeverity} from "../shared/models/response-severity";

@Injectable()
export class GlobalRequestInterceptor implements HttpInterceptor {

  constructor(private progressBarService: ProgressBarService,
              private messageService: MessageService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.activate();
    return next.handle(request).pipe(
      tap({
        next: (response) => {
          if (response instanceof HttpResponse<any> && response.body) {
            const severity = response.body.severity;
            this.progressBarService.terminate(severity ? ResponseSeverity[severity] : 'error');
            this.messageService.updateMessage(response.body);
        }}
      }),
      catchError((response: HttpErrorResponse) => {
        this.progressBarService.terminate('error');

        /** Front-end client error */
        if (response.error instanceof ErrorEvent) {
          const message = `Error: ${response.error.message}`;
          return throwError(() => new Error(message));
        }

        /** Back-end service error */
        try {
          const error = response.error as ResponseData;
          const queryParams = {code: error.statusCode.toString(), phrase: error.statusPhrase, message: error.message}
          this.router.navigate([Path.ERROR], {queryParams: queryParams});
        } catch (error) {
          const message = `Error: ${response.message}`;
          return throwError(() => new Error(message));
        }

        return EMPTY;
      })
    );
  }
}
