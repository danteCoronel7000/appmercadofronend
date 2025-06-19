import { inject } from "@angular/core";
import { LoaderService } from "./loader.service";
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { debounce, debounceTime, finalize, Subject, switchMap, tap } from "rxjs";


export function loaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn){
    const loaderService = inject(LoaderService);
    
    //option 1: whitout dobounce
    
    loaderService.show();
    return next(req).pipe(finalize(() => loaderService.hide()));

/*OPTION 2: with bobounce*/
//espera 300 milisegundos antes de mostrar el loader esto ayuda a la experiencia UX
/*
    const loaderSubject = new Subject<boolean>();
    return next(req).pipe(
        switchMap(() => next(req)),
        debounceTime(300),
        tap(() => loaderService.show()),
        finalize(() => {
            loaderService.hide();
            loaderSubject.complete();
        })
    )
        */
}