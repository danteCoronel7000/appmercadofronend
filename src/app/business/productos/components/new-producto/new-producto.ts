import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../../categorias/services/categoria-service';
import { Categoria } from '../../../categorias/models/categoria-model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-producto',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './new-producto.html',
  styleUrl: './new-producto.css'
})
export default class NewProducto {
  categoriasService = inject(CategoriaService);
  productoService = inject(ProductoService);
  categoriasList: Categoria[] = [];
  archivoSeleccionado: File | null = null;
  productoForm: FormGroup;
  success = false;

  constructor(private fb: FormBuilder, private router: Router){
    this.obtenerCategorias();

    //inicializamos formulario
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [null, [Validators.required, Validators.min(0)]],
      perecedero: [false],
      unidadMedida: ['', Validators.required],
      categoria: ['', Validators.required]
    })
  }
  obtenerCategorias(){
    this.categoriasService.getCategory().subscribe({
      next: (data) => {this.categoriasList = data},
       error: (error) => {console.error('Error al eliminar la categoría:', error);}
    });
  }

  crearProducto() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      console.warn('Formulario inválido');
      return;
    }

    const producto: Producto = {
      ...this.productoForm.value,
      categoria: { id: +this.productoForm.value.categoria }  // 👈 arreglamos esto
    };

    console.log('Producto a crear:', producto);

    if (this.archivoSeleccionado) {
      // Aquí puedes enviar el producto con la imagen usando FormData
      const formData = new FormData();
      formData.append('producto', new Blob([JSON.stringify(producto)], { type: 'application/json' }));
      formData.append('file', this.archivoSeleccionado);

      this.productoService.createProducto(formData).subscribe({
        next: (response) => {
          console.log('producto crado con exito', response)
          this.mostrarExito()
          // Esperamos 1 segundo antes de navegar
          setTimeout(() => {
            this.router.navigate(['/listar-productos']);
          }, 800);
        },
        error: (error) => { console.error('Error al crear producto:', error) }
      })
    } else {
      console.log('No se ha seleccionado ningún archivo');
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.archivoSeleccionado = file || null;
    console.log('Archivo seleccionado:', this.archivoSeleccionado);
  }

  mostrarExito(): void {
  this.success = true;

  setTimeout(() => {
    this.success = false;
  }, 800); // 2.5 segundos visible
}
}
