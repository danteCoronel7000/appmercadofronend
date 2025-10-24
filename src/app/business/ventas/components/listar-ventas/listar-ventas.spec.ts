import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVentas } from './listar-ventas';

describe('ListarVentas', () => {
  let component: ListarVentas;
  let fixture: ComponentFixture<ListarVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarVentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVentas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
