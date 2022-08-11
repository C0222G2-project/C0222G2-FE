import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeLoginComponent} from './home-login/home-login.component';
import {ForgotPasswordLoginComponent} from './forgot-password-login/forgot-password-login.component';
import {ChangePasswordLoginComponent} from './change-password-login/change-password-login.component';


const routes: Routes = [
  {
    path: 'login',
    component: HomeLoginComponent
  },
  {
    path: 'login/forgot',
    component: ForgotPasswordLoginComponent
  },
  {
    path: 'login/change',
    component: ChangePasswordLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
