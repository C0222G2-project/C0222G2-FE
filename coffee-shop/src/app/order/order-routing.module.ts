import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddOrderComponent} from './add-order/add-order.component';
import {ListOrderManagementComponent} from './list-order-management/list-order-management.component';
import { ScreenOrderComponent } from './screen-order/screen-order.component';
import {UserGuard} from "../login/authguard/user.guard";


const routes: Routes = [
  {
    path: 'order/screen',
    component: ScreenOrderComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'order/add',
    component: AddOrderComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'order/list',
    component: ListOrderManagementComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'order/screen/:id',
    component: ScreenOrderComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
