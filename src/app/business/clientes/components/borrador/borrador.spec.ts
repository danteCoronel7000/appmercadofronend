import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Borrador } from './borrador';

describe('Borrador', () => {
  let component: Borrador;
  let fixture: ComponentFixture<Borrador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Borrador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Borrador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
