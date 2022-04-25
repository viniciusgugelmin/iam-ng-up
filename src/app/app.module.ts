import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { HomeLoginComponent } from './pages/home-login/home-login.component';
import { HomeRegisterComponent } from './pages/home-register/home-register.component';
import { FormsModule } from '@angular/forms';
import { HomeLoggedComponent } from './pages/home-logged/home-logged.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeLoginComponent,
    HomeRegisterComponent,
    HomeLoggedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
// @ts-ignore
export class AppModule {}

// @ts-ignore
