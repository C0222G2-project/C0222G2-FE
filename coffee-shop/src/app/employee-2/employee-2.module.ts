import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Employee2RoutingModule } from './employee-2-routing.module';
import { ListEmployeeTestComponent } from './list-employee-test/list-employee-test.component';
import { AddEmployeeTestComponent } from './add-employee-test/add-employee-test.component';
import { DetailEmployeeTestComponent } from './detail-employee-test/detail-employee-test.component';
import { EditEmployeeTestComponent } from './edit-employee-test/edit-employee-test.component';
import {ShareModule} from '../share/share.module';


@NgModule({
  declarations: [
    ListEmployeeTestComponent,
    AddEmployeeTestComponent,
    DetailEmployeeTestComponent,
    EditEmployeeTestComponent
  ],
  imports: [
    CommonModule,
    Employee2RoutingModule,
    ShareModule,
  ]
})
export class Employee2Module { }
