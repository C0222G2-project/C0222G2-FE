import {Component, OnInit} from '@angular/core';
import {Bill} from "../model/bill";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BillService} from "../service/bill.service";
import {ToastrService} from "ngx-toastr";
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';


@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.css']
})
export class ListBillComponent implements OnInit {
  bills: Bill[] = [];
  searchForm: FormGroup;
  p: number = 0;
  totalPages: number;
  number: number;
  countTotalPages: number[];
  code: string;
  creationDate: string;
  billDate: Bill = {};
  billFormReactive: FormGroup;

  constructor(private billService: BillService,
              private toastrService: ToastrService) {

    this.billFormReactive = new FormGroup({
      creationDate: new FormControl()
    })
  }

  ngOnInit(): void {
    this.getAllBill(0, this.code , this.creationDate);
    this.searchForm = new FormGroup({
      searchCode: new FormControl(''),
      searchDate: new FormControl(''),

    });
  }

  /**
   * Created by: HauLT
   * Date created: 12/08/2022
   * function: Get bill list, with pagination,search by bill number and creation date
   *
   * @param page
   * @param searchCode
   * @param searchDate
   */

  getAllBill(page: number, searchCode: string, searchDate: string) {
    this.billService.getAllBill(page, searchCode, searchDate).subscribe((data: Bill[]) => {
      if (data != null){
        // @ts-ignore
        this.bills = data.content
      }else {
        this.bills = [];
      }
      if (this.bills.length !== 0) {
        // @ts-ignore
        this.totalPages = data.totalPages;
        // @ts-ignore
        this.countTotalPages = new Array(data.totalPages);
        // @ts-ignore
        this.number = data.number;
        // @ts-ignore
        this.size = data.size
      }
    });
  }

  /**
   * Created by: HauLT
   * Date created: 12/08/2022
   * function: Get bill list, with pagination,search by bill number and creation date
   *
   */

  getFormSearch() {
    if (this.searchForm.value.searchCode ===''){
      this.code = '';
    }else {
      this.code = this.searchForm.value.searchCode
    }
    if (this.searchForm.value.searchDate ===''){
      this.creationDate = '';
    }else {
      this.creationDate = this.searchForm.value.searchDate
    }
    this.getAllBill(0, this.code, this.creationDate)
  }


  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getAllBill(numberPage, "", "");
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getAllBill(numberPage, "", "");
    }
  }

  goItem(i: number) {
    this.getAllBill(i, "", "");
  }






  // HauLT-PDF

  generatePDF() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      let imgWidth = 590;
      let imgHeight = canvas.height * imgWidth / canvas.width*0.7;
      const contentDataURL = canvas.toDataURL('image/png')
      // @ts-ignore
      let doc = new jsPDF('p', 'pt', 'a4');
      let position = 0;
      doc.addImage(contentDataURL, 'a4', 0, position, imgWidth, imgHeight)
      doc.save('newPDF.pdf');
      this.toastrService.success("Xuất Hóa Đơn Thành Công!", );
    });
  }
}
