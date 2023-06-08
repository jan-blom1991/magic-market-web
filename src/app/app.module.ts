import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing-module';
import {ProductService} from './services/product.service';
import {UserService} from './services/user.service';
import {FileService} from './services/file.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatIconRegistry} from '@angular/material/icon';
import {GlobalRequestInterceptor} from "./configuration/global-request-interceptor";
import {DefaultModule} from "./layouts/default/default.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      AppRoutingModule,
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      DefaultModule
  ],
  providers: [
    ProductService,
    UserService,
    FileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalRequestInterceptor,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
