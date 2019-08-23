import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { vendors } from './app.vendor';
import { LanguageHelper } from './core/language/language.helper';

@Component({
  selector: 'myApp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoading = false;

  private unsubscribe$ = new Subject();

  constructor(
    private readonly translate: TranslateService,
    private router: Router,
    private languageHelper: LanguageHelper,
    private ngxLoadingService: NgxUiLoaderService
  ) {
    translate.addLangs(['fr']);
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    vendors();
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.ngxLoadingService.startLoader('main');
      } else if (event instanceof NavigationEnd) {
        this.languageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
        this.ngxLoadingService.stopLoader('main');
      } else if (event instanceof NavigationError) {
        //  this.messagesService.showError('NAVIGATION.FAIL');
        this.ngxLoadingService.stopLoader('main');
      } else if (event instanceof NavigationCancel) {
        this.ngxLoadingService.stopLoader('main');
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data.pageTitle ? routeSnapshot.data.pageTitle : 'MyApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}
