import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { NotificationService } from './service/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  notificationMessage: string = '';

  constructor(private AuthService: AuthService, private NotificationService: NotificationService) {
    this.checkAuthStatus();

    this.NotificationService.notificationMessage$.subscribe((message) => {
      this.notificationMessage = message;
    });
  }


  title = 'Georgian CCSI - Rental Survey Digital Tool';

  private checkAuthStatus() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      this.AuthService.isLoggedIn = true;
      this.AuthService.username = username;
    }
  }
}


