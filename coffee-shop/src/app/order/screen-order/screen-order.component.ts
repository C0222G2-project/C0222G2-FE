import { NumberFormatStyle } from '@angular/common';
import { Component, ElementRef, OnChanges, OnInit, QueryList, SimpleChange, SimpleChanges, VERSION, ViewChild, ViewChildren } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Dish } from '../model/dish';
import { DishType } from '../model/dish-type';
import { NotificationOfCoffeStore } from '../model/notification';
import { Order } from '../model/order';
import { NotificationService } from '../service/notification.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-screen-order',
  templateUrl: './screen-order.component.html',
  styleUrls: ['./screen-order.component.css']
})
export class ScreenOrderComponent implements OnInit, OnChanges{
  @ViewChild('quantity') inputQuantity;
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  order: Order;
  dishId: number;
  formCheckBox: FormGroup;
  hideMenu:boolean = false;
  checkButton:boolean = true;
  checkButtonOption: boolean = false;
  notificationMessage: NotificationOfCoffeStore;
  dishes: Dish[] = [];
  dishTypes: any;
  dish: Dish;
  orderMenu = [];
  checkOrderMenu = [];
  messageUnread = [];
  checkBox: boolean = false;
  selectCheckBox: any;
  totalPages = [];
  totalMoney = 0;
  presentPage = 1;
  date: Date;

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private notificationService: NotificationService, 
    private toastr: ToastrService, private title : Title
    ) {
      this.formCheckBox = new FormGroup({
        selectCheckBox: new FormArray([])
      });
      this.title.setTitle("Gọi món");
      this.messageUnread = this.notificationService.keyArray;
      this.date = new Date();
      this.notificationBox();
      // this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      //   this.getDish(parseInt(paramMap.get('id')));
      //   const order = {
      //     quantity: 1,
      //     dish: this.dish,
      //     bill: 1,
      //     employee: 1,
      //     coffeeTable: {
      //       id: '1',
      //       code: 1,
      //       status: true
      //     }
      //   }
      //   this.orderMenu.push(order);
      // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formCheckBox = new FormGroup({
      selectCheckBox: new FormArray([])
    });
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.getAllDish(1, this.presentPage);
    this.getAllDishType();
  }



  /**
   *  Author: BinhPx
   *  Date: 11/08/2022
   *  This function to open and close menu
   *  when web site responsive which width is less than 930px
   */
  openMenuService(){
    if(this.checkButton){
      this.hideMenu = true;
      this.checkButton = false;
    }
    else{
      this.hideMenu = false;
      this.checkButton= true;
    }
  }

  /**
   *  Author: BinhPx
   *  Date: 11/08/2022
   *  This function to get all dish have when api return
   */

  getAllDish(id:number, page){
    this.dishId = id;
    this.orderService.redirect(id, page).subscribe(dishes => {
      // @ts-ignore
       this.dishes = dishes.content;
       // @ts-ignore
       this.totalPages = Array.from({length: dishes.totalPages}, (v,k)=> k+1);
    });
  }


  /**
   *  Author: BinhPx
   *  Date: 11/08/2022
   *  This function to get all dish type have when api return
   */
  getAllDishType(){
    this.orderService.getAllDishType().subscribe(dishTypes => {
       // @ts-ignore
      this.dishTypes = dishTypes.content;
    });
  }


  /**
   *  Author: BinhPx
   *  Date: 11/08/2022
   *  This function use id to get dish then show result to function addIntoMenuOrder()
   */
  getDish(id: number){
      this.orderService.getDish(id).subscribe(dish => {
         this.dish = dish;
      })
  }


  /**
   *  Author: BinhPx
   *  Date: 11/08/2022
   *  This function do insert dish into menu order
   */
  addIntoMenuOrder(quantity, tableCode){
    let flag = false;
    let id = 0;
    const order = {
       quantity: Number(quantity), 
       dish: this.dish, 
       bill: 1, 
       employee: 1, 
       coffeeTable: {
          id: '1',
          code: tableCode,
          status: true
       }
    };
    if(quantity == null || quantity > 10 || quantity == ''){
      this.toastr.error('Bạn chưa nhập số lượng hoặc số lượng lớn 9','Có lỗi từ khách hàng',{timeOut: 2000, progressBar: true});
      this.inputQuantity.nativeElement.value = '';
    }
    else{
      if(this.orderMenu.length == 0){
        this.orderMenu.push(order);
        this.totalMoney = 0;
        this.orderMenu.forEach(items => {
          this.totalMoney+= items.dish.price * items.quantity;
        });
      }
      else{
        for(let i = 0; i < this.orderMenu.length; i++){
          if(this.orderMenu[i].dish.id == this.dish.id){
            id = i;
            flag = true;
            break;
          }
          else{
            flag = false;
          }
        }
        if(flag){
            for(let i =0; i < this.orderMenu.length; i++){
              if(i == id){
                let temp = this.orderMenu[i].quantity;
                this.orderMenu[i].quantity = Number(quantity) + Number(temp);
                this.totalMoney = 0;
                this.orderMenu.forEach(items => {
                this.totalMoney+= items.dish.price * items.quantity});
              }
            }
            flag = false;
        }
        else{
          this.orderMenu.push(order);
          this.totalMoney = 0;
          this.orderMenu.forEach(items => {
            this.totalMoney+= items.dish.price * items.quantity
          });
          flag = false;
        }
      }
    }
    this.inputQuantity.nativeElement.value = '';
  }

    /**
   *  Author: BinhPx
   *  Date: 14/08/2022
   *  This function create order have param is table code, employee code, bill code, dish code
   */
    createOrder(){
      this.orderMenu.forEach(items => {
        this.order = {
          quantity: items.quantity,
          dish: this.dish,
          bill: {},
          employee: {},
          coffeeTable: items.coffeeTable,
        }
        this.orderService.createOrder(this.order).subscribe();
      });
      this.toastr.success("Bạn đã order thành công", "Thành công", {timeOut: 2000, progressBar: true});
      this.orderMenu = [];
      this.displayTimer(0);
    }



   /**
   *  Author: BinhPx
   *  Date: 12/08/2022
   *  This function check event check box and push it into selectCheckBox
   */
  onCheckBoxChange(event){
    this.selectCheckBox  = this.formCheckBox.controls['selectCheckBox'] as FormArray;
    if(event.target.checked){
      this.selectCheckBox.push(new FormControl(event.target.value));
    }
    else{
      const index = this.selectCheckBox.controls.findIndex(i => i.value === event.target.value);
      this.selectCheckBox.removeAt(index);
    }
  }


   /**
   *  Author: BinhPx
   *  Date: 12/08/2022
   *  This function use to delete dish in to list dish order
   */
  deleteDish(){
    const selectCheckBox  = this.formCheckBox.controls['selectCheckBox'] as FormArray;
    
    for(let i of selectCheckBox.value){
      this.orderMenu.splice(Number(i), 1);
    }
      this.totalMoney = 0;
      this.orderMenu.forEach(items => {
        this.totalMoney+= items.dish.price * items.quantity;
      });
    this.formCheckBox = new FormGroup({
      selectCheckBox: new FormArray([])
    });
    this.uncheckAll();
  }

  uncheckAll() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }


  /**
   *  Author: BinhPx
   *  Date: 13/08/2022
   *  This function use to send messager
   */
  sendNotification(titleContent: string, tableCoffe: string, requestConent: string){
    this.notificationService.getTokenFromFcm();
    this.toastr.success('Bạn đã gữi yêu cầu thành công','Thành công',{timeOut: 2000, progressBar: true})
    this.notificationService.sendNotification(titleContent, tableCoffe, requestConent);
  }


  /**
   *  Author: BinhPX
   *  Date: 13/08/2022
   *  Function navigate to another page menu dish
   */
  goPrevious() {
    let numberPage: number = this.presentPage;
    if (numberPage > 0) {
      numberPage--;
      this.getAllDish(this.dishId, numberPage);
      this.presentPage = numberPage;
    }
  }

  goNext() {
    let numberPage: number = this.presentPage;
    
    if (numberPage < this.totalPages.length) {
      numberPage++;
      this.getAllDish(this.dishId, numberPage);
      this.presentPage = numberPage;
    }
  }

  goItem(page: number) {
    this.presentPage = page;
    this.getAllDish(this.dishId, page);
  }




  name = "Angular" + VERSION.major;
  displayTimer(timer){
      let timerString: HTMLElement = document.getElementById('timerCountdown') as HTMLElement;
      let timerCountdown = timer;
      let minutes, seconds;
      let setTimer = setInterval(()=>{
            minutes = Math.floor(timerCountdown/60);
            seconds = Math.floor(timerCountdown%60);
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            if(++timerCountdown>(60*1)){
              this.toastr.error('Thời gian chờ của bạn đã tới hạn, yêu cầu sẽ tự động gữi đi đến quản lý','',{timeOut: 2000, progressBar: true});
              this.orderMenu = [];
              clearInterval(setTimer);
            }
            timerString.innerHTML = minutes + ':' + seconds;
        }, 1000);
  }



  /**
   * Func progress message
   */
  notificationBox(){
    // console.log(this.messageUnread);
  }

}

