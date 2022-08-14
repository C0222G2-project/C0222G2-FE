import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListBillComponent} from './list-bill/list-bill.component';
import {DetailBillComponent} from './detail-bill/detail-bill.component';


const routes: Routes = [
  {
    path: 'bill',
    component: ListBillComponent
  },
  {
    path: 'bill/detail',
    component: DetailBillComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
