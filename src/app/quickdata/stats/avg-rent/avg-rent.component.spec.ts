import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgRentComponent } from './avg-rent.component';

describe('AvgRentComponent', () => {
  let component: AvgRentComponent;
  let fixture: ComponentFixture<AvgRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgRentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvgRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
