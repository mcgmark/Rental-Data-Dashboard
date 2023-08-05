import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(public AuthService: AuthService, private router: Router, private alertService: AlertService, private notificationService: NotificationService) {}

    onLogout(): void {
      const message = 'Are you sure you want to logout?';
      this.alertService.showAlertWithConfirm(message, (confirmed) => {
        if (confirmed) {
          this.AuthService.logout().subscribe(
            () => {
              this.AuthService.username = '';
              this.AuthService.isLoggedIn = false;
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              this.router.navigate(['/']);
            }
          );
            this.notificationService.showNotification('Logout Successful!');
        }
      });
    }
}

