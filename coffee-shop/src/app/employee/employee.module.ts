import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailEmployeeComponent} from './detail-employee/detail-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {RouterModule} from '@angular/router';
import {EmployeeRoutingModule} from './employee-routing.module';
import {ShareModule} from '../share/share.module';
import {ToastrModule} from "ngx-toastr";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DetailEmployeeComponent,
    EditEmployeeComponent,
    ListEmployeeComponent,
    AddEmployeeComponent],
  exports: [
    EditEmployeeComponent,
    AddEmployeeComponent,
    ListEmployeeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    EmployeeRoutingModule,
    ShareModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ReactiveFormsModule
  ]
})
export class EmployeeModule {
}
