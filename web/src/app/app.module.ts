import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RestService } from './services/rest.service';
import { GlobalService } from './services/global.service';
 
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right",
      distance: 12
    },
    vertical: {
      position: "top",
      distance: 12,
      gap: 10
    }
  },
  theme: "material",
  behaviour: {
    autoHide: 3000,
    onClick: "hide",
    onMouseover: "pauseAutoHide",
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease"
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50
    },
    shift: {
      speed: 300,
      easing: "ease"
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NotifierModule.withConfig(customNotifierOptions),

    HttpClientModule,

  ],
  providers: [
    AuthService, AuthGuard,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },

    { provide: LocationStrategy, useClass: HashLocationStrategy },
    RestService, GlobalService,

    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
