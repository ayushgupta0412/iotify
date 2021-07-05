import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

/**
 * Http config class works as middelware for http requests through Interceptor.
 *
 * @export
 * @class HttpConfigInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
	apiUrl: string = '';
	constructor(private toastr: ToastrService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');

		const httpRequest = new HttpRequest(<any>request.method, this.apiUrl + request.url, request.body);
		request = Object.assign(request, httpRequest);

		let reqUrl = request.url.split('/');
		// split url to check for the assets call for dummy db
		if (Object.values(reqUrl).indexOf('assets') > -1) {
			const httpRequest = new HttpRequest(<any>request.method, request.url, request.body);
			request = Object.assign(request, httpRequest);
		} else {
			const httpRequest = new HttpRequest(<any>request.method, this.apiUrl + request.url, request.body);
			request = Object.assign(request, httpRequest);

			//Authentication by setting header with token value
			if (token) {
				request = request.clone({
					setHeaders: {
						'Authorization': 'bearer ' + token
					}
				});
			}
			if (!request.headers.has('Content-Type')) {
				request = request.clone({
					setHeaders: {
						'content-type': 'application/json'
					}
				});
			}
		}

		/* request = request.clone({
			headers: request.headers.set('Accept', 'application/json')
		}); */

		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				this.toastr.clear();
				if (error.status == 0) {
				} else {
					this.toastr.error('Something went wrong!', 'Error', { progressBar: true });
				}
				return throwError(error);
			}));
	}
}
