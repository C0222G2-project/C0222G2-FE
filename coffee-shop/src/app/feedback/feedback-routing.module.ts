import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListFeedbackComponent} from './list-feedback/list-feedback.component';
import {CreateFeedbackComponent} from "./create-feedback/create-feedback.component";


const routes: Routes = [
  {
    path: 'feedback',
    component: ListFeedbackComponent
  },
  {
    path: 'createFeedback',
    component: CreateFeedbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {
}
