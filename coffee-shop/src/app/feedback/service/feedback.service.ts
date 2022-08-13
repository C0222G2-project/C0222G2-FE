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
    let creator;
    let startDate;
    let endDate;
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
      '&searchStartDate=' + startDate + '&searchEndDate=' + endDate + '&sort=' + sortRating);
  }


  /**
   * Creator : LuanTV
   * Date : 13/08/2022
   * Function : find by id
   *
   * @param id
   */
  findFeedbackById(id: number): Observable<Feedback> {
    return this.httpClient.get(this.URL_FEEDBACK + '/' +id);
  }
}
