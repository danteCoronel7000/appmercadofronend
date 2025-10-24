import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCompras } from './listar-compras';

describe('ListarCompras', () => {
  let component: ListarCompras;
  let fixture: ComponentFixture<ListarCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
