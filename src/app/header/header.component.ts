import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(public AuthService: AuthService, private router: Router,) {}

    onLogout(): void {
      this.AuthService.logout().subscribe(
        () => {
          this.AuthService.username = '';
          this.AuthService.isLoggedIn = false;
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.router.navigate(['/']);
        }
      );
    }
  }


