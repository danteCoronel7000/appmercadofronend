import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-cliente.html',
  styleUrl: './new-cliente.css'
})
export default class NewCliente {
  selectedTab: string = 'cliente';
}
