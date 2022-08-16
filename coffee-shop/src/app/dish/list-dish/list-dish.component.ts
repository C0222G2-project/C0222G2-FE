import {Component, OnInit} from '@angular/core';
import {Dish} from "../../model/dish";
import {DishService} from "../../service/dish.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-dish',
  templateUrl: './list-dish.component.html',
  styleUrls: ['./list-dish.component.css']
})
export class ListDishComponent implements OnInit {
  dishArray: Dish[] = [];
  p: number = 0;
  searchForm: FormGroup;
  totalPages: number;
  countTotalPages: number[];
  number: number;


  constructor(private dishService: DishService) {

  }

  ngOnInit(): void {
    this.getDishPage(0);
    this.createSearchForm();
  }

  getDishPage(page: number) {
    this.dishService.getDishPage(page).subscribe((data: Dish[]) => {
      // @ts-ignore
      this.totalPages = data.totalPages;
      // @ts-ignore
      this.countTotalPages = new Array(data.totalPages);
      // @ts-ignore
      this.number = data.number;
      // @ts-ignore
      this.dishArray = data.content;
    }, error => {
      console.log(error);
    });
  }
  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getDishPage(numberPage);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getDishPage(numberPage);
    }
  }
  goItem(i: number) {
    this.getDishPage(i);
  }


  deleteDishById(id: number) {
    this.dishService.deleteDishById(id).subscribe(value => {
    }, error => {
    }, () => {
      // @ts-ignore
      $('#exampleModal' + id).modal('hide');
      this.getDishPage(0);
    });
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      dishName: new FormControl(),
      dishCode: new FormControl(),
      dishPrice: new FormControl(),
      dishTypeId: new FormControl()
    });
  }

  searchDish() {
    this.dishService.getDishPageSearch(this.searchForm.value).subscribe((value: Dish[]) => {
      // @ts-ignore
      this.dishArray = value.content;

    });
  }

}
