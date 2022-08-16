import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from "../model/bill";


@Injectable({
  providedIn: 'root'
})

export class BillService {
  private URL_BILL = 'http://localhost:8080/rest/bill';
  bill: Bill

  constructor(private httpClient: HttpClient) {
  }

  getAllBill(page: number, searchCode, searchDate) {
    let searchBillCode;
    let searchBillDate
    if (searchCode == null){
      searchBillCode = '';
    }else {
      searchBillCode = searchCode;
    }
    if (searchDate == null){
      searchBillDate = '';
    }else {
      searchBillDate = searchDate
    }
    return this.httpClient.get<Bill[]>(this.URL_BILL + "?page=" + page + "&searchParamCode=" + searchBillCode + "&searchParamDate=" + searchBillDate);
  }

  findById(id: number): Observable<Bill> {
    return this.httpClient.get<Bill>(this.URL_BILL + '/' + id);
  }


}
