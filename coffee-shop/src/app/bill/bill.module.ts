import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import {ListBillComponent} from './list-bill/list-bill.component';
import { DetailBillComponent } from './detail-bill/detail-bill.component';
import {RouterModule} from '@angular/router';
import { IncomeBillComponent } from './income-bill/income-bill.component';
import {ShareModule} from '../share/share.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListBillComponent,
    DetailBillComponent,
    IncomeBillComponent
  ],
  exports: [
    ListBillComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BillRoutingModule,
    ShareModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    // NgxPaginationModule,

  ]
})
export class BillModule { }
