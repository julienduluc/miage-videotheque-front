import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

// FIXME : create a proper mock
class MockStorageService {
  store = {};

  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: any) {
    this.store[key] = value;
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }

}

class MockPermissionService { }

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      declarations: [
      ],
      providers: [
        TranslateService,
        { provide: LocalStorageService, useClass: MockStorageService },
        { provide: SessionStorageService, useClass: MockStorageService },
        { provide: NgxPermissionsService, useClass: MockPermissionService },
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
