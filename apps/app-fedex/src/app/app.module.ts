import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterService } from './register.service';
import {
  RecaptchaFormsModule,
  RecaptchaV3Module,
  RECAPTCHA_V3_SITE_KEY
} from 'ng-recaptcha';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RecaptchaV3Module,
    RecaptchaFormsModule
  ],
  providers: [
    // Display errors instantly.
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    // HTTP Interceptors.
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    // reCAPTCHA settings.
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: String(process.env.RECAPTCHA_SITE_KEY)
    },
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
