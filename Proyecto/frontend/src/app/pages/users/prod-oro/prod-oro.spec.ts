import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdOro } from './prod-oro';

describe('ProdOro', () => {
  let component: ProdOro;
  let fixture: ComponentFixture<ProdOro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdOro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdOro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
