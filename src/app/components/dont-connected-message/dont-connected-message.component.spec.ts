import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DontConnectedMessageComponent } from './dont-connected-message.component';

describe('DontConnectedMessageComponent', () => {
  let component: DontConnectedMessageComponent;
  let fixture: ComponentFixture<DontConnectedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DontConnectedMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DontConnectedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
