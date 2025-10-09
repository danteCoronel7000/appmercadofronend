import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-borrador',
  imports: [CommonModule, FormsModule],
  templateUrl: './borrador.html',
  styleUrl: './borrador.css'
})
export class Borrador {
selectedTab: string = 'cliente';
}
