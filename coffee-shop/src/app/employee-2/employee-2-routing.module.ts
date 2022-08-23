import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from '../login/authguard/admin.guard';
import {ListEmployeeTestComponent} from './list-employee-test/list-employee-test.component';
import {DetailEmployeeTestComponent} from './detail-employee-test/detail-employee-test.component';
import {AddEmployeeTestComponent} from './add-employee-test/add-employee-test.component';
import {EditEmployeeTestComponent} from './edit-employee-test/edit-employee-test.component';


const routes: Routes = [
  {
    path: 'employee-test',
    component: ListEmployeeTestComponent,
  },
  {
    path: 'employee-test/detail/:id',
    component: DetailEmployeeTestComponent,
  },
  {
    path: 'employee-test/add',
    component: AddEmployeeTestComponent,
  },
  {
    path: 'employee-test/edit/:id',
    component: EditEmployeeTestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Employee2RoutingModule {
}
