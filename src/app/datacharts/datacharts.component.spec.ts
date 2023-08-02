import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatachartsComponent } from './datacharts.component';

describe('DatachartsComponent', () => {
  let component: DatachartsComponent;
  let fixture: ComponentFixture<DatachartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatachartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatachartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
