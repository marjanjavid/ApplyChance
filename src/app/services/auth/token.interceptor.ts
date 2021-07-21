import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url != "https://api.applychance.com/api/auth") {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
        }
        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse && request.url == "https://api.applychance.com/api/auth") {
                        if (event.status === 200) {
                            this.auth.saveToken(event.body)
                        }
                    }
                }));
    }
}