import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieBoxListComponent } from './categorie-box-list.component';

describe('CategorieBoxListComponent', () => {
  let component: CategorieBoxListComponent;
  let fixture: ComponentFixture<CategorieBoxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieBoxListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieBoxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
