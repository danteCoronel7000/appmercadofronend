import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto, ProductoDTOForWeb } from '../models/producto.model';
import { PageableResponse } from '../../../shared/models/shared.model';
import { ProductoDtoCompras } from '../../compras/models/compras.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  private url: string = 'http://localhost:8080/api/productos';
  private url_publica: string = 'http://localhost:8080/api/productos/get';
  private url_publicaUno: string = 'http://localhost:8080/api/productos';

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
  createProducto(formData: FormData): Observable<ProductoDTOForWeb> {
    return this.httpClient.post<ProductoDTOForWeb>(`${this.url}/save/return/ws`, formData);
  }

  getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(`${this.url_publica}/all`);
  }

  getProductoByIdDto(id: number): Observable<ProductoDtoCompras>{
    return this.httpClient.get<ProductoDtoCompras>(`${this.url_publica}/producto/id/compras`)
  }

  updateProducto(formData: FormData): Observable<Producto> {
    return this.httpClient.put<Producto>(`${this.url}/update`, formData);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(`${this.url_publica}/${id}`);
  }

  getProductoByIdForCompraDto(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(`${this.url_publicaUno}/producto/id/compras/${id}`);
  }

  deleteProducto(id: number): Observable<Producto> {
    return this.httpClient.delete<Producto>(`${this.url}/${id}`);
  }

  buscarProducto(nombre: string): Observable<ProductoDTOForWeb[]> {
    const params = new HttpParams().set('nombre', nombre);
    return this.httpClient.get<ProductoDTOForWeb[]>(`${this.url_publica}/buscar`, { params });
  }

   // Método para obtener productos paginados
  getProductosPaginados(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'nombre',
    sortDir: string = 'asc'
  ): Observable<PageableResponse<ProductoDTOForWeb>> {
    
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.httpClient.get<PageableResponse<ProductoDTOForWeb>>(`${this.url_publica}/paginado`, { params });
  }

  // Método para buscar productos por nombre con paginación
  buscarProductosPorNombre(
    nombre: string,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'nombre',
    sortDir: string = 'asc'
  ): Observable<PageableResponse<Producto>> {
    
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.httpClient.get<PageableResponse<Producto>>(`${this.url_publica}/buscar`, { params });
  }

}
