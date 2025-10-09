export interface Proveedor {
  id: number;
  tipoProveedor: string;
  fechaRegistro: string;
  estado: string;
  persona?: Persona;
  empresa?: Empresa;
}

export interface Persona {
  nombre: string;
  apellido: string;
  gmail: string;
  direccion: string;
  telefono: string;
  estadoCivil: string;
  nacionalidad: string;
  genero: string;
  ncarnet: string;
}

export interface Empresa {
  razonSocial: string;
  nombreComercial: string;
  nit: string;
}


export interface Image {
    id: number;
    url: string;
    nombre?: string;
    tipo?: string;
}



export interface ProveedorEmpDtoWeb {
 id: number;
  tipoProveedor: string;
  fechaRegistro: string;
  estado: string;
  razonSocial: string;
  nombreComercial: string;
  nit: string;
  imageUrl: string;
}
export interface ProveedorPerDtoWeb {
   id: number;
  tipoProveedor: string;
  fechaRegistro: string;
  estado: string;
nombre: string;
  apellido: string;
  gmail: string;
  direccion: string;
  telefono: string;
  estadoCivil: string;
  nacionalidad: string;
  genero: string;
  ncarnet: string;
  imageUrl: string;
}