import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(private AuthService: AuthService) {
    this.checkAuthStatus();
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


