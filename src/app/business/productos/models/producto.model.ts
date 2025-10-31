export interface ProductoDTOForWeb {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;          // Float -> number
  perecedero: boolean;     // Boolean -> boolean
  unidadMedida: string;
  medida: string;
  presentacion: string;
  stockDisponible: number | null | undefined;
  stockActual: number | null | undefined;     // Integer -> number
  stockMin: number | null | undefined;
  fechaVencimiento: string | Date; // Date en backend: usa ISO string o Date en front
  popularidad: number;
  etiquetas: string;
  categoriaNombre: string;
  idCategoria: string;
  imageUrl: string;
}


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