import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoDtoCompras, ProveedorDto } from '../models/compras.model';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private url: string = 'http://localhost:8080/api/itemscompra';
  private urlPro: string = 'http://localhost:8080/api/productos';

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
}
