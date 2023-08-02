import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalmonthComponent } from './totalmonth.component';

describe('TotalmonthComponent', () => {
  let component: TotalmonthComponent;
  let fixture: ComponentFixture<TotalmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalmonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
