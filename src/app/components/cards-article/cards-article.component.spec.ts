import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsArticleComponent } from './cards-article.component';

describe('CardsArticleComponent', () => {
  let component: CardsArticleComponent;
  let fixture: ComponentFixture<CardsArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
