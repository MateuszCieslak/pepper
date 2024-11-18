import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this.errorHandler(error)));
  }

  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {

    let errorMessage = '';
    switch (response.status) {
      // TODO: Add custom error messages
      // case 400:
      //   break;
      // case 403:
      //   break;
      // case 404:
      //   break;
      default:
        errorMessage += 'Something went wrong';
    }

    this.snackBar.open(errorMessage, "Close", { duration: 5000 });

    throw response;
  }
}
