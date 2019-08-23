import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/core/messages/messages.service';
import { LoginService } from 'src/app/core/security/auth/login.service';

@Component({
  selector: 'myApp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordVisibility = false;

  form: FormGroup = new FormGroup({});

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private fb: FormBuilder,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    if (this.loginService.isAuthenticated()) {
      this.router.navigate(['']);
    }

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      rememberMe: [true, Validators.required]
    });
  }

  login() {
    if (this.form.valid) {
      this.loginService.login({
        username: this.form.get('username').value,
        password: this.form.get('password').value,
        rememberMe: this.form.get('rememberMe').value
      }).then(() => {
        this.router.navigate(['']);
      }).catch((err) => {
        this.messageService.showErrorNoTranslate(err.error.detail);
      });
    }
  }

  changePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
