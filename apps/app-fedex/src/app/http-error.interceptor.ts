import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert('No network.');
          console.error('An error occurred. Error ', err.error.message);
        } else {
          alert('Server unavailable.');
          console.error(`Backend code ${err.status}`);
          console.log(err);
        }

        return EMPTY;
      })
    );
  }
}
