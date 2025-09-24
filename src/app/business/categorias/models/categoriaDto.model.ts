// interfaces/categoria.interface.ts

export interface SubCategoriaDto {
  id: number;
  nombre: string;
  descripcion: string;
  imgUrl: string | null;
}

export interface CategoriaDtoWeb {
  id: number;
  nombre: string;
  descripcion: string;
  imgUrl: string | null;
  subCategorias: SubCategoriaDto[] | null;
}

// Opcional: Interface para arrays de categorías (común en respuestas de API)
export interface CategoriasResponse {
  categorias: CategoriaDtoWeb[];
}

// Opcional: Interface para respuesta única
export interface CategoriaResponse {
  categoria: CategoriaDtoWeb;
}