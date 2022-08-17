import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../model/dish';
import { DishType } from '../model/dish-type';
import { Order } from '../model/order';
import { CookieService } from 'src/app/login/service/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private urlGetDishes = 'http://localhost:8080/dish/getDishFindIdDishType';
  private urlGetDish = 'http://localhost:8080/dish/findById';
  private urlGetDishType = 'http://localhost:8080/dishType/getDishTypePage';
  private urlCreateOrder = 'http://localhost:8080/dish-order/create-dishOrder';
  private header = 'Bearer' + this.cookieService.getCookie('jwToken');

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllDish(id:number): Observable<Dish[]>{
    return this.http.get<Dish[]>(this.urlGetDishes+`/${id}`, {headers: new HttpHeaders({'authorization':this.header})});
  }

  redirect(id:number, page): Observable<Dish[]>{
    return this.http.get<Dish[]>(this.urlGetDishes+`/${id}`+`?page=${page-1}`, {headers: new HttpHeaders({'authorization':this.header})});
  }

  getAllDishType(): Observable<DishType[]>{
    return this.http.get<DishType[]>(this.urlGetDishType, {headers: new HttpHeaders({'authorization':this.header})});
  }

  getDish(id: number): Observable<Dish>{
    return this.http.get<Dish>(this.urlGetDish+`/${id}`, {headers: new HttpHeaders({'authorization':this.header})})
  }

  createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.urlCreateOrder, order, {headers: new HttpHeaders({'authorization':this.header})})
  }

}
