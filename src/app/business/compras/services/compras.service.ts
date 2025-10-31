import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdenCompraRequest, OrdenCompraResponse, ProductoDtoCompras, ProveedorDto } from '../models/compras.model';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private url: string = 'http://localhost:8080/api/itemscompra';
  private urlPro: string = 'http://localhost:8080/api/productos';
  private apiUrl = 'http://localhost:8080/api/ordenes/compra';

  constructor(private httpClient: HttpClient) { }

  getNumeroOrden(): Observable<string> {
    return this.httpClient.get<string>(`${this.url}/numero/orden`);
  }

  getProveedores(): Observable<ProveedorDto[]>{
    return this.httpClient.get<ProveedorDto[]>(`${this.url}/proveedor/orden/compra`);
  }

  getProductos(): Observable<ProductoDtoCompras[]>{
    return this.httpClient.get<ProductoDtoCompras[]>(`${this.urlPro}/productos/compras`)
  }

  /**
   * Registra una nueva orden de compra
   * @param ordenCompra Datos de la orden de compra
   * @returns Observable con la respuesta del servidor
   */
  registrarOrdenCompra(ordenCompra: OrdenCompraRequest): Observable<OrdenCompraResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<OrdenCompraResponse>(
      `${this.apiUrl}/create`,
      ordenCompra,
      { headers }
    );
  }

  /**
   * Obtiene todas las órdenes de compra
   * @returns Observable con el listado de órdenes
   */
  obtenerOrdenesCompra(): Observable<OrdenCompraResponse[]> {
    return this.httpClient.get<OrdenCompraResponse[]>(`${this.apiUrl}/list/compras`);
  }

  /**
   * Obtiene una orden de compra por ID
   * @param id ID de la orden de compra
   * @returns Observable con la orden de compra
   */
  obtenerOrdenCompraPorId(id: number): Observable<OrdenCompraResponse> {
    return this.httpClient.get<OrdenCompraResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Actualiza el estado de una orden de compra
   * @param id ID de la orden de compra
   * @param estado Nuevo estado
   * @returns Observable con la orden actualizada
   */
  actualizarEstadoOrden(id: number, estado: string): Observable<OrdenCompraResponse> {
    return this.httpClient.patch<OrdenCompraResponse>(
      `${this.apiUrl}/${id}/estado`,
      { estado }
    );
  }

  /**
   * Elimina una orden de compra
   * @param id ID de la orden de compra
   * @returns Observable void
   */
  eliminarOrdenCompra(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
