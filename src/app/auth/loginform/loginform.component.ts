import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserModel } from '../../model/user';

@Component({
  selector: 'login-form',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {

  loginForm: FormGroup;
  UserModel: UserModel;

  messages: string  = '';

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private AuthService: AuthService,
    private renderer: Renderer2
  ) {

    this.UserModel = new UserModel();

    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })

  }

  ngOnInit() { }

  passwordShowHide(): void {
    const pwShowHide = this.renderer.selectRootElement('#pwShowHide');
    const password = this.renderer.selectRootElement('#password');

    const isEyeIcon = pwShowHide.classList.contains('fa-eye');
    pwShowHide.classList.remove('fa-sharp', 'fa-solid', isEyeIcon ? 'fa-eye' : 'fa-eye-slash');
    pwShowHide.classList.add('fa-solid', isEyeIcon ? 'fa-eye-slash' : 'fa-eye');

    password.type = isEyeIcon ? 'text' : 'password';
  }

  submitLogin(): any {
    this.AuthService.login(this.loginForm.value)
    .subscribe({
      next: (res) => {
        if (res.user) {
          this.router.navigate(['/listings']);
          this.AuthService.username = res.user.username;
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.user.username);
          this.AuthService.isLoggedIn = true;
          const expirationDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
          document.cookie = `token=${res.token}; expires=${new Date(expirationDate).toUTCString()}; path=/; SameSite=Lax`;
        };
      },
      error: (error) => {
        this.messages = error.error.error;
      }
    });
  }
}
