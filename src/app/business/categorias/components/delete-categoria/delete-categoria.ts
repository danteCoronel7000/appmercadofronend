import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-delete-categoria',
  imports: [RouterLink],
  templateUrl: './delete-categoria.html',
  styleUrl: './delete-categoria.css'
})
export default class DeleteCategoria {

  private categoriaService = inject(CategoriaService)
  private categoryService = inject(CategoriaService);

  success = false;
   
  idCategory = 0;
  nameCategory = '';

  constructor(private router: Router){
    this.idCategory = this.categoriaService.idCategory();
    this.nameCategory = this.categoriaService.nameCategory();
  }

// OPCIÓN 1: Usando objeto observer (Recomendado)
deleteCategory(): void {
  console.log('id categoria a eliminar: ' + this.idCategory);
  
  this.categoryService.deleteCategory(this.idCategory).subscribe({
    next: () => {
      // Se ejecuta cuando la operación es exitosa
      this.mostrarExito();
      setTimeout(() => {
        this.router.navigate(['/listar-categorias']);
      }, 1000);
    },
    error: (error) => {
      // Se ejecuta cuando hay un error
      console.error('Error al eliminar la categoría:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    },
    complete: () => {
      // Se ejecuta al finalizar (opcional)
      console.log('Operación completada');
    }
  });
}

  
  /*
  deleteCategory(): void {
    console.log('id categoria a eliminar: ' + this.idCategory);
    this.categoryService.deleteCategory(this.idCategory).subscribe(
      (data) => {
        console.log("categoria eliminada: " + data)
        this.operacionExitosaService.show();
        setTimeout(() => {
          this.operacionExitosaService.hide();
          this.router.navigate(['/listar-categorias'])
        }, 1000);
      },
      (error) => {
        console.error('error al eliminar el usuario:', error);
      }
    );
  }

*/
  //para mostrar una animacion despues de operacion exitosa

mostrarExito(): void {
  this.success = true;

  setTimeout(() => {
    this.success = false;
  }, 1000); // 2.5 segundos visible
}
}
