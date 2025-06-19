import { Component } from '@angular/core';
import { Authentication } from '../../../services/authentication.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sing-in',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sing-in.html',
  styleUrl: './sing-in.css'
})
export default class SingIn {
loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Authentication,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user: [''],
      password: ['']
    });
  }

  login(): void {
    const user = this.loginForm.value.user;
    const pass = this.loginForm.value.password;

    console.log('Usuario y contraseña desde el FormGroup:', user, pass);

    this.authService.login(user, pass).subscribe({
      next: (response) => {
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        this.router.navigate([role === 'administrador' ? '/loading' : '/sing-in']);
      },
      error: (err) => console.error('Login failed', err)
    });
  }

}
