import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  private notificationMessageSource = new BehaviorSubject<string>('');
  notificationMessage$ = this.notificationMessageSource.asObservable();

  showNotification(message: string) {
    this.notificationMessageSource.next(message);
  }

  clearNotification() {
    this.notificationMessageSource.next('');
  }

  constructor() { }
}
