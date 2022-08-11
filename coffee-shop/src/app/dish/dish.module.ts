import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishRoutingModule } from './dish-routing.module';
import {AddDishComponent} from './add-dish/add-dish.component';
import {EditDishComponent} from './edit-dish/edit-dish.component';
import {ListDishComponent} from './list-dish/list-dish.component';
import {RouterModule} from '@angular/router';
import {ShareModule} from '../share/share.module';


@NgModule({
  declarations: [
    AddDishComponent,
    EditDishComponent,
    ListDishComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DishRoutingModule,
    ShareModule
  ]
})
export class DishModule { }
