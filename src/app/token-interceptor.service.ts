import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service'; 
import { Injector } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor { 
  // remember to make class implement the interceptor
  // to implement we must make use of the intercept method 

  constructor(private _injector : Injector) { }
  // remember that we cannot inject the auth service in the constructor due to a cyclic dependency error
  // but import the injector package and inject it in regular fashion
  // use the injector to get instance of the AuthService for use inside intercept function

  intercept(req,next){ // next is to follow the next execution step
      let _authService = this._injector.get(AuthService);
      let tokenizedReq = req.clone({
          setHeaders : {                        //network on browser, will see auth header info
            //Authorization : 'Bearer xx.yy.zz'  // Bearer keyword followed by some format here it's xx.yy.zz
            Authorization : `Bearer ${_authService.getToken()}`  
            // backtick (`) is new ES6 syntax to embed value into the hardcoded text
          }
      });
      return next.handle(tokenizedReq); 
  }
}
