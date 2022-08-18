import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order } from '../model/order';
import { CookieService } from 'src/app/login/service/cookie.service';
import { Dish } from 'src/app/dish/model/dish';
import { DishType } from 'src/app/dish/model/dish-type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private urlGetDishes = 'http://localhost:8080/dish/getDishFindIdDishType';
  private urlGetDish = 'http://localhost:8080/dish/findById';
  private urlGetDishType = 'http://localhost:8080/dishType/getDishTypeList';
  private urlCreateOrder = 'http://localhost:8080/dish-order/create-dishOrder';
  private header = 'Bearer ' + this.cookieService.getCookie('jwToken');

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllDish(id:number): Observable<Dish[]>{
    return this.http.get<Dish[]>(this.urlGetDishes+`/${id}`, {headers: new HttpHeaders({'authorization':this.header})}).pipe();
  }

  redirect(id:number, page): Observable<Dish[]>{
    return this.http.get<Dish[]>(this.urlGetDishes+`/${id}`+`?page=${page-1}`, {headers: new HttpHeaders({'authorization':this.header})}).pipe();
  }

  getAllDishType(): Observable<DishType[]>{
    return this.http.get<DishType[]>(this.urlGetDishType, {headers: new HttpHeaders({'authorization':this.header})}).pipe();
  }

  getDish(id: number): Observable<Dish>{
    return this.http.get<Dish>(this.urlGetDish+`/${id}`, {headers: new HttpHeaders({'authorization':this.header})}).pipe()
  }

  createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.urlCreateOrder, order, {headers: new HttpHeaders({'authorization':this.header})})
  }

}
