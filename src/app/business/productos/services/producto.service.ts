import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlSaveProducto: string = 'http://localhost:8080/api/productos/save';
  private url: string = 'http://localhost:8080/api/productos';
  private url_publica: string = 'http://localhost:8080/api/productos/get';

    #idProducto = signal<number>(0);
  idProducto = computed(() => this.#idProducto())

  #nameProducto = signal<string>('');
   nameProducto = computed(() => this.#nameProducto())

  constructor(private httpClient: HttpClient) { }

   public setIdProducto(value: number): void {
    this.#idProducto.set(value);
  }

    public setNameProducto(value: string): void {
    this.#nameProducto.set(value);
  }

    // Método para crear persona
  createProducto(formData: FormData): Observable<Producto> {
    return this.httpClient.post<Producto>(this.urlSaveProducto, formData);
  }

  getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(`${this.url_publica}/all`);
  }

  updateProducto(formData: FormData): Observable<Producto> {
    return this.httpClient.put<Producto>(`${this.url}/update`, formData);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(`${this.url_publica}/${id}`);
  }

  deleteProducto(id: number): Observable<Producto> {
    return this.httpClient.delete<Producto>(`${this.url}/${id}`);
  }

  buscarProducto(nombre: string): Observable<Producto[]> {
    const params = new HttpParams().set('nombre', nombre);
    return this.httpClient.get<Producto[]>(`${this.url_publica}/buscar`, { params });
  }

}
