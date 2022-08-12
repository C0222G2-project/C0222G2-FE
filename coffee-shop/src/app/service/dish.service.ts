import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dish} from "../model/dish";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private URL_DISH = "http://localhost:8080/dish"

  constructor(private httpClient: HttpClient) {
  }

  getDishPage(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(this.URL_DISH + "/searchDish");
  }

  getDishById() {

  }

  searchDish
  ///delete/{id}
  ///findById/{id}

}
