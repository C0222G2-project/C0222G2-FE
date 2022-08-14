import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../model/dish';
import { DishType } from '../model/dish-type';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private urlGetDishes = 'http://localhost:8080/dish/getDishPage';
  private urlGetDish = 'http://localhost:8080/dish/findById';
  private urlGetDishType = 'http://localhost:8080/dishType/getDishTypePage';
  private urlCreateOrder = 'http://localhost:8080/dish-order/create-dishOrder';

  constructor(private http: HttpClient) { }

  getAllDish(pageNumber): Observable<Dish[]>{
    return this.http.get<Dish[]>(this.urlGetDishes+`?page=${pageNumber}`);
  }

  getAllDishType(): Observable<DishType[]>{
    return this.http.get<DishType[]>(this.urlGetDishType);
  }

  getDish(id: number): Observable<Dish>{
    return this.http.get<Dish>(this.urlGetDish+`/${id}`)
  }

  createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.urlCreateOrder, order)
  }

}
