import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasearchComponent } from './datasearch.component';

describe('DatasearchComponent', () => {
  let component: DatasearchComponent;
  let fixture: ComponentFixture<DatasearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
