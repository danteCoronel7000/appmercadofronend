import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria-model';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaDtoWeb } from '../../models/categoriaDto.model';


@Component({
  selector: 'app-categorias-list',
  imports: [RouterLink],
  templateUrl: './categorias-list.html',
  styleUrl: './categorias-list.css'
})
export default class CategoriasList {
  listCategorys: Categoria[] = [];
  listCategorysDto: CategoriaDtoWeb[] = [];
  categoriasService = inject(CategoriaService);
  // Variables de paginación
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  totalElements: number = 0;
  isFirst: boolean = true;
  isLast: boolean = false;

  // Variables de ordenamiento
  sortBy: string = 'nombre';
  sortDir: string = 'asc';

  // Variable para búsqueda
  searchTerm: string = '';


  constructor(private router: Router){
    this.getCategorysDto();
  }

  /*
  obtiene todas las categorias
  getCategorys(): void{
    this.categoriasService.getCategory().subscribe(
      (data) => {
        this.listCategorys = data;
      }
    )
  }
*/
  obtenerIdCategory(id: number):void{
    this.categoriasService.setIdCategory(id);
    this.router.navigate(['/editar-categoria'])
  }

  protected getIdAndName(id: number, nombre: string){
    this.categoriasService.setIdCategory(id);
    this.categoriasService.setNameCategory(nombre);
  }

  buscarPorNombre(nombre: string): void {
    const value = nombre.trim();
    if (value) {
      this.categoriasService.buscarCategoria(value).subscribe({
        next: (categorias) => this.listCategorys = categorias,
        error: (err) => console.log('error al buscar', err)
      });
    } else {
      this.getCategorys();
    }
  }

    getCategorys(): void {
    this.categoriasService.getCategoriasPaginados(
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortDir
    ).subscribe({
      next: (response) => {
        this.listCategorys = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isFirst = response.first;
        this.isLast = response.last;
        console.log('Página recibida dto:', response);
      },
      error: (err) => console.error('Error al obtener productos', err)
    });
  }

  //obtener lista de categorias pero con dto
    getCategorysDto(): void {
    this.categoriasService.getCategoriasPaginadosDto(
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortDir
    ).subscribe({
      next: (response) => {
        this.listCategorysDto = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isFirst = response.first;
        this.isLast = response.last;
        console.log('Página recibida:', response);
      },
      error: (err) => console.error('Error al obtener productos', err)
    });
  }

    cambiarPagina(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getCategorysDto();
      //    this.getCategorys();
    }
  }

 cambiarPageSize(event: Event): void {
  const target = event.target as HTMLSelectElement;
  if (target) {
    this.pageSize = parseInt(target.value);
    this.currentPage = 0;
    this.getCategorysDto();
//    this.getCategorys();
  }
}


      
}
