import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DishTypeService {
  private URL_DISH="http://localhost:8080/dishType"
  constructor() { }
}
