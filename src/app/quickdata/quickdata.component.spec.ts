import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickdataComponent } from './quickdata.component';

describe('QuickdataComponent', () => {
  let component: QuickdataComponent;
  let fixture: ComponentFixture<QuickdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
