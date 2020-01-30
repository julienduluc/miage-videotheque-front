import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTooltipModule,
} from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { LanguageModule } from '@core/language/language.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule, NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NguCarouselModule } from '@ngu/carousel';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularDraggableModule } from 'angular2-draggable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AvatarModule } from 'ngx-avatar';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AutoCompleteModule } from 'primeng/autocomplete';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
  minTime: 1,
  maxTime: 2,
};

@NgModule({
  imports: [
    NgxDatatableModule,
    NgxMaskModule,
    NgxPermissionsModule,
    NgxWebstorageModule.forRoot(),
    MatDialogModule,
    MatFormFieldModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatSlideToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    NgbDropdownModule,
    NgbModule,
    FontAwesomeModule,
    NgSelectModule,
    NgbTabsetModule,
    AutoCompleteModule,
    MatTooltipModule,
    MatRadioModule,
    NguCarouselModule,
    AngularDraggableModule,
    NgxChartsModule,
    MatIconModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    AvatarModule,
    NgxMaterialTimepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    NgxMaskModule,
    NgxPermissionsModule,
    NgxWebstorageModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatMenuModule,
    NgbDropdownModule,
    NgbModule,
    LanguageModule,
    FontAwesomeModule,
    NgSelectModule,
    NgbTabsetModule,
    AutoCompleteModule,
    MatTooltipModule,
    MatRadioModule,
    NguCarouselModule,
    AngularDraggableModule,
    MatInputModule,
    NgxChartsModule,
    MatIconModule,
    NgxUiLoaderModule,
    AvatarModule,
    NgxMaterialTimepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxExtendedPdfViewerModule
  ],
})
export class SharedLibsModule {
  static forRoot() {
    return {
      ngModule: SharedLibsModule
    };
  }
}
