import { computed, Injectable, signal } from '@angular/core';
import { PageableResponse } from '../../../../shared/models/shared.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario, UsuarioDTOForWeb, UsuarioPayload } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'http://localhost:8080/api/usuarios';
private url_publica: string = 'http://localhost:8080/api/usuarios/get';

#idUsuario = signal<number>(0);
idUsuario = computed(() => this.#idUsuario());

#idPersona = signal<number>(0);
idPersona = computed(() => this.#idPersona());

#nameUsuario = signal<string>('');
nameUsuario = computed(() => this.#nameUsuario());

constructor(private httpClient: HttpClient) { }

public setIdUsuario(value: number): void {
  this.#idUsuario.set(value);
}

public setIdPersona(value: number): void{
  this.#idPersona.set(value);
}

public setNameUsuario(value: string): void {
  this.#nameUsuario.set(value);
}

// Método para crear usuario
createUsuario(formData: FormData): Observable<UsuarioDTOForWeb> {
  return this.httpClient.post<UsuarioDTOForWeb>(`${this.url}/save/return/dto`, formData);
}

getUsuarios(): Observable<UsuarioDTOForWeb[]> {
  return this.httpClient.get<UsuarioDTOForWeb[]>(`${this.url_publica}/all`);
}

updateUsuario(formData: FormData): Observable<Usuario> {
  return this.httpClient.put<Usuario>(`${this.url}/update`, formData);
}

getUsuarioById(id: number): Observable<Usuario> {
  return this.httpClient.get<Usuario>(`${this.url_publica}/${id}`);
}

deleteUsuario(id: number): Observable<Usuario> {
  return this.httpClient.delete<Usuario>(`${this.url}/${id}`);
}

buscarUsuario(nombre: string): Observable<UsuarioDTOForWeb[]> {
  const params = new HttpParams().set('nombre', nombre);
  return this.httpClient.get<UsuarioDTOForWeb[]>(`${this.url_publica}/buscar`, { params });
}

 crearUsuario(usuario: UsuarioPayload): Observable<Usuario> {
    return this.httpClient.post<any>(`${this.url}/add/user`, usuario);
  }

// Método para obtener usuarios paginados
getUsuariosPaginados(
  page: number = 0,
  size: number = 5,
  sortBy: string = 'nombre',
  sortDir: string = 'asc'
): Observable<PageableResponse<UsuarioDTOForWeb>> {
  
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortBy', sortBy)
    .set('sortDir', sortDir);

  return this.httpClient.get<PageableResponse<UsuarioDTOForWeb>>(`${this.url_publica}/paginado/usuarios`, { params });
}

// Método para buscar usuarios por nombre con paginación
buscarUsuariosPorNombre(
  nombre: string,
  page: number = 0,
  size: number = 10,
  sortBy: string = 'nombre',
  sortDir: string = 'asc'
): Observable<PageableResponse<Usuario>> {
  
  let params = new HttpParams()
    .set('nombre', nombre)
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortBy', sortBy)
    .set('sortDir', sortDir);

  return this.httpClient.get<PageableResponse<Usuario>>(`${this.url_publica}/buscar`, { params });
}

}
