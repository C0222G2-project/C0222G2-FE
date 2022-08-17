import {Component, OnInit} from '@angular/core';
import {PaymentOrderService} from "../service/payment-order-service";
import {CoffeeTable} from "../model/CoffeeTable";
import {Payment} from "../model/Payment";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";

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
  totalNeedPayment: number = 0;
  idTable: number;
  codeTable: any;
  size: number;
  tableOn: boolean = false;
  tableOff: boolean = true;
  constructor(private paymentOrderService: PaymentOrderService,
              private toast: ToastrService,
              private title: Title) {
    this.title.setTitle("Thanh Toán");
  }


  ngOnInit(): void {
    this.getAllPage(this.numberPage);
    this.reset();

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
      this.numberPage = data.number;
      // @ts-ignore
      this.size = data.size;

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
    }, error => {
    }, () => {
      this.idTable = id;
      this.displayTotal();

    })
  }

  private displayTotal() {
    this.paymentOrderService.payment(this.idTable).subscribe(p => {
      this.totalNeedPayment = p.total;
    }, error => {
    }, () => {
      //@ts-ignore
      this.ngOnInit();
    })
  }

  // thanh toán dựa vào id bàn
  payment() {
    if (this.idTable == null) {
      this.toast.warning("Vui lòng chọn món để được tính tiền!!")
    } else {
      this.paymentOrderService.payment(this.idTable).subscribe(p => {
        this.totalNeedPayment = p.total;
      }, error => {
      }, () => {
        //@ts-ignore
        $('#modalPayment').modal('show');
        this.ngOnInit();
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
    console.log(this.totalNeedPayment);
    this.paymentOrderService.createBill(idTable).subscribe(value => {
    }, error => {
    }, () => {
      //@ts-ignore
      $('#modalPayment').modal('hide');
      this.totalNeedPayment = 0;
      this.getListById(this.idTable);
      this.idTable = null;
      this.ngOnInit()
      this.toast.success("Thành công!!", "Thanh toán")
    });
  }


}
