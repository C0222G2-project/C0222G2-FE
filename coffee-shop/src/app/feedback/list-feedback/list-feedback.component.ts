import {Component, OnInit} from '@angular/core';
import {Feedback} from "../model/feedback";
import {FeedbackService} from "../service/feedback.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent implements OnInit {
  listFeedback: Feedback[] = [];
  searchForm: FormGroup;
  totalPages: number;
  number: number;
  countTotalPages: number[];
  rating: number;
  code: string;
  creator: string;
  email: string;
  content: string;
  feedbackDate: string;
  image: string;
  id: number;

  constructor(private feedbackService: FeedbackService) {
  }

  ngOnInit(): void {
    this.getAllFeedback(0, '', '1000-01-01', '8000-01-01',);
    this.searchForm = new FormGroup({
      searchName: new FormControl('',[Validators.required]),
      searchStartDate: new FormControl('',[Validators.required]),
      searchEndDate: new FormControl('',[Validators.required])
    });
  }

  getSearch() {
    if(this.searchForm.valid){
      const name = this.searchForm.value.searchName;
      const startDate = this.searchForm.value.searchStartDate;
      const endDate = this.searchForm.value.searchEndDate;
      this.getAllFeedback(0, name, startDate, endDate);
    }

  }

  getAllFeedback(page: number, searchName, searchStartDate, searchEndDate) {

    this.feedbackService.getAllFeedback(page, searchName, searchStartDate, searchEndDate)
      .subscribe((data: Feedback[]) => {
        if (data != null) {
          // @ts-ignore
          this.listFeedback = data.content;
        } else {
          this.listFeedback = [];
        }
        if (this.listFeedback.length !== 0) {
          // @ts-ignore
          this.totalPages = data.totalPages;
          // @ts-ignore
          this.countTotalPages = new Array(data.totalPages);
          // @ts-ignore
          this.number = data.number;
        }
      });
  }

  showDetail(feedback: Feedback) {
    this.id= feedback.id
    this.code = feedback.code;
    this.creator = feedback.creator;
    this.email = feedback.email;
    this.content = feedback.content;
    this.rating = feedback.rating;
    this.feedbackDate = feedback.feedbackDate;
    this.image = feedback.image;
  }

  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getAllFeedback(numberPage, '', '1000-01-01', '8000-01-01');
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getAllFeedback(numberPage, '', '1000-01-01', '8000-01-01');
    }
  }

  goItem(i: number) {
    this.getAllFeedback(i, '', '1000-01-01', '8000-01-01');
  }

}
