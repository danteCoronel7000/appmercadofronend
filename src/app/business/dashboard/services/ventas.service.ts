import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ventas } from '../models/ventas.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

    private apiUrl = 'http://localhost:8080/api/ventas'; // ✅ ajusta según tu backend

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las ventas desde el backend
   */
  getVentas(): Observable<Ventas[]> {
    return this.http.get<Ventas[]>(`${this.apiUrl}/venta/con/monto`);
  }
}
