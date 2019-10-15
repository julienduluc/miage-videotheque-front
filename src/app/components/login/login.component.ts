import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BACK_ERROR_MESSAGE_ATTRIBUT } from '@core/constants/app.constant';
import { ErrorService } from '@core/errors/error.service';
import { MessagesService } from '@core/messages/messages.service';
import { LoginService } from '@core/security/auth/login.service';

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
    private messageService: MessagesService,
    private errorService: ErrorService
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
        if (err && this.errorService.isErrorToDisplay(err.error[BACK_ERROR_MESSAGE_ATTRIBUT])) {
          this.messageService.showErrorNoTranslate(err.error.detail);
        }
      });
    }
  }

  changePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
