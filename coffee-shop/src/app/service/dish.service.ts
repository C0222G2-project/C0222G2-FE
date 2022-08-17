import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dish} from "../model/dish";
import {CookieService} from "../login/service/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private header = 'Bearer ' + this.cookieService.getCookie('jwToken');

  private URL_DISH = "http://localhost:8080/dish"

  constructor(private httpClient: HttpClient, private cookieService:CookieService) {
  }

  getDishPage(page: number): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(this.URL_DISH + "/searchDish?page=" + page, {headers: new HttpHeaders({'authorization': this.header})}).pipe();
  }


  deleteDishById(id: number): Observable<Dish> {
    // @ts-ignore
    return this.httpClient.patch<Dish>(this.URL_DISH + "/delete/" + id)
  }

  getDishPageSearch(searchObj: any): Observable<Dish[]> {
    let dishName = searchObj.dishName;
    let dishCode = searchObj.dishCode;
    let dishPrice = searchObj.dishPrice;
    let dishTypeId = searchObj.dishTypeId;
    return this.httpClient.get<Dish[]>(this.URL_DISH + "/searchDish"+"?dishName="+dishName+"&dishCode="+dishCode+"&dishPrice="+dishPrice+"&dishTypeId="+dishTypeId, {headers: new HttpHeaders({'authorization': this.header})}).pipe();
  }

  getDishType(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(this.URL_DISH + "/getDishTypePage" );
  }


}
