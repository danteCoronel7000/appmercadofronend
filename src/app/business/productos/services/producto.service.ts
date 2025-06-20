import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlSaveProducto: string = 'http://localhost:8080/api/productos/save';

  constructor(private httClient: HttpClient) { }

    // Método para crear persona
  createProducto(formData: FormData): Observable<Producto> {
    return this.httClient.post<Producto>(this.urlSaveProducto, formData);
  }
}
