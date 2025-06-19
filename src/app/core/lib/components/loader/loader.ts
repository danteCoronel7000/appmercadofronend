import { Component, inject } from '@angular/core';
import { LoaderService } from '../../loaders/loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css'
})
export class Loader {
  isLoading = inject(LoaderService).isLoading;
}
