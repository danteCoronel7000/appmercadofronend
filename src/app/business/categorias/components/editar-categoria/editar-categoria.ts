import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria-service';
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
  categoriasService = inject(CategoriaService);
  categoriaForm: FormGroup;
  categoryId: number = 0;
  
  success = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ){
    this.categoriaForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(20)]],
    descripcion: ['', [Validators.required, Validators.maxLength(128)]]
  });
  
  this.categoryId = this.categoriasService.idCategory();
  this.cargarCategory();
  }

  cargarCategory(): void{
    this.categoriasService.getCategoryById(this.categoryId).subscribe(
      (data) =>{
        this.categoriaForm.patchValue(data);
      }
    )
  }

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

  //para mostrar una animacion despues de operacion exitosa
  mostrarExito(): void {
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 1000); // 2.5 segundos visible
  }
}
