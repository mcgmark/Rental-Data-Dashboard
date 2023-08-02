import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopMonthComponent } from './pop-month.component';

describe('PopMonthComponent', () => {
  let component: PopMonthComponent;
  let fixture: ComponentFixture<PopMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
