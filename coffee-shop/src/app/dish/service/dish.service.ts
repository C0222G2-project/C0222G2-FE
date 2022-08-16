import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dish} from "../model/dish";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private API_URL = 'http://localhost:8080/dish';

  constructor(private http: HttpClient) {

  }

  saveDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.API_URL + '/create', dish);
  }

  findById(id: number): Observable<Dish> {
    return this.http.get<Dish>(this.API_URL + `/${id}`);
  }

  editDish(id: number, dish: Dish): Observable<Dish> {
    return this.http.patch<Dish>(this.API_URL + "/edit"+`/${id}`, dish);
  }

  getAll(): Observable<Dish[]>{
    return this.http.get<Dish[]>(this.API_URL+"/dish_list");
  }
}
