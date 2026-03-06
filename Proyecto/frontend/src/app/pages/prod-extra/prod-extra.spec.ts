import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdExtra } from './prod-extra';

describe('ProdExtra', () => {
  let component: ProdExtra;
  let fixture: ComponentFixture<ProdExtra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdExtra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdExtra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
