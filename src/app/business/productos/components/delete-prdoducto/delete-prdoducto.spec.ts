import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePrdoducto } from './delete-prdoducto';

describe('DeletePrdoducto', () => {
  let component: DeletePrdoducto;
  let fixture: ComponentFixture<DeletePrdoducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePrdoducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePrdoducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
