import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Feedback} from "../model/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private URL_FEEDBACK = "http://localhost:8080/feedback"

  constructor(private httpClient: HttpClient) {
  }


  getAllFeedback(page: number, searchName, searchStartDate, searchEndDate) {
    let creator;
    let startDate;
    let endDate;
    let rating;
    if (searchName == null) {
      creator = '';
    } else {
      creator = searchName;
    }
    if (searchStartDate == null) {
      startDate = '1000-01-01';
    } else {
      startDate = searchStartDate;
    }
    if (searchEndDate == null) {
      endDate = '8000-01-01';
    } else {
      endDate = searchEndDate;
    }

    return this.httpClient.get<Feedback[]>(this.URL_FEEDBACK + '/page?page=' + page + '&searchCreator=' + creator +
      '&searchStartDate=' + startDate + '&searchEndDate=' + endDate);
  }

  findFeedbackById(idEdit: number): Observable<Feedback> {
    return this.httpClient.get(this.URL_FEEDBACK + '/' +idEdit);
  }
}
