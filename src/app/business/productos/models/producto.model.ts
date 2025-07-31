
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  perecedero: boolean;
  unidadMedida: string;
  medida: string;
  categoria: Categoria;
  image?: Image
}

export interface Categoria {
  id: number;
  nombre?: string;
  descripcion?: string;
}

export interface Image {
  id?: number;
  name: string;
  imageUrl: string;
  imageId: string;
}

export interface Proveedor {
  id?: number;
  persona: Persona;
}

export interface Persona {
  id?: number;
  nombre: string;
  apellido: string;
  ci: string;
  telefono: string;
  direccion: string;
  email?: string;
}


