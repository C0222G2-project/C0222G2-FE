import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import {ListBillComponent} from './list-bill/list-bill.component';
import { DetailBillComponent } from './detail-bill/detail-bill.component';
import {RouterModule} from '@angular/router';
import { IncomeBillComponent } from './income-bill/income-bill.component';
import {ShareModule} from '../share/share.module';


@NgModule({
  declarations: [
    ListBillComponent,
    DetailBillComponent,
    IncomeBillComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BillRoutingModule,
    ShareModule
  ]
})
export class BillModule { }
