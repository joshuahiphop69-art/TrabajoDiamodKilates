import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdPlata } from './prod-plata';

describe('ProdPlata', () => {
  let component: ProdPlata;
  let fixture: ComponentFixture<ProdPlata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdPlata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdPlata);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
