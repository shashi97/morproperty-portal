import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import { PropertyComponent } from './components/property/property-image/property.component';
import { SharedComponentModule } from './components/shared/shared-component.module';
import { Router } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import {ProjectSharedService} from './shared/project-shared.service';
import { MasterService  } from './components/shared';
import {
  LoginComponent, FooterComponent,
  HeaderComponent, HomeComponent, 
  AlertService, AuthenticationService, httpFactory, BreadcrumbsService, LocalStorageService,
  CommonService
} from './core';
import { AccordionModule, GrowlModule } from 'primeng/primeng';     // accordion and accordion tab

import {  AuthGuard } from './components/shared';
import { ForgotPasswordComponent } from './core/forgot/forgot.component';
import { ResetPasswordComponent } from './core/reset-password/reset-password.component';
import { TabViewModule, TooltipModule } from 'primeng/primeng';

/*Loading*/
import { LoaderService } from './core/loader/loader.service';
import { ErrorService } from './core/error/error.service';
import { LoaderComponent } from './core/loader/loader.component';
import { ApiUrl, RouteService } from './shared';
/*property */
import { PropertyModule } from './components/property/property.module';
import { ProjectModule } from './components/project/project.module';
/*mapview*/
import {MapvieModule} from './components/map-view/mapview.module';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    // SafeHtmlPipe,
    
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoaderComponent,
    
    
  ],

  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    PropertyModule,
    SharedComponentModule,
    BrowserAnimationsModule,
    AccordionModule,
    ProjectModule,
    MapvieModule,
    GrowlModule,
    // NgbModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, ApiUrl, Router, LoaderService, ErrorService, LocalStorageService]
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    AlertService,
    CommonService,
    AuthenticationService,
    ApiUrl,
    RouteService,
    BreadcrumbsService,
    LocalStorageService,
    MasterService,
    LoaderService,
    ErrorService,
    ProjectSharedService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
