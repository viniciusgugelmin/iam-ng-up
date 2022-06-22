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
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { TableComponent } from './components/table/table.component';
import { BaseTemplateComponent } from './pages/base-template/base-template.component';
import { AlertsBoxComponent } from './components/alerts-box/alerts-box.component';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';
import { UsersFormComponent } from './pages/users-form/users-form.component';
import { RolesListComponent } from './pages/roles-list/roles-list.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { StorageListComponent } from './pages/storage-list/storage-list.component';
import { EntriesListComponent } from './pages/entries-list/entries-list.component';
import { ProductsForSaleListComponent } from './pages/products-for-sale-list/products-for-sale-list.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { SalesListComponent } from './pages/sales-list/sales-list.component';
import { ApplicationPageComponent } from './pages/application-page/application-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeLoginComponent,
    HomeRegisterComponent,
    HomeLoggedComponent,
    NavbarComponent,
    UsersListComponent,
    TableComponent,
    BaseTemplateComponent,
    AlertsBoxComponent,
    ConfirmBoxComponent,
    UsersFormComponent,
    RolesListComponent,
    ProductsListComponent,
    CategoriesListComponent,
    StorageListComponent,
    EntriesListComponent,
    ProductsForSaleListComponent,
    CustomersListComponent,
    SalesListComponent,
    ApplicationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
// @ts-ignore
export class AppModule {}

// @ts-ignore
