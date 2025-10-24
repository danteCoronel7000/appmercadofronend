import { Component, inject } from '@angular/core';
import { Usuario, UsuarioDTOForWeb } from '../../models/usuarios.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-usuarios',
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-usuarios.html',
  styleUrl: './listar-usuarios.css'
})
export default class ListarUsuarios {
  listUsuarios: UsuarioDTOForWeb[] = [];
usuarioSeleccionado?: UsuarioDTOForWeb;
usuarioService = inject(UsuarioService);

// Variables de paginación
currentPage: number = 0;
pageSize: number = 12;
totalPages: number = 0;
totalElements: number = 0;
isFirst: boolean = true;
isLast: boolean = false;

// Variables de ordenamiento
sortBy: string = 'id';
sortDir: string = 'asc';

// Variable para búsqueda
searchTerm: string = '';

constructor(private router: Router) {
  this.getUsuarios();
}

getUsuarios(): void {
  this.usuarioService.getUsuariosPaginados(
    this.currentPage,
    this.pageSize,
    this.sortBy,
    this.sortDir
  ).subscribe({
    next: (response) => {
      this.listUsuarios = response.content;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.isFirst = response.first;
      this.isLast = response.last;
      console.log('Página recibida:', response);
    },
    error: (err) => console.error('Error al obtener usuarios', err)
  });
}

cambiarPagina(page: number): void {
  if (page >= 0 && page < this.totalPages) {
    this.currentPage = page;
    this.getUsuarios();
  }
}

cambiarPageSize(event: Event): void {
  const target = event.target as HTMLSelectElement;
  if (target) {
    this.pageSize = parseInt(target.value);
    this.currentPage = 0;
    this.getUsuarios();
  }
}

obtenerIdUsuario(id: number): void {
  this.usuarioService.setIdUsuario(id);
  this.router.navigate(['/editar-usuarios']);
}
obtenerIdPersonaYIdUser(idP: number, idU: number): void {
  this.usuarioService.setIdPersona(idP);
  this.usuarioService.setIdUsuario(idU);
  this.router.navigate(['/add-user']);
}

protected getIdAndName(id: number, nombre: string) {
  this.usuarioService.setIdUsuario(id);
  this.usuarioService.setNameUsuario(nombre);
}

// verificar backend por que cambiamos para que reciba UsuarioDTOForWeb
buscarPorNombre(nombre: string): void {
  const value = nombre.trim();
  if (value) {
    this.usuarioService.buscarUsuario(value).subscribe({
      next: (usuarios) => this.listUsuarios = usuarios,
      error: (err) => console.log('Error al buscar', err)
    });
  } else {
    this.getUsuarios();
  }
}

verDetalles(usuario: UsuarioDTOForWeb) {
  this.usuarioSeleccionado = usuario;
}

cerrarModal() {
  this.usuarioSeleccionado = undefined;
}

// Función trackBy para optimizar el rendimiento de *ngFor
trackByFn(index: number, item: Usuario): number {
  return item.id;
}

}
