import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, ClienteDTOForWeb } from '../models/cliente.model';
import { PageableResponse } from '../../../shared/models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url: string = 'http://localhost:8080/api/clientes';
  private url_publica: string = 'http://localhost:8080/api/clientes/get';

#idCliente = signal<number>(0);
idCliente = computed(() => this.#idCliente());

#nameCliente = signal<string>('');
nameCliente = computed(() => this.#nameCliente());

constructor(private httpClient: HttpClient) { }

public setIdCliente(value: number): void {
  this.#idCliente.set(value);
}

public setNameCliente(value: string): void {
  this.#nameCliente.set(value);
}
 // Método para crear persona
  createCliente(formData: FormData): Observable<ClienteDTOForWeb> {
    return this.httpClient.post<ClienteDTOForWeb>(`${this.url}/save/return/dto`, formData);
  }

getClientes(): Observable<Cliente[]> {
  return this.httpClient.get<Cliente[]>(`${this.url_publica}/all`);
}

getClientesForVenta(): Observable<ClienteDTOForWeb[]> {
  return this.httpClient.get<ClienteDTOForWeb[]>(`${this.url_publica}/all`);
}

updateCliente(formData: FormData): Observable<Cliente> {
  return this.httpClient.put<Cliente>(`${this.url}/update`, formData);
}

getClienteById(id: number): Observable<Cliente> {
  return this.httpClient.get<Cliente>(`${this.url_publica}/${id}`);
}

deleteCliente(id: number): Observable<Cliente> {
  return this.httpClient.delete<Cliente>(`${this.url}/${id}`);
}

buscarCliente(nombre: string): Observable<ClienteDTOForWeb[]> {
  const params = new HttpParams().set('nombre', nombre);
  return this.httpClient.get<ClienteDTOForWeb[]>(`${this.url_publica}/buscar`, { params });
}

// Método para obtener clientes paginados
getClientesPaginados(
  page: number = 0,
  size: number = 5,
  sortBy: string = 'nombre',
  sortDir: string = 'asc'
): Observable<PageableResponse<ClienteDTOForWeb>> {
  
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortBy', sortBy)
    .set('sortDir', sortDir);

  return this.httpClient.get<PageableResponse<ClienteDTOForWeb>>(`${this.url_publica}/paginado/clientes`, { params });
}

// Método para buscar clientes por nombre con paginación
buscarClientesPorNombre(
  nombre: string,
  page: number = 0,
  size: number = 10,
  sortBy: string = 'nombre',
  sortDir: string = 'asc'
): Observable<PageableResponse<Cliente>> {
  
  let params = new HttpParams()
    .set('nombre', nombre)
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortBy', sortBy)
    .set('sortDir', sortDir);

  return this.httpClient.get<PageableResponse<Cliente>>(`${this.url_publica}/buscar`, { params });
}

}
