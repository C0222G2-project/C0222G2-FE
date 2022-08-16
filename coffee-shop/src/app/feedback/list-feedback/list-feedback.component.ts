import {Component, OnInit} from '@angular/core';
import {Feedback} from "../model/feedback";
import {FeedbackService} from "../service/feedback.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Title} from '@angular/platform-browser';

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
  size: number;
  countTotalPages: number[];
  rating: number;
  code: string;
  creator: string;
  email: string;
  content: string;
  feedbackDate: string;
  image: string;
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  sortRating: string = 'DESC';
  checkSortOrNot: boolean = false;


  constructor(private feedbackService: FeedbackService) {
  }

  ngOnInit(): void {
    this.getAllFeedback(0, this.name, this.startDate, this.endDate, 'ASC');
    this.searchForm = new FormGroup({
      searchName: new FormControl(''),
      searchStartDate: new FormControl(''),
      searchEndDate: new FormControl('')
    });
  }


  /**
   * Creator : LuanTV
   * Date : 13/08/2022
   * Function : page, search, sort
   *
   * @param page
   * @param searchName
   * @param searchStartDate
   * @param searchEndDate
   * @param sortRating
   */
  getAllFeedback(page: number, searchName, searchStartDate, searchEndDate, sortRating) {
    this.feedbackService.getAllFeedback(page, searchName, searchStartDate, searchEndDate,sortRating)
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
          // @ts-ignore
          this.size = data.size
        }
      });
  }


  /**
   *  Creator : LuanTV
   * Date : 13/08/2022
   * Function : search
   */
  getSearch() {
    if (this.searchForm.value.searchName === '') {
      this.name = ''
    } else {
      this.name = this.searchForm.value.searchName;
    }
    if (this.searchForm.value.searchStartDate === '') {
      this.startDate = '1000-01-01'
    } else {
      this.startDate = this.searchForm.value.searchStartDate;
    }
    if (this.searchForm.value.searchEndDate === '') {
      this.endDate = '8000-01-01'
    } else {
      this.endDate = this.searchForm.value.searchEndDate;
    }
    this.getAllFeedback(0, this.name, this.startDate, this.endDate, 'ASC');
  }


  /**
   * Creator : LuanTV
   * Date : 13/08/2022
   * Function : find by id
   *
   * @param id
   */
  showDetail(id: number) {
    this.feedbackService.findFeedbackById(id).subscribe(value => {
      this.id = id;
      this.code = value.code;
      this.creator = value.creator;
      this.email = value.email;
      this.content = value.content;
      this.rating = value.rating;
      this.feedbackDate = value.feedbackDate;
      this.image = value.image;
    })
  }


  /**
   * Creator : LuanTV
   * Date : 13/08/2022
   * Function : sort
   */
  getSort() {
    this.checkSortOrNot = !this.checkSortOrNot;
    if(this.checkSortOrNot){
      this.getAllFeedback(0, this.name, this.startDate, this.endDate, this.sortRating)
    }else {
      this.getAllFeedback(0, this.name, this.startDate, this.endDate, 'ASC')
    }
  }


  /**
   * Creator : LuanTV
   * Date : 13/08/2022
   * Function : page switch button
   */
  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      if (this.checkSortOrNot) {
        this.getAllFeedback(numberPage, this.name, this.startDate, this.endDate, this.sortRating)
      } else {
        this.getAllFeedback(numberPage, this.name, this.startDate, this.endDate,'ASC');
      }
    }
  }


  /**
   * Creator : LuanTV
   * Date : 13/08/2022
   * Function : page switch button
   */
  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      if (this.checkSortOrNot) {
        this.getAllFeedback(numberPage, this.name, this.startDate, this.endDate, this.sortRating)
      } else {
        this.getAllFeedback(numberPage, this.name, this.startDate, this.endDate,'ASC');
      }
    }
  }


  /**
   * Creator : LuanTV
   * Date : 13/08/2022
   * Function : page switch button
   */
  goItem(i: number) {
    if (this.checkSortOrNot) {
      this.getAllFeedback(i, this.name, this.startDate, this.endDate, this.sortRating)
    } else {
      this.getAllFeedback(i, this.name, this.startDate, this.endDate,'ASC');
    }
  }

}
