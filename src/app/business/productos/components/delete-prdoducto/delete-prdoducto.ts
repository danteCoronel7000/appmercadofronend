import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-delete-prdoducto',
  imports: [RouterLink],
  templateUrl: './delete-prdoducto.html',
  styleUrl: './delete-prdoducto.css'
})
export default class DeletePrdoducto {

  private productoService = inject(ProductoService)
  success = false;
  idProducto = 0;
  nameProducto = '';

  constructor(private router: Router){
    this.idProducto = this.productoService.idProducto();
    this.nameProducto = this.productoService.nameProducto();
  }

// OPCIÓN 1: Usando objeto observer (Recomendado)
deleteCategory(): void {
  console.log('id categoria a eliminar: ' + this.idProducto);
  
  this.productoService.deleteProducto(this.idProducto).subscribe({
    next: () => {
      // Se ejecuta cuando la operación es exitosa
      this.mostrarExito();
      setTimeout(() => {
        this.router.navigate(['/listar-productos']);
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
