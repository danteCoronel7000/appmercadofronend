import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Categoria, CategoriaUpdate } from '../models/categoria-model';
import { Observable } from 'rxjs';
import { PageableResponse } from '../../../shared/models/shared.model';
import { CategoriaDtoWeb } from '../models/categoriaDto.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = 'http://localhost:8080/api/categorias';
  private url_publica = 'http://localhost:8080/api/categorias/get';
  private urlCreate = 'http://localhost:8080/api/categorias/save';
  private urlUpdate = 'http://localhost:8080/api/categorias/update';

  #idCategory = signal<number>(0);
  idCategory = computed(() => this.#idCategory())

  #nameCategory = signal<string>('');
  nameCategory = computed(() => this.#nameCategory())

  constructor(private httpClient: HttpClient) { }


  public setIdCategory(value: number): void {
    this.#idCategory.set(value);
  }

  public setNameCategory(value: string): void {
    this.#nameCategory.set(value);
  }

  crateCategory(categoria: Categoria): Observable<Categoria> {
    console.log('Llamando al backend con:', categoria);
    return this.httpClient.post<Categoria>(`${this.url}/crear`, categoria);
  }

  createCategoria(formData: FormData): Observable<Categoria> {
    return this.httpClient.post<Categoria>(this.urlCreate, formData);
  }

  getCategory(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.url_publica);
  }

  /*
  updateCategory(id: number, categoria: Categoria): Observable<Categoria>{
    return this.httpClient.put<Categoria>(`${this.url}/${id}`, categoria);
  }*/
  updateCategoria(formData: FormData): Observable<Categoria> {
    return this.httpClient.put<Categoria>(`${this.url}/update`, formData);
  }

  getCategoryById(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(`${this.url_publica}/${id}`);
  }

  getCategoryByIdWhithParent(id: number): Observable<CategoriaUpdate> {
    return this.httpClient.get<CategoriaUpdate>(`${this.url_publica}/by/${id}`);
  }

  deleteCategory(id: number): Observable<Categoria> {
    return this.httpClient.delete<Categoria>(`${this.url}/${id}`)
  }

  buscarCategoria(nombre: string): Observable<Categoria[]> {
    const params = new HttpParams().set('nombre', nombre);
    return this.httpClient.get<Categoria[]>(`${this.url_publica}/buscar`, { params });
  }


  /**
   * Guarda una nueva categoría
   * @param categoria - Datos de la categoría
   * @param file - Archivo de imagen (opcional)
   * @param parentId - ID de la categoría padre (opcional)
   * @returns Observable<CategoriaEntity>
   */
  saveCategoria(categoria: Categoria, file?: File, parentId?: number): Observable<Categoria> {
    // isParent = 1 si no tiene parentId, 0 si tiene parentId
    const isParentValue = (parentId === undefined || parentId === null) ? 1 : 0;

    const categoriaModificada: Categoria = {
      ...categoria,
      isParent: isParentValue
    };

    const formData = new FormData();
    formData.append('categoria', new Blob([JSON.stringify(categoriaModificada)], { type: 'application/json' }));

    if (file) {
      formData.append('file', file);
    }

    let params = new HttpParams();
    if (parentId !== undefined && parentId !== null) {
      params = params.set('parentId', parentId.toString());
    }

    return this.httpClient.post<Categoria>(this.urlCreate, formData, { params });
  }

  /**
   * actualizar categoría
   * @param categoria - Datos de la categoría
   * @param file - Archivo de imagen (opcional)
   * @param parentId - ID de la categoría padre (opcional)
   * @returns Observable<CategoriaEntity>
   */
  actualizarCategoria(categoria: Categoria, file?: File, parentId?: number): Observable<Categoria> {
    // isParent = 1 si no tiene parentId, 0 si tiene parentId
    const isParentValue = (parentId === undefined || parentId === null) ? 1 : 0;

    const categoriaModificada: Categoria = {
      ...categoria,
      isParent: isParentValue
    };

    const formData = new FormData();
    formData.append('categoria', new Blob([JSON.stringify(categoriaModificada)], { type: 'application/json' }));

    if (file) {
      formData.append('file', file);
    }

    let params = new HttpParams();
    if (parentId !== undefined && parentId !== null) {
      params = params.set('parentId', parentId.toString());
    }

    return this.httpClient.put<Categoria>(this.urlUpdate, formData, { params });
  }

   /**
   * Obtiene solo las categorías principales (sin padre)
   * @returns Observable<CategoriaEntity[]>
   */
  getCategoriasPrincipales(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.url}/principales`);
  }

     // Método para obtener productos paginados
    getCategoriasPaginados(
      page: number = 0,
      size: number = 5,
      sortBy: string = 'nombre',
      sortDir: string = 'asc'
    ): Observable<PageableResponse<Categoria>> {
      
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sortBy', sortBy)
        .set('sortDir', sortDir);
  
      return this.httpClient.get<PageableResponse<Categoria>>(`${this.url_publica}/paginado`, { params });
    }

    // Método para obtener productos paginados con dto
    getCategoriasPaginadosDto(
      page: number = 0,
      size: number = 5,
      sortBy: string = 'nombre',
      sortDir: string = 'asc'
    ): Observable<PageableResponse<CategoriaDtoWeb>> {
      
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sortBy', sortBy)
        .set('sortDir', sortDir);
  
      return this.httpClient.get<PageableResponse<CategoriaDtoWeb>>(`${this.url_publica}/paginado/dto`, { params });
    }
  
    // Método para buscar productos por nombre con paginación
    buscarProductosPorNombre(
      nombre: string,
      page: number = 0,
      size: number = 10,
      sortBy: string = 'nombre',
      sortDir: string = 'asc'
    ): Observable<PageableResponse<Categoria>> {
      
      let params = new HttpParams()
        .set('nombre', nombre)
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sortBy', sortBy)
        .set('sortDir', sortDir);
  
      return this.httpClient.get<PageableResponse<Categoria>>(`${this.url_publica}/buscar`, { params });
    }
}
