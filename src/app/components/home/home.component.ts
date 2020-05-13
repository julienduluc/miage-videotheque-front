import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'myapp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  title: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.authService._auth.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res) => {
        if (res) {
          this.authService.getAccountDetails().subscribe(res => {
            this.title = 'bonjour ' + res.username;
          });
        } else {
          this.title = 'bonjour random';
        }
      });
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
