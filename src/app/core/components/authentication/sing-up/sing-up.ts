import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../usuarios/services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sing-up',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sing-up.html',
  styleUrl: './sing-up.css'
})
export default class SingUp {
   userService = inject(UsuarioService);
  userForm: FormGroup;
  success = false;

  constructor(private fb: FormBuilder, private router: Router) {

    //inicializamos formulario
    this.userForm = this.fb.group({
      user: ['', Validators.required],
      passwd: ['', Validators.required],
      role: ['', Validators.required],
       persona: this.fb.group({
        id: [''],
      })
    });
  }

  crearUsuario(): void {
    if (this.userForm.valid) {
      const usuarioPayload = {
        name: this.userForm.value.user,
        password: this.userForm.value.passwd,
        role: this.userForm.value.role,
        persona: {
          id: this.userService.idPersona()
        }
      };
      console.log('usuario a crear:',usuarioPayload)
/*
      this.userService.crearUsuario(usuarioPayload).subscribe({
        next: (response) => {
          console.log('Usuario creado con éxito', response);
          this.mostrarExito()
          // Esperamos 1 segundo antes de navegar
          setTimeout(() => {
            this.router.navigate(['/listar-usuarios']);
          }, 800);
        },
        error: (err) => {
          console.error('Error al crear usuario', err);
          this.success = false;
        }
      });*/
    } else {
      console.warn('Formulario inválido, revisa los campos.');
      this.userForm.markAllAsTouched();
    }
  }

  mostrarExito(): void {
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 800); // 2.5 segundos visible
  }
}
