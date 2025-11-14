import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteDTOForVenta } from '../../clientes/models/cliente.model';
import { VentaRequest, VentaResponse } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
    private apiUrl = 'http://localhost:8080/api/ventas';

  constructor(private httpClient: HttpClient) {}


  getNumeroVenta(): Observable<string> {
    return this.httpClient.get<string>(`${this.apiUrl}/numero/orden`);
  }

  
    getClientes(): Observable<ClienteDTOForVenta[]>{
      return this.httpClient.get<ClienteDTOForVenta[]>(`${this.apiUrl}/clientes/orden/venta`);
    }

    /**
 * Registra una nueva venta
 * @param venta Datos de la venta
 * @returns Observable con la respuesta del servidor
 */
registrarVenta(venta: VentaRequest): Observable<VentaResponse> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.httpClient.post<VentaResponse>(`${this.apiUrl}/create`,venta,{ headers });
}

/**
 * Obtiene todas las órdenes de venta
 * @returns Observable con el listado de órdenes
 */
obtenerOrdenesVenta(): Observable<VentaResponse[]> {
  return this.httpClient.get<VentaResponse[]>(`${this.apiUrl}/list/ventas`);
}

/**
 * Cambia el estado de una orden de venta a COMPLETADA
 * @param ordenId ID de la orden de venta
 * @returns Observable con la orden actualizada
 */
cambiarEstadoACompletada(ordenId: number): Observable<VentaResponse> {
  return this.httpClient.patch<VentaResponse>(`${this.apiUrl}/completar/${ordenId}`, {});
}



}
