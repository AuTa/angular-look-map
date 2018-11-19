import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith('/pages') && request.method === 'GET') {
                const body = [
                    { uuid: '11', latitude: 110.110, longitude: 11.11, title: 'page-11' },
                    { uuid: '12', latitude: 120.120, longitude: 12.12, title: 'page-12' },
                    { uuid: '13', latitude: 130.130, longitude: 13.13, title: 'page-13' },
                    { uuid: '14', latitude: 140.140, longitude: 14.14, title: 'page-14' },
                    { uuid: '15', latitude: 150.150, longitude: 15.15, title: 'page-15' },
                    { uuid: '16', latitude: 160.160, longitude: 16.16, title: 'page-16' },
                    { uuid: '17', latitude: 170.170, longitude: 17.17, title: 'page-17' },
                    { uuid: '18', latitude: 180.180, longitude: 18.18, title: 'page-18' },
                    { uuid: '19', latitude: 190.190, longitude: 19.19, title: 'page-19' },
                    { uuid: '20', latitude: 200.200, longitude: 20.20, title: 'page-20' },
                ];

                return of(new HttpResponse({status: 200, body: body}));
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
