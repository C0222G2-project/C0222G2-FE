import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import {ShareModule} from '../../share/share.module';


@NgModule({
  declarations: [ChatScreenComponent],
  exports: [
    ChatScreenComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ShareModule
  ]
})
export class ChatModule { }
