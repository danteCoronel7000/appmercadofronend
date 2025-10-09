import { computed, Injectable, signal } from '@angular/core';
import { Proveedor, ProveedorEmpDtoWeb, ProveedorPerDtoWeb } from '../models/proveedor.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageableResponse } from '../../../shared/models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private url: string = 'http://localhost:8080/api/proveedores';
private url_publica: string = 'http://localhost:8080/api/proveedores/get';

#idProveedor = signal<number>(0);
idProveedor = computed(() => this.#idProveedor());

#nameProveedor = signal<string>('');
nameProveedor = computed(() => this.#nameProveedor());

constructor(private httpClient: HttpClient) { }

public setIdProveedor(value: number): void {
  this.#idProveedor.set(value);
}

public setNameProveedor(value: string): void {
  this.#nameProveedor.set(value);
}

// Método para crear proveedor
createProveedorPersona(formData: FormData): Observable<ProveedorPerDtoWeb> {
  return this.httpClient.post<ProveedorPerDtoWeb>(`${this.url}/save/persona/return/dto`, formData);
}
createProveedorEmpresa(formData: FormData): Observable<ProveedorEmpDtoWeb> {
  return this.httpClient.post<ProveedorEmpDtoWeb>(`${this.url}/save/empresa/return/dto`, formData);
}

updateProveedor(formData: FormData): Observable<Proveedor> {
  return this.httpClient.put<Proveedor>(`${this.url}/update`, formData);
}

getProveedorById(id: number): Observable<Proveedor> {
  return this.httpClient.get<Proveedor>(`${this.url_publica}/${id}`);
}

deleteProveedor(id: number): Observable<Proveedor> {
  return this.httpClient.delete<Proveedor>(`${this.url}/${id}`);
}

buscarProveedorPersona(nombre: string): Observable<ProveedorPerDtoWeb[]> {
  const params = new HttpParams().set('nombre', nombre);
  return this.httpClient.get<ProveedorPerDtoWeb[]>(`${this.url_publica}/persona/buscar`, { params });
}

buscarProveedorEmpresa(nombre: string): Observable<ProveedorEmpDtoWeb[]> {
  const params = new HttpParams().set('nombre', nombre);
  return this.httpClient.get<ProveedorEmpDtoWeb[]>(`${this.url_publica}/empresa/buscar`, { params });
}


// Método para obtener proveedores paginados
getProveedoresPerPaginados(
  page: number = 0,
  size: number = 5,
  sortBy: string = 'id',
  sortDir: string = 'asc'
): Observable<PageableResponse<ProveedorPerDtoWeb>> {

  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortBy', sortBy)
    .set('sortDir', sortDir);

  return this.httpClient.get<PageableResponse<ProveedorPerDtoWeb>>(`${this.url_publica}/paginado/proveedores/per`, { params });
}

getProveedoresEmpPaginados(
  page: number = 0,
  size: number = 5,
  sortBy: string = 'id',
  sortDir: string = 'asc'
): Observable<PageableResponse<ProveedorEmpDtoWeb>> {

  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortBy', sortBy)
    .set('sortDir', sortDir);

  return this.httpClient.get<PageableResponse<ProveedorEmpDtoWeb>>(`${this.url_publica}/paginado/proveedores/emp`, { params });
}

// Método para buscar proveedores por nombre con paginación
buscarProveedoresPorNombre(
  nombre: string,
  page: number = 0,
  size: number = 10,
  sortBy: string = 'nombre',
  sortDir: string = 'asc'
): Observable<PageableResponse<Proveedor>> {

  let params = new HttpParams()
    .set('nombre', nombre)
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortBy', sortBy)
    .set('sortDir', sortDir);

  return this.httpClient.get<PageableResponse<Proveedor>>(`${this.url_publica}/buscar`, { params });
}

}
