import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria-model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-categoria',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './new-categoria.html',
  styleUrl: './new-categoria.css'
})
export default class NewCategoria {
  categoriaService = inject(CategoriaService);
  categoriaForm: FormGroup;
  parentId: number | undefined;
  parentCategoriasList: Categoria[] = []
  archivoSeleccionado: File | null = null;
  success = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ){
    console.log('componente creado')
    this.categoriaForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(20)]],
    descripcion: ['', [Validators.required, Validators.maxLength(128)]]
  });

  this.getParentCategorias();
  }

/*  onSubmit(): void{
    console.log('¡onSubmit ejecutado!');
    console.trace('🔁 Submit llamado');
    const newCategory: Categoria = this.categoriaForm.value;
    console.log('Categoría a enviar al backend:', JSON.stringify(this.categoriaForm.value, null, 2));
    this.categoriasService.crateCategory(newCategory).subscribe(
      () => {
        this.mostrarExito();
        // Esperamos 1 segundo antes de navegar
        setTimeout(() => {
        this.router.navigate(['/listar-categorias']);
        }, 800);
      }
    )
  }*/
 crearCategoria() {
  if (this.categoriaForm.invalid) {
    this.categoriaForm.markAllAsTouched();
    console.warn('Formulario inválido');
    return;
  }

  const categoria: Categoria = this.categoriaForm.value;

  console.log('Categoría a crear:', categoria);

  if (this.archivoSeleccionado) {
    // Enviar la categoría con la imagen usando FormData
    const formData = new FormData();
    formData.append('categoria', new Blob([JSON.stringify(categoria)], { type: 'application/json' }));
    formData.append('file', this.archivoSeleccionado);

    this.categoriaService.createCategoria(formData).subscribe({
      next: (response) => {
        console.log('Categoría creada con éxito', response);
        this.mostrarExito();
        // Esperamos 1 segundo antes de navegar
        setTimeout(() => {
          this.router.navigate(['/listar-categorias']);
        }, 800);
      },
      error: (error) => {
        console.error('Error al crear categoría:', error);
      }
    });
  } else {
    console.log('No se ha seleccionado ningún archivo');
  }
}

getParentCategorias(): void{
  this.categoriaService.getCategoriasPrincipales().subscribe({
    next: (response) =>{this.parentCategoriasList = response}
  })
}

 onParentChange(value: string): void {
    if (value === '') {
      this.parentId = undefined;
    } else {
      this.parentId = Number(value);
    }
  }

createCategoria(): void{
  const categoria: Categoria = this.categoriaForm.value;
  this.categoriaService.saveCategoria(categoria, this.archivoSeleccionado || undefined, this.parentId).subscribe({
     next: (response) => {
        console.log('Categoría creada con éxito', response);
        this.mostrarExito();
        // Esperamos 1 segundo antes de navegar
        setTimeout(() => {
          this.router.navigate(['/listar-categorias']);
        }, 800);
      },
      error: (error) => {
        console.error('Error al crear categoría:', error);
      }
  })
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
  }, 800); // 2.5 segundos visible
}

}
