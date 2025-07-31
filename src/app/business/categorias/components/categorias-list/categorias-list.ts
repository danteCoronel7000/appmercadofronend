import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria-model';
import { CategoriaService } from '../../services/categoria.service';
import { error } from 'console';


@Component({
  selector: 'app-categorias-list',
  imports: [RouterLink],
  templateUrl: './categorias-list.html',
  styleUrl: './categorias-list.css'
})
export default class CategoriasList {
  listCategorys: Categoria[] = [];
  categoriasService = inject(CategoriaService);


  constructor(private router: Router){
    this.getCategorys();
  }

  getCategorys(): void{
    this.categoriasService.getCategory().subscribe(
      (data) => {
        this.listCategorys = data;
      }
    )
  }

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

      
}
