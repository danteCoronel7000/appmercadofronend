export interface ItemVentaResponse {
  id: number;
  cantidad: number;
  precioUnitario: number;
  descuentoUnitario: number;
  subtotalDescuento: number;
  totalItem: number;
  productoId: number;
  productoNombre: string;
}

export interface VentaResponse {
  id: number;
  numeroVenta: number;
  montoTotal: number;
  fechaCreacion: string,
  fechaActualizacion: string,
  estado: string;
  moneda: string;
  nroFactura: string | null;
  clienteId: number;
  clienteNombre: string;
  clienteApellido: string;

  usuarioId: number;
  usuarioNombre: string;
  usuarioApellido: string;
  items: ItemVentaResponse[];
}

export interface ItemVentaRequest {
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  descuentoUnitario: number;
}

export interface VentaRequest {
  numeroVenta: number;
  montoTotal: number;
  moneda: string;
  nroFactura?: string | null;
  clienteId: number;
  itemsVenta: ItemVentaRequest[];
}

