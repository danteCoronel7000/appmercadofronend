import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Authentication } from "../../core/services/authentication.service";


export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn){
      // No agregar token si estamos esta lista de endpoints
    const skipAuth = ['/login', '/register', '/public'];

    if (skipAuth.some(url => req.url.includes(url))) {
    return next(req);
        }
        
    const authenticationService = inject(Authentication);
    if(authenticationService.getToken()){
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authenticationService.getToken()}`)

        })
    }
    return next(req)

}