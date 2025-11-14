import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VentasDash } from '../ventas-dash/ventas-dash';
import { VentasByUserDash } from "../ventas-by-user-dash/ventas-by-user-dash";
import { VentasPorCliente } from "../ventas-por-cliente/ventas-por-cliente";
import { ProductoMasVendido } from "../producto-mas-vendido/producto-mas-vendido";
import { TendenciaVentas } from "../tendencia-ventas/tendencia-ventas";
import { RentabilidadProducto } from "../rentabilidad-producto/rentabilidad-producto";
import { TasaCrecimiento } from "../tasa-crecimiento/tasa-crecimiento";
import { HoraPicoVentas } from "../hora-pico-ventas/hora-pico-ventas";

@Component({
  selector: 'app-layout-dash',
  imports: [CommonModule, VentasDash, VentasByUserDash, VentasPorCliente, ProductoMasVendido, TendenciaVentas, RentabilidadProducto, TasaCrecimiento, HoraPicoVentas],
  templateUrl: './layout-dash.html',
  styleUrl: './layout-dash.css'
})
export default class LayoutDash {

}
