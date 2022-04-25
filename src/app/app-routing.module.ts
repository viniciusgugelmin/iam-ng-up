import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HomeLoginComponent } from './pages/home-login/home-login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'login', component: HomeLoginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
