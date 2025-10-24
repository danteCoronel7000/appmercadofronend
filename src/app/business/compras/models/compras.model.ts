export interface OrdenCompra {
id?: number | null; // PK
numeroOrden: number;
montoTotal: number; // decimal (19,0) — en JS/TS usamos number
fechaCreacion: string; // ISO date
fechaActualizacion?: string; // ISO date
estado: string; // varchar(20)
nroFactura?: string | null;
moneda: string;
proveedor: Proveedor;
}


export interface ItemCompra {
id?: number | null; // PK
cantidad: number; // numeric(9)
precioUnitario: number; // decimal
subTotal: number; // cantidad * precioUnitario
descuentoUnitario?: number; // decimal
subTotalDescuento?: number; // subTotal - (descuentoUnitario * cantidad)
totalItem: number; // final
ordenCompra: OrdenCompra;
producto: Producto;
}

export interface Proveedor {
  id: number;
  tipoProveedor: string;
  fechaRegistro: string;
  estado: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  perecedero: boolean;
  unidadMedida: string;
  medida: string;
}

export interface CompraDto {
id: number; 
numeroOrden: number;
montoTotal: number; // decimal (19,0) — en JS/TS usamos number
fechaCreacion: string; // ISO date
fechaActualizacion?: string; // ISO date
estado: string; // varchar(20)
nroFactura?: string | null;
moneda: string;
proveedorId: number;
iditem?: number | null; // PK
cantidad: number; // numeric(9)
precioUnitario: number; // decimal
subTotal: number; // cantidad * precioUnitario
descuentoUnitario?: number; // decimal
subTotalDescuento?: number; // subTotal - (descuentoUnitario * cantidad)
totalItem: number; // final
productoId: number;
}

export interface ProveedorDto {
  id?: number;
  tipoProveedor: string;
  estado: string;
  nombre: string;
  apellido: string;
  gmail: string;
  direccion: string;
  razonSocial: string;
  nombreComercial: string;
  nit: string;
}


export interface ProductoDtoCompras {
  id: number;
  nombre: string;
  precio: number;
  unidadMedida: string;
  presentacion: string;
  medida: string;
  stockActual: number;
  stockMin: number;
}