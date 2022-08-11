import {Component, OnInit} from '@angular/core';
import {Feedback} from "../model/feedback";

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent implements OnInit {
  list_feedback: Feedback[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
