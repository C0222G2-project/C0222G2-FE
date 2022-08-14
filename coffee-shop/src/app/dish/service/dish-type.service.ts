import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DishType} from "../model/dish-type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DishTypeService {

  private API_URL = "http://localhost:8080/dishType"


  constructor(private http: HttpClient) {
  }

  getAll(): Observable<DishType[]> {
    return this.http.get<DishType[]>(this.API_URL + '/list_dish_type'  );
  }
}
