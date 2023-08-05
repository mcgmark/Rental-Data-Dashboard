import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertMessageSource = new BehaviorSubject<string>('');
  alertMessage$ = this.alertMessageSource.asObservable();

  private confirmCallback: ((confirmed: boolean) => void) | undefined;

  constructor() { }

  showAlertWithConfirm(message: string, callback: (confirmed: boolean) => void): void {
    this.alertMessageSource.next(message);
    this.confirmCallback = callback;
  }

  confirm(confirmed: boolean): void {
    if (this.confirmCallback) {
      this.confirmCallback(confirmed);
      this.confirmCallback = undefined; // Clear the callback after executing it
    }
  }
  
  clearNotification(): void {
    this.alertMessageSource.next('');
  }
}
