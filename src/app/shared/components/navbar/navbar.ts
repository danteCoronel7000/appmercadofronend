import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Authentication } from '../../../core/services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  nombre: string | null
  apellido: string | null
  imageUrl: string | null
  gmail: string | null
constructor(private authService: Authentication){
  
    this.nombre = authService.getNombre();
    this.apellido = authService.getApellido();
    this.imageUrl = authService.getImageUrl();
    this.gmail = authService.getGmail();
  
}

logout(): void{
  this.authService.logout();
}
}
