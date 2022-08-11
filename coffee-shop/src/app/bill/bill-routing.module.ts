import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListBillComponent} from './list-bill/list-bill.component';
import {DetailBillComponent} from './detail-bill/detail-bill.component';
import {IncomeBillComponent} from './income-bill/income-bill.component';


const routes: Routes = [
  {
    path: 'bill',
    component: ListBillComponent
  },
  {
    path: 'bill/detail:id',
    component: DetailBillComponent
  },
  {
    path: 'bill/income',
    component: IncomeBillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
