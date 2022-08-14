import { Component, ElementRef, OnChanges, OnInit, QueryList, SimpleChange, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../model/dish';
import { DishType } from '../model/dish-type';
import { NotificationService } from '../service/notification.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-screen-order',
  templateUrl: './screen-order.component.html',
  styleUrls: ['./screen-order.component.css']
})
export class ScreenOrderComponent implements OnInit, OnChanges {
  @ViewChild('quantity') inputQuantity;
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  formCheckBox: FormGroup;
  hideMenu:boolean = false;
  checkButton:boolean = true;
  checkButtonOption: boolean = false;
  dishes: Dish[] = [];
  dishTypes: DishType[] = [];
  dish: Dish;
  orderMenu = [];
  checkOrderMenu = [];
  checkBox: boolean = false;
  selectCheckBox: any;
  totalPages: number[];
  presentPage = 1;
  hasNext: false;
  hasPrevious: false;
  date: Date;

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, 
    private db: AngularFireDatabaseModule, private notificationService: NotificationService, 
    ) { 
      // this.notificationService.requestPermission();
      this.date = new Date();
  }



  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getAllDish(0);
    this.getAllDishType();
    this.formCheckBox = new FormGroup({
      selectCheckBox: new FormArray([])
    });
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
  getAllDish(page){
    this.orderService.getAllDish(page).subscribe(dishes => {
       this.dishes = dishes.content;
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
  addIntoMenuOrder(param1, param2){
    const order = {
        id: '', quantity: param1, dish: this.dish, bill: '', employee: '', coffeeTable: param2, status: false, counterTimer: ''
    };
    this.orderMenu.push(order);
    this.inputQuantity.nativeElement.value = '';
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
      console.log(this.selectCheckBox);
      
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
    this.selectCheckBox  = this.formCheckBox.controls['selectCheckBox'] as FormArray;
    let index: number;
    let containerRemoveIndex = [];
    for(let i=0; i< this.selectCheckBox.value.length; i++){
      let removeIndex = this.selectCheckBox.value.indexOf(this.selectCheckBox.value[i]);
      index = this.selectCheckBox.value[i];
      this.orderMenu.splice(index, 1);
      // console.log(index);
      // console.log(this.selectCheckBox.value[i]);
      console.log(this.selectCheckBox.value[i]);
      console.log(removeIndex);
      containerRemoveIndex.push(removeIndex);
      console.log(containerRemoveIndex);
      // this.selectCheckBox.removeAt(removeIndex);
    }
    for(let i of containerRemoveIndex){
      this.selectCheckBox.removeAt(i);
    }
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
      this.getAllDish(numberPage);
    }
  }

  goNext() {
    let numberPage: number = this.presentPage;
    if (numberPage < this.totalPages.length - 1) {
      numberPage++;
      this.getAllDish(numberPage);
    }
  }

  goItem(page: number) {
    this.getAllDish(page);
  }




  // displayTimer(timer): any{
  //     let timerString = '';
  //     let timerCountdown = timer;
  //     let minutes, seconds;
  //     let setTimer = setInterval(()=>{
  //           minutes = Math.floor(timerCountdown/60);
  //           seconds = Math.floor(timerCountdown%60);
  //           minutes = minutes < 10 ? '0' + minutes : minutes;
  //           seconds = seconds < 10 ? '0' + seconds : seconds;
  //           if(++timerCountdown>(60*5)){
  //             alert("Time's up");
  //             clearInterval(setTimer);
  //           }
  //       }, 1000);
  //   }

  // countTimer(): any{
  //   let timer = 1;
  //   let timerString;
  //   console.log(timerString +=this.displayTimer(timer));
    
  //   return timerString += this.displayTimer(timer);
  // }


}

