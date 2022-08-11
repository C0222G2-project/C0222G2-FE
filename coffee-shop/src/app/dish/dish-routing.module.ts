import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListDishComponent} from './list-dish/list-dish.component';
import {EditDishComponent} from './edit-dish/edit-dish.component';
import {AddDishComponent} from './add-dish/add-dish.component';


const routes: Routes = [
  {
    path: 'dish',
    component: ListDishComponent
  },
  {
    path: 'dish/edit:id',
    component: EditDishComponent
  },
  {
    path: 'dish/add',
    component: AddDishComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule { }
