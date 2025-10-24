import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario, UsuarioDTOForWeb } from '../../models/usuarios.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-usuario',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './new-usuario.html',
  styleUrl: './new-usuario.css'
})
export default class NewUsuario {
usuariosService = inject(UsuarioService);
usuariosList: UsuarioDTOForWeb[] = [];
archivoSeleccionado: File | null = null;
usuarioForm: FormGroup;
success = false;

constructor(private fb: FormBuilder, private router: Router) {
  this.obtenerUsuarios();

  //inicializamos formulario
  this.usuarioForm = this.fb.group({
    id: [null],
    estado: ['activo', Validators.required],
    role: [''],
    fechaRegistro: [new Date(), Validators.required],
    sueldoBase: ['', Validators.required],
    persona: this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    sexo: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    estadoCivil: ['', Validators.required],
    nacionalidad: ['', Validators.required],
    direccion: ['', Validators.required],
    gmail: ['', Validators.required],
    documentoIdentidad: ['', Validators.required],
    telefono: [null, [Validators.required, Validators.min(0)]],
      })
  });
}

obtenerUsuarios() {
  this.usuariosService.getUsuarios().subscribe({
    next: (data) => {
      this.usuariosList = data;
    },
    error: (error) => {
      console.error('Error al obtener usuarios:', error);
    },
  });
}

crearUsuario() {
  if (this.usuarioForm.invalid) {
    this.usuarioForm.markAllAsTouched();
    console.warn('Formulario inválido');
    return;
  }

  //enviamos con la interfaz Persona por que en el backend recibe PersonaEntity
  const usuario: Usuario = this.usuarioForm.value;

  console.log('Usuario a crear:', usuario);

  if (this.archivoSeleccionado) {
    // Aquí puedes enviar el usuario con la imagen usando FormData
    const formData = new FormData();
    formData.append('usuario', new Blob([JSON.stringify(usuario)], { type: 'application/json' }));
    formData.append('file', this.archivoSeleccionado);

    this.usuariosService.createUsuario(formData).subscribe({
      next: (response) => {
        console.log('Usuario creado con éxito', response);
        this.mostrarExito();
        // Esperamos 1 segundo antes de navegar
        setTimeout(() => {
          this.router.navigate(['/metricas']);
        }, 800);
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
      },
    });
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
