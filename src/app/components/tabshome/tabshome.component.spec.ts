import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabshomeComponent } from './tabshome.component';

describe('TabshomeComponent', () => {
  let component: TabshomeComponent;
  let fixture: ComponentFixture<TabshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabshomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
