import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPresentItemsComponent } from './cart-present-items.component';

describe('CartPresentItemsComponent', () => {
  let component: CartPresentItemsComponent;
  let fixture: ComponentFixture<CartPresentItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPresentItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPresentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
