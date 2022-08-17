import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from "../model/bill";
import {CookieService} from "../../login/service/cookie.service";


@Injectable({
  providedIn: 'root'
})

export class BillService {
  private URL_BILL = 'http://localhost:8080/rest/bill';
  private URL_DISH = 'http://localhost:3000/dish';
  private URL_EMPLOYEE = 'http://localhost:3000/employee';
  private URL_COFFEE_TABLE = 'http://localhost:3000/coffeeTable';
  private header = 'Bearer ' + this.cookieService.getCookie('jwToken');

  constructor(private httpClient: HttpClient,private cookieService: CookieService) {
  }

  getAllBill(searchCode: string, searchDate: string, page: number): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(this.URL_BILL + "?page=" + page + "&searchParamCode=" + searchCode + "&searchParamDate=" + searchDate, {headers: new HttpHeaders({'authorization': this.header})}).pipe();
  }

  findById(id: number): Observable<Bill> {
    return this.httpClient.get<Bill>(this.URL_BILL + '/' + id, {headers: new HttpHeaders({'authorization': this.header})}).pipe();
  }


}
