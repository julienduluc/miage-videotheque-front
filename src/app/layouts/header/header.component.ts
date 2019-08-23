import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/security/auth/login.service';

@Component({
  selector: 'myApp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
