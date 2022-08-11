import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetailAccountServiceService {
  private URL_DETAIL_ACCOUNT_EMPLOYEE = 'http://localhost:8080/api/productBlock/';
  private URL_UPDATE_ACCOUNT_EMPLOYEE = 'http://localhost:8080/api/account/updateAccountEmployee/';
  private URL_CHANGE_PASSWORD = 'http://localhost:8080/api/account/editPassword/';

  constructor(private httpClient: HttpClient) {
  }

  // findAccountEmployeeById(id: number): Observable<>
}
