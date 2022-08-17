import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Bill} from "../model/bill";
import {FormControl, FormGroup} from "@angular/forms";
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
  searchBillCode: string;
  searchBillDate: string;

  constructor(private billService: BillService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllBill("", "", 0);
    this.formSearch();
  }

  getAllBill(searchCode: string, searchDate: string, page: number) {
    // @ts-ignore
    this.billService.getAllBill(searchCode, searchDate, page).subscribe(data => {
      // @ts-ignore
      this.totalPages = data.totalPages;
      // @ts-ignore
      console.log(data.content)
      // @ts-ignore
      this.countTotalPages = new Array(data.totalPages);
      // @ts-ignore
      this.number = data.number;
      // @ts-ignore
      this.bills = data.content
    }, error => {
      console.log(error);
    });
    this.formSearch();
  }

  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getAllBill("", "", numberPage);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getAllBill("", "", numberPage);
    }
  }

  goItem(i: number) {
    this.getAllBill("", "", i);
  }


  formSearch() {
    this.searchForm = new FormGroup({
      searchBillCode: new FormControl(""),
      searchBillDate: new FormControl("")
    });
  }

  getFormSearch() {
    let searchCode = this.searchForm.value.searchBillCode;
    let searchDate = this.searchForm.value.searchBillDate;
    if (searchCode == null) {
      searchCode = "";
    }
    if (searchDate == null) {
      searchDate = "";
    }
    this.getAllBill(searchCode, searchDate, this.number);
  }


  // HauLT-PDF

  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 300;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      // @ts-ignore
      let doc = new jsPDF('p', 'pt', 'a4');
      var position = 0;
      doc.addImage(contentDataURL, 'a4', 0, position, imgWidth, imgHeight)
      doc.save('newPDF.pdf');
    });
  }

  showDowloaadPDF() {
    this.toastrService.success("Xuất Thành Công!", );
  }

}
