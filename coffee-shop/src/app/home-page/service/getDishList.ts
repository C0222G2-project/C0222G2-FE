import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DishWithTimeCreate} from '../model/DishWithTimeCreate';

@Injectable({
  providedIn: 'root'
})
export class GetDishList {
  private readonly API_URL = 'http://localhost:8080/dish-order';

  constructor(private httpClient: HttpClient) { }

  get5DishNewest():Observable<DishWithTimeCreate[]>{
    return this.httpClient.get<DishWithTimeCreate[]>(this.API_URL+ "/newest")
  }

  get5DishMostOrder():Observable<DishWithTimeCreate[]>{
    return this.httpClient.get<DishWithTimeCreate[]>(this.API_URL+ "/most-order")
  }
}
