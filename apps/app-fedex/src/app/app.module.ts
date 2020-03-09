import { AppComponent } from './app.component';
import { CoreModule } from '@fedex-test/core';
import { HomeModule } from '@fedex-test/home';
import { NgModule } from '@angular/core';
import { SharedModule } from '@fedex-test/shared';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [CoreModule, HomeModule, SharedModule]
})
export class AppModule {}
