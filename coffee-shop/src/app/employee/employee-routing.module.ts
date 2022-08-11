import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {DetailEmployeeComponent} from './detail-employee/detail-employee.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';


const routes: Routes = [
  {
    path: 'employee',
    component: ListEmployeeComponent
  },
  {
    path: 'employee/detail:id',
    component: DetailEmployeeComponent
  },
  {
    path: 'employee/add',
    component: AddEmployeeComponent,
  },
  {
    path: 'employee/edit:id',
    component: EditEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
