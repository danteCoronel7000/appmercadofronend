import { computed, Injectable, signal } from "@angular/core";
import { debounceTime, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LoaderService{
     // Signal para UI reactiva
  #isLoading = signal<boolean>(false);
  isLoading = computed(() => this.#isLoading());

  // Control interno
  private loaderSubject = new Subject<boolean>();

  constructor() {
    // Aquí se aplica el debounce centralizado
    this.loaderSubject.pipe(
      debounceTime(300) // Espera 300ms antes de activar el loader
    ).subscribe((show) => {
      this.#isLoading.set(show);
    });
  }

  show() {
    this.loaderSubject.next(true);
  }

  hide() {
    // Cancelamos el loader inmediatamente
    this.#isLoading.set(false);
    this.loaderSubject.next(false); // Por si hay uno en cola
  }
    /*
    #isLoading = signal<boolean>(false);
    isLoading = computed(() => this.#isLoading())

    show(){
        this.#isLoading.set(true);
    }
    hide(){
        this.#isLoading.set(false)
    }
        */
}