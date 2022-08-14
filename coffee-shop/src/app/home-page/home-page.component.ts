import { Component, OnInit } from '@angular/core';
import {GetDishList} from './service/getDishList';
import {DishWithAmountOrder} from './model/DishWithAmountOrder';
import {DishWithTimeCreate} from './model/DishWithTimeCreate';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  dishMostOrderList: DishWithAmountOrder[];
  distNewestList: DishWithTimeCreate[];
  checkData: boolean = true;

  constructor(private getDishList: GetDishList,
              private mess: ToastrService) { }

  ngOnInit(): void {
    this.get5DishMostOrder();
    this.get5DishNewest();
  }



  get5DishMostOrder(){
    this.getDishList.get5DishMostOrder().subscribe( data => {
      this.dishMostOrderList = data;
      console.log(data)
    }, error => {
      this.checkData = false;
      this.mess.error('Server have some problem, try reload page','ERROR')
    })
  }

  get5DishNewest(){
    this.getDishList.get5DishNewest().subscribe( data => {
      this.distNewestList = data;
      console.log(data)
    }, error => {
      this.checkData = false;
      this.mess.error('Server have some problem, try reload page','ERROR')
    })
  }

}

