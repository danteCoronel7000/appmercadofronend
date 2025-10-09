import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente, Persona } from '../../models/cliente.model';


@Component({
  selector: 'app-new-cliente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './new-cliente.html',
  styleUrl: './new-cliente.css'
})
export default class NewCliente {
  clientesService = inject(ClienteService);
  clientesList: Cliente[] = [];
  archivoSeleccionado: File | null = null;
  clienteForm: FormGroup;
  success = false;

  constructor(private fb: FormBuilder, private router: Router) {

    //inicializamos formulario
    this.clienteForm = this.fb.group({
      id: [null],
      estado: ['activo', Validators.required],
      nit: ['', Validators.required],
      fechaRegistro: [new Date(), Validators.required],
      persona: this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        sexo: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        estadoCivil: ['', Validators.required],
        nacionalidad: ['', Validators.required],
        direccion: ['', Validators.required],
        correoElectronico: ['', Validators.required],
        ncarnet: ['', Validators.required],
        telefono: [null, [Validators.required, Validators.min(0)]],
      })
    });
  }
  obtenerClientes() {
    this.clientesService.getClientes().subscribe({
      next: (data) => { this.clientesList = data },
      error: (error) => { console.error('Error:', error); }
    });
  }

  crearCliente() {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      console.warn('Formulario inválido');
      return;
    }

    //enviamos Con la interfaz Producto por que en el backend recibe ProductoEntity
    const cliente: Persona = this.clienteForm.value;

    console.log('cliente a crear:', cliente);

    if (this.archivoSeleccionado) {
      // Aquí puedes enviar el producto con la imagen usando FormData
      const formData = new FormData();
      formData.append('cliente', new Blob([JSON.stringify(cliente)], { type: 'application/json' }));
      formData.append('file', this.archivoSeleccionado);

      this.clientesService.createCliente(formData).subscribe({
        next: (response) => {
          console.log('cliente crado con exito', response)
          this.mostrarExito()
          // Esperamos 1 segundo antes de navegar
          setTimeout(() => {
            this.router.navigate(['/metricas']);
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
