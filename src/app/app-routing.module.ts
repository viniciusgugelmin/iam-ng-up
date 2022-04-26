import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HomeLoginComponent } from './pages/home-login/home-login.component';
import { HomeRegisterComponent } from './pages/home-register/home-register.component';
import { HomeLoggedComponent } from './pages/home-logged/home-logged.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { BaseTemplateComponent } from './pages/base-template/base-template.component';
import { UsersFormComponent } from './pages/users-form/users-form.component';
import { RolesListComponent } from './pages/roles-list/roles-list.component';

const routes: Routes = [
  {
    path: '',
    component: BaseTemplateComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          { path: 'login', component: HomeLoginComponent },
          { path: 'register', component: HomeRegisterComponent },
        ],
      },
      {
        path: 'home',
        component: HomeLoggedComponent,
        children: [
          {
            path: 'users',
            children: [
              { path: 'list', component: UsersListComponent },
              { path: 'form', component: UsersFormComponent },
              { path: 'form/:userId', component: UsersFormComponent },
            ],
          },
          {
            path: 'roles',
            children: [{ path: 'list', component: RolesListComponent }],
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
