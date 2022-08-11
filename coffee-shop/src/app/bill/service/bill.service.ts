import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from "../model/bill";


@Injectable({
  providedIn: 'root'
})

export class BillService {
  private URL_BILL = 'http://localhost:8080/rest/bill';

  constructor(private httpClient: HttpClient) {
  }

  getAllBill(searchBillCode: String, searchBillDate: Date, page: number):Observable<Bill[]>{
    return this.httpClient.get<Bill[]>(this.URL_BILL + '/page?page='+ page + "searchCode" + searchBillCode + "searchDate" + searchBillDate)
  }

  findById(id: number): Observable<Bill> {
    return this.httpClient.get<Bill>(this.URL_BILL + '/' + id);
  }


}
