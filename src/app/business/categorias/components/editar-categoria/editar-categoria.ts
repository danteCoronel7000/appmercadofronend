import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-categoria',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.css'
})
export default class EditarCategoria {
  categoriaService = inject(CategoriaService);
  categoriaForm: FormGroup;
  categoryId: number = 0;
  imageUrl: string = '';
  archivoSeleccionado: File | null = null;
  
  success = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ){
    this.categoriaForm = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required, Validators.maxLength(20)]],
    descripcion: ['', [Validators.required, Validators.maxLength(128)]]
  });
  
  this.categoryId = this.categoriaService.idCategory();
  this.cargarCategory();
  }

  cargarCategory(): void{
    this.categoriaService.getCategoryById(this.categoryId).subscribe(
      (data) =>{
        this.categoriaForm.patchValue(data);
        this.imageUrl = data.image?.imageUrl || '';
      }
    )
  }
/*
  onSubmit(): void{
    const newCategory: Categoria = this.categoriaForm.value;
    console.log('Categoría a enviar al backend:', JSON.stringify(this.categoriaForm.value, null, 2));
    this.categoriasService.updateCategory(this.categoryId, newCategory).subscribe(
      () => {
        this.mostrarExito();
        // Esperamos 2 segundos antes de navegar
        setTimeout(() => {
        this.router.navigate(['/listar-categorias']);
        }, 1000);
      }
    )
  }
    */
   onSubmit(): void {
  if (this.categoriaForm.invalid) {
    this.categoriaForm.markAllAsTouched();
    console.warn('Formulario inválido');
    return;
  }

  const categoria: Categoria = this.categoriaForm.value;

  const formData = new FormData();
  formData.append('categoria', new Blob([JSON.stringify(categoria)], { type: 'application/json' }));
  if (this.archivoSeleccionado) {
    formData.append('file', this.archivoSeleccionado);
  }

  console.log('JSON.stringify(categoria):', JSON.stringify(categoria));

  this.categoriaService.updateCategoria(formData).subscribe({
    next: (res) => {
      console.log('Categoría actualizada con éxito', res);
      this.mostrarExito();
      // Esperamos 1 segundo antes de navegar
      setTimeout(() => {
        this.router.navigate(['/listar-categorias']);
      }, 800);
    },
    error: (error) => {
      console.error('Error al actualizar categoría:', error);
    }
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
