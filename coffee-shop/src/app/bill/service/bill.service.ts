import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from "../model/bill";


@Injectable({
  providedIn: 'root'
})

export class BillService {
  private URL_BILL = 'http://localhost:8080/rest/bill';
  private URL_DISH = 'http://localhost:3000/dish';
  private URL_EMPLOYEE = 'http://localhost:3000/employee';
  private URL_COFFEE_TABLE = 'http://localhost:3000/coffeeTable';

  constructor(private httpClient: HttpClient) {
  }

  getAllBill(searchCode: string, searchDate: string, page: number): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(this.URL_BILL + "?page=" + page + "&searchParamCode=" + searchCode + "&searchParamDate=" + searchDate);
  }

  findById(id: number): Observable<Bill> {
    return this.httpClient.get<Bill>(this.URL_BILL + '/' + id);
  }


}
