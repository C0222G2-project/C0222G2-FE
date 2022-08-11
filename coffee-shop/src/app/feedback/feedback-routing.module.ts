import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListFeedbackComponent} from './list-feedback/list-feedback.component';


const routes: Routes = [
  {
    path: 'feedback',
    component: ListFeedbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
