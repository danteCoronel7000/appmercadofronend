import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private LOGIN_URL = 'http://localhost:8080/api/authentication/login';
  private tokenKey = 'authToken';

  private REFRESH_URL = 'http://localhost:8080/api/authentication/refresh';
  private refreshTokenKey = 'refreshToken';

  constructor(private httpClient: HttpClient, private router: Router) {}

login(user: string, password: string): Observable<any> {
  return this.httpClient.post<any>(this.LOGIN_URL, { user, password }).pipe(
    tap(response => {
      if (response.token) {
        console.log(response.token);
        this.setToken(response.token);
        this.setRefreshToken(response.refreshToken);

        // Nuevos: guardar datos del usuario
        this.setNombre(response.nombre);
        this.setApellido(response.apellido);
        this.setImageUrl(response.imageUrl);

        this.autoRefreshToken();
      }
    })
  );
}

private setNombre(nombre: string): void {
  localStorage.setItem('nombre', nombre);
}

private setApellido(apellido: string): void {
  localStorage.setItem('apellido', apellido);
}

private setImageUrl(imageUrl: string): void {
  localStorage.setItem('imageUrl', imageUrl);
}

getNombre(): string | null {
  return localStorage.getItem('nombre');
}

getApellido(): string | null {
  return localStorage.getItem('apellido');
}

getImageUrl(): string | null {
  return localStorage.getItem('imageUrl');
}


  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  } 

  getToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else {
      return null;
    }
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  } 

  private getRefreshToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.refreshTokenKey);
    }else {
      return null;
    }
  }

  refreshToken(): Observable<any>{
    const refreshToken  = this.getRefreshToken()
    return this.httpClient.post<any>(this.REFRESH_URL, {refreshToken}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken)
          this.autoRefreshToken()
        }
      })
    )
  }

  autoRefreshToken(): void {
    const token = this.getToken();
    if(!token){
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    const timeout = exp - Date.now() - (60 * 1000);

    setTimeout(() => {
      this.refreshToken().subscribe()
    }, timeout);
   
  }


  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token){
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem('nombre')
    localStorage.removeItem('apellido')
    localStorage.removeItem('imageUrl')
    this.router.navigate(['/sing-in']);
  }
}
