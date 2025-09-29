import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditartCliente } from './editart-cliente';

describe('EditartCliente', () => {
  let component: EditartCliente;
  let fixture: ComponentFixture<EditartCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditartCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditartCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
