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

    this.authService._isAuthenticated.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res) => {
        if (res) {
          this.title = 'Connecté';
        } else {
          this.title = 'Non connecté';
        }
      });
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
