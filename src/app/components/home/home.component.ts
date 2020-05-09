import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { HomeService } from './home.service';

@Component({
  selector: 'myapp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
