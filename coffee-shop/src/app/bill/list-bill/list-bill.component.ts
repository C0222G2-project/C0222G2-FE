import { Component, OnInit } from '@angular/core';
import {Bill} from "../model/bill";
import {FormControl, FormGroup} from "@angular/forms";
import {BillService} from "../service/bill.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.css']
})
export class ListBillComponent implements OnInit {

  bills: Bill[] = [];
  searchForm: FormGroup;
  p: number;
  totalPages: number;
  number: number;
  countTotalPages: number[];

  constructor(private billService: BillService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

  getAllBill(searchBillCode: string, searchBillDate: Date, page: number){
    this.billService.getAllBill(searchBillCode, searchBillDate, page).subscribe((data:Bill[]) =>{
      // @ts-ignore
      this.totalPages = data.totalPages;
      // @ts-ignore
      this.countTotalPages = new Array(data.totalPages);
      // @ts-ignore
      this.number = data.number;
      // @ts-ignore
      this.loHangs = data.content;
    })
  }

  goPrevious() {
    let numberPages: number = this.number;
    if (numberPages > 0) {
      numberPages--;
      // @ts-ignore
      this.getAllBill("",numberPages);
    }
  }

  goNext() {
    let numberPages: number = this.number;
    if (numberPages < this.totalPages - 1) {
      numberPages++;
      // @ts-ignore
      this.getAllBill("",numberPages);
    }
  }

  goItem(i: number) {
    // @ts-ignore
    this.getAllBill("",i);
  }

  formSearch(){
    this.searchForm = new FormGroup({
      searchBillCode: new FormControl(""),
      searchBillDate: new FormControl("")
    });
  }

  getFormSearch() {

    let searchCode = this.searchForm.value.searchBillCode;
    let searchDate = this.searchForm.value.searchBillDate;
    if (searchCode== null || searchDate == null){
      searchCode="";
      searchDate="";
    }
    // @ts-ignore
    this.getAllBill(searchCode,0)
    // @ts-ignore
    this.getAllBill(searchDate,0)
  }

}
