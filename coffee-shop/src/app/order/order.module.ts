import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {AddOrderComponent} from './add-order/add-order.component';
import {ListOrderManagementComponent} from './list-order-management/list-order-management.component';
import {RouterModule} from '@angular/router';
import {ShareModule} from '../share/share.module';
import { ScreenOrderComponent } from './screen-order/screen-order.component';


@NgModule({
  declarations: [
    AddOrderComponent,
    ListOrderManagementComponent,
    ScreenOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrderRoutingModule,
    ShareModule
  ]
})
export class OrderModule { }
