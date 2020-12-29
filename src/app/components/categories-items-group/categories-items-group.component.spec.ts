import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesItemsGroupComponent } from './categories-items-group.component';

describe('CategoriesItemsGroupComponent', () => {
  let component: CategoriesItemsGroupComponent;
  let fixture: ComponentFixture<CategoriesItemsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesItemsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesItemsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
