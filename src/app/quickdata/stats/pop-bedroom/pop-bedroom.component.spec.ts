import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopBedroomComponent } from './pop-bedroom.component';

describe('PopBedroomComponent', () => {
  let component: PopBedroomComponent;
  let fixture: ComponentFixture<PopBedroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopBedroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopBedroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
