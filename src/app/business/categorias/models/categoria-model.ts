export interface Categoria{
    id: number;
    nombre: string;
    descripcion: string;
    image?: Image
}

export interface Image {
  id?: number;
  name: string;
  imageUrl: string;
  imageId: string;
}
