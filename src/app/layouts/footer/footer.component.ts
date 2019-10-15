import { Component, OnInit } from '@angular/core';
import { LoginService } from '@core/security/auth/login.service';

@Component({
  selector: 'myApp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() { }

  isAuthenticated() {
    return this.loginService.isAuthenticated();;
  }

  logout() {
    this.loginService.logout();
  }
}
