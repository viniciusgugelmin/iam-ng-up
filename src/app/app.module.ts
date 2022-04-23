import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxContextModule } from 'ngx-context';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, NgxContextModule],
  providers: [],
  bootstrap: [AppComponent],
})
// @ts-ignore
export class AppModule {}

// @ts-ignore
