import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCaractComponent } from './select-caract.component';

describe('SelectCaractComponent', () => {
  let component: SelectCaractComponent;
  let fixture: ComponentFixture<SelectCaractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCaractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCaractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
