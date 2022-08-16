import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dish} from "../dish/model/dish";

@Injectable({
  providedIn: 'root'
})
export class DishTypeService {
  private URL_DISH_TYPE = "http://localhost:8080/dishType"

  constructor(private httpClient: HttpClient) {
  }


  getDishTypePage(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(this.URL_DISH_TYPE + "/getDishTypePage");
  }
}
