import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Proveedor } from '../../models/proveedor.model';
import { Router, RouterLink } from '@angular/router';
import { ProveedorService } from '../../service/proveedor.service';

@Component({
  selector: 'app-new-proveedor',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './new-proveedor.html',
  styleUrl: './new-proveedor.css'
})
export default class NewProveedor {
  selectedTab: string = 'persona';
  proveedoresService = inject(ProveedorService);
  archivoSeleccionado: File | null = null;
  proveedorFormPersona: FormGroup;
  proveedorFormEmpresa: FormGroup;
  success = false;

  constructor(private fb: FormBuilder, private router: Router) {

    // inicializamos formulario
    this.proveedorFormPersona = this.fb.group({
      id: [null],
      tipoProveedor: ['persona', Validators.required],
      fechaRegistro: [new Date(), Validators.required],
      estado: ['activo', Validators.required],
      persona: this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        sexo: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        estadoCivil: ['', Validators.required],
        nacionalidad: ['', Validators.required],
        direccion: ['', Validators.required],
        correoElectronico: ['', Validators.required],
        documentoIdentidad: ['', Validators.required],
        telefono: [null, [Validators.required, Validators.min(0)]],
      })
    });
    this.proveedorFormEmpresa = this.fb.group({
      id: [null],
      tipoProveedor: ['empresa', Validators.required],
      fechaRegistro: [new Date(), Validators.required],
      estado: ['activo', Validators.required],
      empresa: this.fb.group({
        razonSocial: ['', Validators.required],
        nombreComercial: ['', Validators.required],
        nit: ['', Validators.required],
        direccion: ['', Validators.required],
        correoElectronico: ['', Validators.required],
        telefono: [null, [Validators.required, Validators.min(0)]],
      })
    });


  }



  crearProveedorPersona() {
    if (this.proveedorFormPersona.invalid) {
      this.proveedorFormPersona.markAllAsTouched();
      console.warn('Formulario proveedor tipo persona inválido');
      return;
    }

    // enviamos con la interfaz Proveedor (o Persona) según lo que reciba el backend
    const proveedor: Proveedor = this.proveedorFormPersona.value;

    console.log('Proveedor a crear persona:', proveedor);

    if (this.archivoSeleccionado) {
      // Aquí puedes enviar el proveedor con la imagen usando FormData
      const formData = new FormData();
      formData.append('proveedor', new Blob([JSON.stringify(proveedor)], { type: 'application/json' }));
      formData.append('file', this.archivoSeleccionado);
  
      this.proveedoresService.createProveedorPersona(formData).subscribe({
        next: (response) => {
          console.log('Proveedor persona creado con éxito', response);
          this.mostrarExito();
          // Esperamos 1 segundo antes de navegar
          setTimeout(() => {
            this.router.navigate(['/metricas']);
          }, 800);
        },
        error: (error) => { console.error('Error al crear proveedor:', error); }
      })
    } else {
      console.log('No se ha seleccionado ningún archivo');
    }
  }

  crearProveedorEmpresa() {
    if (this.proveedorFormEmpresa.invalid) {
      this.proveedorFormEmpresa.markAllAsTouched();
      console.warn('Formulario proveedor tipo empresa inválido');
      return;
    }

    // enviamos con la interfaz Proveedor (o Persona) según lo que reciba el backend
    const proveedor: Proveedor = this.proveedorFormEmpresa.value;

    console.log('Proveedor a crear empresa:', proveedor);

    if (this.archivoSeleccionado) {
      // Aquí puedes enviar el proveedor con la imagen usando FormData
      const formData = new FormData();
      formData.append('proveedor', new Blob([JSON.stringify(proveedor)], { type: 'application/json' }));
      formData.append('file', this.archivoSeleccionado);
  
      this.proveedoresService.createProveedorEmpresa(formData).subscribe({
        next: (response) => {
          console.log('Proveedor creado con éxito', response);
          this.mostrarExito();
          // Esperamos 1 segundo antes de navegar
          setTimeout(() => {
            this.router.navigate(['/listar-proveedores']);
          }, 800);
        },
        error: (error) => { console.error('Error al crear proveedor:', error); }
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
    }, 800); // 0.8 segundos visible
  }

}
