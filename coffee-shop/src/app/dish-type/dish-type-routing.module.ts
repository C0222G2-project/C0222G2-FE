import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListDishTypeComponent} from './list-dish-type/list-dish-type.component';
import {EditDishTypeComponent} from './edit-dish-type/edit-dish-type.component';
import {AddDishTypeComponent} from './add-dish-type/add-dish-type.component';


const routes: Routes = [
  {
    path: 'dish-type',
    component: ListDishTypeComponent
  },
  {
    path: 'dish-type/edit:id',
    component: EditDishTypeComponent
  },
  {
    path: 'dish-type/add',
    component: AddDishTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishTypeRoutingModule { }
