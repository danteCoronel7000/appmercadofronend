import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Loader } from "./core/lib/components/loader/loader";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
 constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(({ initFlowbite }) => {
        initFlowbite();

        // 🚀 Vuelve a ejecutar después de cada navegación
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            initFlowbite();
          }
        });
      });
    }
  }
}
