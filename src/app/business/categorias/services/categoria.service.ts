import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Categoria } from '../models/categoria-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = 'http://localhost:8080/api/categorias';
  private url_publica = 'http://localhost:8080/api/categorias/get';
  private urlCreate = 'http://localhost:8080/api/categorias/save';

  #idCategory = signal<number>(0);
  idCategory = computed(() => this.#idCategory())

  #nameCategory = signal<string>('');
   nameCategory = computed(() => this.#nameCategory())
  
  constructor(private httpClient: HttpClient) {}
  

  public setIdCategory(value: number): void {
    this.#idCategory.set(value);
  }

    public setNameCategory(value: string): void {
    this.#nameCategory.set(value);
  }

  crateCategory(categoria: Categoria): Observable<Categoria>{
     console.log('Llamando al backend con:', categoria);
    return this.httpClient.post<Categoria>(`${this.url}/crear`, categoria);
  }

  createCategoria(formData: FormData): Observable<Categoria>{
    return this.httpClient.post<Categoria>(this.urlCreate, formData);
  }

  getCategory(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(this.url_publica);
  }

  /*
  updateCategory(id: number, categoria: Categoria): Observable<Categoria>{
    return this.httpClient.put<Categoria>(`${this.url}/${id}`, categoria);
  }*/
 updateCategoria(formData: FormData): Observable<Categoria> {
  return this.httpClient.put<Categoria>(`${this.url}/update`, formData);
}

  getCategoryById(id: number): Observable<Categoria>{
    return this.httpClient.get<Categoria>(`${this.url_publica}/${id}`);
  }

  deleteCategory(id: number): Observable<Categoria>{
    return this.httpClient.delete<Categoria>(`${this.url}/${id}`)
  }

  buscarCategoria(nombre: string): Observable<Categoria[]>{
    const params = new HttpParams().set('nombre', nombre);
    return this.httpClient.get<Categoria[]>(`${this.url_publica}/buscar`, { params});
  }
}
