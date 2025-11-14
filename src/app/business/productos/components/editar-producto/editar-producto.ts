import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Categoria, Producto } from '../../models/producto.model';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-editar-producto',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export default class EditarProducto {
  success = false;
  archivoSeleccionado: File | null = null;
  productoForm: FormGroup;
  categoriasList: Categoria[] = [];
  categoriasService = inject(CategoriaService);
  productoService = inject(ProductoService);
  imageUrl: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.obtenerCategorias();
    this.cargarFormProducto();

    //inicializamos formulario
    this.productoForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      medida: ['', Validators.required],
      descripcion: [''],
      precio: [null, [Validators.required, Validators.min(0)]],
      perecedero: [false],
      unidadMedida: [''],
      stockMin: ['', Validators.required],
      categoria: [null, Validators.required]
    })
  }

  cargarFormProducto(): void {
    this.productoService.getProductoById(this.productoService.idProducto()).subscribe({
      next: (res) => {
        console.log('producto by id: ', res);
        const formData = {
          ...res,
          categoria: res.categoria?.id || '' // Extraer solo el ID de la categoría
        };

        this.productoForm.patchValue(formData);
        this.imageUrl = res.image?.imageUrl || '';
      },
      error: (e) => { console.log('error: ', e) }
    })
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      console.warn('Formulario inválido');
      return;
    }

    const producto: Producto = { ...this.productoForm.value };

    const formData = new FormData();
    formData.append(
      'producto',
      new Blob([JSON.stringify(producto)], { type: 'application/json' })
    );

    if (this.archivoSeleccionado) {
      formData.append('file', this.archivoSeleccionado);
    }

    console.log('JSON.stringify(producto):', JSON.stringify(producto));

    this.productoService.updateProducto(formData).subscribe({
      next: (res) => {
        console.log('producto actualizado con exito', res)
        this.mostrarExito()
        // Esperamos 1 segundo antes de navegar
        setTimeout(() => {
          this.router.navigate(['/listar-productos']);
        }, 800);
      },
      error: (error) => { console.error('Error al crear producto:', error) }
    })
  }

  obtenerCategorias() {
    this.categoriasService.getCategory().subscribe({
      next: (data) => { this.categoriasList = data },
      error: (error) => { console.error('Error al eliminar la categoría:', error); }
    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.archivoSeleccionado = file || null;
    console.log('Archivo seleccionado:', this.archivoSeleccionado);
  }

  //para mostrar una animacion despues de operacion exitosa
  mostrarExito(): void {
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 1000); // 2.5 segundos visible
  }
}
