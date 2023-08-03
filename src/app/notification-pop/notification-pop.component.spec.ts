import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPopComponent } from './notification-pop.component';

describe('NotificationPopComponent', () => {
  let component: NotificationPopComponent;
  let fixture: ComponentFixture<NotificationPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
