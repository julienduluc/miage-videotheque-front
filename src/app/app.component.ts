import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { LanguageHelper } from '@core/language/language.helper';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { vendors } from './app.vendor';

@Component({
  selector: 'myapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoading = false;

  private unsubscribe$ = new Subject();

  constructor(
    private readonly translate: TranslateService,
    private router: Router,
    private library: FaIconLibrary,
    private languageHelper: LanguageHelper,
    private ngxLoadingService: NgxUiLoaderService
  ) {
    translate.addLangs(['fr']);
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    vendors(this.library);

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

  /**
   * Get page title from route's datas
   * @private
   * @param {ActivatedRouteSnapshot} routeSnapshot
   * @returns
   * @memberof AppComponent
   */
  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data.pageTitle ? routeSnapshot.data.pageTitle : 'MyApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}
