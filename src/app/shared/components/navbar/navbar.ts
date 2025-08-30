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
constructor(private authService: Authentication){}

logout(): void{
  this.authService.logout();
}
}
