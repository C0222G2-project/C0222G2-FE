import {Component, OnInit} from '@angular/core';
import {PaymentOrderService} from "../service/payment-order-service";
import {CoffeeTable} from "../model/CoffeeTable";
import {Payment} from "../model/Payment";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-order-management',
  templateUrl: './list-order-management.component.html',
  styleUrls: ['./list-order-management.component.css']
})
export class ListOrderManagementComponent implements OnInit {
  numberPage: number = 0;
  coffeeTableList: CoffeeTable[] = [];
  totalPage: number;
  countTotalPage: number[];
  listOrderInTable: CoffeeTable[];
  totalNeedPayment: number;
  idTable: number;
  codeTable: any;

  constructor(private paymentOrderService: PaymentOrderService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllPage(this.numberPage);
  }

  // lấy list bàn và phân trang bàn
  private getAllPage(numberPage: number) {
    this.paymentOrderService.getCoffeeTablePage(numberPage).subscribe(data => {
      // @ts-ignore
      this.coffeeTableList = data.content;
      // @ts-ignore
      this.totalPage = data.totalPages;
      // @ts-ignore
      this.countTotalPage = new Array(data.totalPages);
      // @ts-ignore
      this.numberPage = data.number
    }, error => {
    }, () => {
      console.log(this.coffeeTableList)
    })
  }

  previousPage() {
    let number: number = this.numberPage;
    if (number > 0) {
      number--;
      this.getAllPage(number)
    }
  }

  nextPage() {
    let number: number = this.numberPage;
    console.log(number)
    if (number < this.totalPage) {
      number++;
      this.getAllPage(number);
    }
  }

  item(i: number) {
    this.getAllPage(i);
  }

  // lấy danh sách món trên từng bàn theo id bàn
  getListById(id: number) {
    this.paymentOrderService.getListTableById(id).subscribe(d => {
      this.listOrderInTable = d;
      this.codeTable = d[0].code;
      console.log(d)
    }, error => {
    }, () => {
      this.idTable = id;

    })
  }

  // thanh toán dựa vào id bàn
  payment() {
    if (this.idTable == null) {
      this.toast.warning("Vui lòng chọn món để được tính tiền!!")
    } else {
      this.paymentOrderService.payment(this.idTable).subscribe(p => {
        this.totalNeedPayment = p.total;
        console.log(this.totalNeedPayment);
      }, error => {
      }, () => {
        //@ts-ignore
        $('#modalPayment').modal('show');
      })
    }
  }


  reset() {
    this.paymentOrderService.getListTableById(this.idTable).subscribe(data => {
      this.listOrderInTable = data;
    }, error => {
    }, () => {
    })
  }

  addBill(idTable: number) {
    this.paymentOrderService.createBill(idTable).subscribe(value => {
    }, error => {
    }, () => {
      this.ngOnInit();
      //@ts-ignore
      $('#modalPayment').modal('hide');
    });
  }
}
