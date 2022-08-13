import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {IEmployeeDto} from "../../model/employee/i-employee-dto";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employeeList: IEmployeeDto[] = [];
  employee: IEmployeeDto = {};
  searchName: string='';
  searchPhone: string='';
  searchAccount: string='';
  pageCurrent: number = 0;
  totalPages: number;
  arrayPage: number[];
  size: number;
  formSearch: FormGroup;

  constructor(private employeeService: EmployeeService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllSearch(0, '', '', '');
    this.searchEmployeeForm();
  }


  getAllSearch(pageCurrent: number, searchName: string, searchPhone: string, searchAccount: string) {
    this.employeeService.getAllEmployee(pageCurrent, searchName, searchPhone, searchAccount).subscribe(data => {
      if (data != null) {
        // @ts-ignore
        this.employeeList = data.content;
        // @ts-ignore
        this.totalPages = data.totalPages;
        // @ts-ignore
        this.arrayPage = new Array(data.totalPages);
        // @ts-ignore
        this.pageCurrent = data.number;
        // @ts-ignore
        this.size = data.size;
      } else {
        this.employeeList = [];
      }
    })
  }

  searchEmployeeForm() {
    this.formSearch = new FormGroup({
      nameForm: new FormControl(''),
      phoneForm: new FormControl(''),
      accountForm: new FormControl('')
    });
  }
  searchEmployeeFormByProperty() {
    if (this.formSearch.value.nameForm == null) {
      this.searchName = '';
    } else {
      this.searchName = this.formSearch.value.nameForm;
    }
    if (this.formSearch.value.phoneForm == null) {
      this.searchPhone = '';
    } else {
      this.searchPhone = this.formSearch.value.phoneForm;
    }
    if (this.formSearch.value.accountForm == null) {
      this.searchAccount = '';
    } else {
      this.searchAccount = this.formSearch.value.accountForm;
    }
    this.getAllSearch(0, this.searchName, this.searchPhone, this.searchAccount);
  }

  modalDelete(item: IEmployeeDto) {
    this.employee = item;
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(d => {
      // @ts-ignore
      this.toast.success('Delete success.', 'Delete employee', 1000);
      this.ngOnInit();
    }, error => {
      if (error.status == 404) {
        // @ts-ignore
        this.toast.error('Delete failure.', 'Delete employee', 1000);
      }
    })
  }

  goPrevious() {
    let numberPage: number = this.pageCurrent;
    if (numberPage > 0 ) {
      numberPage--;
      this.getAllSearch(numberPage,this.searchName,this.searchPhone,this.searchAccount);
    }
  }

  goNext() {
    let numberPage: number = this.pageCurrent;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getAllSearch(numberPage,this.searchName,this.searchPhone,this.searchAccount);
    }
  }

  goItem(i: number) {
    this.getAllSearch(i,this.searchName,this.searchPhone,this.searchAccount);
  }


}
