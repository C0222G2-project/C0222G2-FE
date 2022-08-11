import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import {ListFeedbackComponent} from './list-feedback/list-feedback.component';
import {RouterModule} from '@angular/router';
import {ShareModule} from '../share/share.module';


@NgModule({
  declarations: [
    ListFeedbackComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FeedbackRoutingModule,
    ShareModule
  ]
})
export class FeedbackModule { }
