import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProduct } from './modify-product';

describe('ModifyProduct', () => {
  let component: ModifyProduct;
  let fixture: ComponentFixture<ModifyProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
