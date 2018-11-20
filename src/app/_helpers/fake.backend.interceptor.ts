import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Page } from '../page-detail/page';

import {QH_CULTURSL} from './qh-cultural';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith('/pages') && request.method === 'GET') {
                const body: Page[] = QH_CULTURSL;

                return of(new HttpResponse({ status: 200, body: body }));
            }
            // pass through any requests not handled above
            return next.handle(request);
        }))
            /** call materialize and dematerialize to ensure delay even if an error is thrown
            (https://github.com/Reactive-Extensions/RxJS/issues/648) */
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
