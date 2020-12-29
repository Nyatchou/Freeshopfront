import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArticlePresentComponent } from './single-article-present.component';

describe('SingleArticlePresentComponent', () => {
  let component: SingleArticlePresentComponent;
  let fixture: ComponentFixture<SingleArticlePresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleArticlePresentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleArticlePresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
