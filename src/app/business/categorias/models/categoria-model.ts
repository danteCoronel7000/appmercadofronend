export interface Categoria{
    id: number;
    nombre: string;
    descripcion: string;
    isParent: number;
    parent: number;
    image?: Image
}

export interface CategoriaUpdate{
    id: number;
    nombre: string;
    descripcion: string;
    isParent: number;
    parent?: CategoriaUpdate;
    image?: Image
}

export interface Image {
  id?: number;
  name: string;
  imageUrl: string;
  imageId: string;
}
