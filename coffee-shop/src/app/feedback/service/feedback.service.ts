import {Injectable} from '@angular/core';
import {Feedback} from "../model/feedback";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private URL_FEEDBACK = "http://localhost:8080/feedback";
  feedback: Feedback;

  constructor(private httpClient: HttpClient) {
  }

  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.httpClient.post<Feedback>(this.URL_FEEDBACK + '/create', feedback);
  }
}
