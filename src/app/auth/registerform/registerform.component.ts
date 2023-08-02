import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserModel } from '../../model/user';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'register-form',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {

  registerForm: FormGroup;
  UserModel: UserModel;

  messages: string  = '';

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private AuthService: AuthService,
    private renderer: Renderer2
  ) {

    this.UserModel = new UserModel();

    this.registerForm = this.formBuilder.group({
      username: [''],
      password: [''],
      confirm: ['']
    })
  }

  ngOnInit() { }

  comparePasswords(): Boolean {
    let pw1 = this.renderer.selectRootElement('#password').value;
    let pw2 = this.renderer.selectRootElement('#confirm').value;
    let pwMsg = this.renderer.selectRootElement('#pwMsg');

    if (pw1 != pw2) {
      pwMsg.innerText = "Passwords do not match";
      pwMsg.className = "text-danger";
      return false;
    }
    else {
        pwMsg.innerText = "";
        pwMsg.className = "";
        return true;
    };
  }

  passwordShowHide(): void {
    const pwShowHide = this.renderer.selectRootElement('#pwShowHide');
    const password = this.renderer.selectRootElement('#password');
    const confirm = this.renderer.selectRootElement('#confirm');

    const isEyeIcon = pwShowHide.classList.contains('fa-eye');
    pwShowHide.classList.remove('fa-sharp', 'fa-solid', isEyeIcon ? 'fa-eye' : 'fa-eye-slash');
    pwShowHide.classList.add('fa-solid', isEyeIcon ? 'fa-eye-slash' : 'fa-eye');

    password.type = isEyeIcon ? 'text' : 'password';
    confirm.type = isEyeIcon ? 'text' : 'password';
  }

  submitRegistration(): any {
    this.AuthService.register(this.registerForm.value)
    .subscribe({
      next: (res) => {
        // Handle the successful response here
        if (res && res.message === 'Registration successful') {
          this.router.navigate(['/listings']);
        }
      },
      error: (error) => {
        // Handle any error that occurs during the HTTP request
        this.messages = error.error.error;
      }
    });
  }
}
