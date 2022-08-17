import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CoffeeTable} from "../model/CoffeeTable";
import {Payment} from "../model/Payment";
import {CookieService} from "../../login/service/cookie.service";

@Injectable({
  providedIn: "root"
})

export class PaymentOrderService {

  private header = "Bearer " + this.cookieService.getCookie('jwToken');
  private URL_GET_COFFEE_TABLE_PAGE = "http://localhost:8080/api/payment/page";
  private URL_GET_LIST_BY_ID = "http://localhost:8080/api/payment/list";
  private URL_PAYMENT = "http://localhost:8080/api/payment/total";
  private URL_CREATE_BILL = "http://localhost:8080/api/payment/in-bill";

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) {
  }

  getCoffeeTablePage(page: number): Observable<CoffeeTable[]> {
    return this.httpClient.get<CoffeeTable[]>(this.URL_GET_COFFEE_TABLE_PAGE + `?page=${page}`, {headers: new HttpHeaders({'authorization': this.header})});
  }

  getListTableById(id: number): Observable<CoffeeTable[]> {
    return this.httpClient.get<CoffeeTable[]>(this.URL_GET_LIST_BY_ID + `/${id}`, {headers: new HttpHeaders({'authorization': this.header})});
  }

  payment(id: number): Observable<Payment> {
    return this.httpClient.get<Payment>(this.URL_PAYMENT + '/' + id, {headers: new HttpHeaders({'authorization': this.header})});
  }

  createBill(idTable: number): Observable<any> {
    return this.httpClient.get(this.URL_CREATE_BILL + '?idTable=' + idTable, {headers: new HttpHeaders({'authorization': this.header})});
  }
}
