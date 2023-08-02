import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopTypeComponent } from './pop-type.component';

describe('PopTypeComponent', () => {
  let component: PopTypeComponent;
  let fixture: ComponentFixture<PopTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
