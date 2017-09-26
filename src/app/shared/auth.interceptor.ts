import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log('Intercepted!', req);
    // const copiedReq = req.clone({headers: req.headers.append('','')});
    // const copiedReq = req.clone({headers: req.headers.set('','')});
    // if(req.method === 'GET' && req.params.get('startApp') === 'true'){
    //   return next.handle(req);
    // }
    const token = this.authService.getToken();
    const copiedReq = req.clone({params: req.params.set('auth', token)});
    return next.handle(copiedReq);
  }
}
