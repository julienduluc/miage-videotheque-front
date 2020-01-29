import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BACK_ERROR_MESSAGE_ATTRIBUT } from '@core/constants/app.constant';
import { ErrorService } from '@core/errors/error.service';
import { MessagesService } from '@core/messages/messages.service';
import { LoginService } from '@core/security/auth/login.service';
import { StateStorageService } from '@core/security/auth/state-storage.service';

@Component({
  selector: 'myapp-login',
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
    private errorService: ErrorService,
    private stateStorageService: StateStorageService
  ) {
    if (loginService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
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
        // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // // since login is succesfull, go to stored previousState and clear previousState
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          if (redirect.split('?').length > 1) {
            let query = '{';
            const params = redirect.split('?')[1];
            const paramsArray = params.split('&');

            paramsArray.forEach((param, i) => {
              const paramSplit = param.split('=');
              query += '"' + paramSplit[0] + '"';
              query += ': "' + paramSplit[1] + '"';

              if (paramsArray.length === (i - 1)) {
                query += ',';
              }
            });

            query += '}';

            this.router.navigate([redirect.split('?')[0]], { queryParams: JSON.parse(query) });
          } else {
            this.router.navigate([redirect]);
          }

          this.stateStorageService.storeUrl(null);
        } else {
          this.router.navigate(['']);
        }
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
