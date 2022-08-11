import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { HomeLoginComponent } from './home-login/home-login.component';
import { ForgotPasswordLoginComponent } from './forgot-password-login/forgot-password-login.component';
import { ChangePasswordLoginComponent } from './change-password-login/change-password-login.component';
import {RouterModule} from '@angular/router';
import {ShareModule} from '../share/share.module';


@NgModule({
  declarations: [
    HomeLoginComponent,
    ForgotPasswordLoginComponent,
    ChangePasswordLoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    LoginRoutingModule,
    ShareModule
  ]
})
export class LoginModule { }
