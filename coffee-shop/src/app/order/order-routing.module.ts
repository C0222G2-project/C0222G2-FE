import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddOrderComponent} from './add-order/add-order.component';
import {ListOrderManagementComponent} from './list-order-management/list-order-management.component';


const routes: Routes = [
  {
    path: 'order/add',
    component: AddOrderComponent,
  },
  {
    path: 'order/list',
    component: ListOrderManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
