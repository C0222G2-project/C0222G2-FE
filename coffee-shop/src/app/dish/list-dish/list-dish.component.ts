import { Component, OnInit } from '@angular/core';
import {Dish} from "../model/dish";
import {DishService} from "../service/dish.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-dish',
  templateUrl: './list-dish.component.html',
  styleUrls: ['./list-dish.component.css']
})
export class ListDishComponent implements OnInit {

  dishList: Dish[] = [];

  constructor(private dishService: DishService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.dishService.getAll().subscribe(data => {
      console.log(data);
      this.dishList = data;
    });
  }

}
