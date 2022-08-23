import { Component, OnInit } from '@angular/core';
import {EmployeeTestService} from '../service/employee-test.service';
import {IEmployeeDto} from '../../employee/model/employee/i-employee-dto';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list-employee-test',
  templateUrl: './list-employee-test.component.html',
  styleUrls: ['./list-employee-test.component.css']
})
export class ListEmployeeTestComponent implements OnInit {
  employeeList: IEmployeeDto[] = [];
  employee: IEmployeeDto = {};
  searchName: string='';
  searchPhone: string='';
  searchAccount: string='';
  pageCurrent: number = 0;
  totalPages: number;
  arrayPage: number[];
  size: number;
  sort: string = '';
  totalElement: number;
  checkSort: boolean = false;
  formSearch: FormGroup;


  constructor(private employeeService : EmployeeTestService) { }

  ngOnInit(): void {
    this.getAllSearch(0, '', '', '','');
    this.searchEmployeeForm();
  }

  getAllSearch(pageCurrent: number, searchName: string, searchPhone: string, searchAccount: string,sort: string) {
    this.employeeService.getAllEmployee(pageCurrent, searchName, searchPhone, searchAccount,sort).subscribe(data => {
      if (data != null) {
        // @ts-ignore
        this.employeeList = data.content;
        console.log(this.employeeList);
        // @ts-ignore
        this.totalPages = data.totalPages;
        // @ts-ignore
        this.arrayPage = new Array(data.totalPages);
        // @ts-ignore
        this.pageCurrent = data.number;
        // @ts-ignore
        this.size = data.size;
        // @ts-ignore
        this.totalElement = data.totalElements;
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
    if (this.formSearch.value.nameForm != null) {
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
    if (!this.checkSort){
      this.getAllSearch(0, this.searchName, this.searchPhone, this.searchAccount,'');
    }else {
      this.getAllSearch(0, this.searchName, this.searchPhone, this.searchAccount,this.sort);
    }

  }

  modalDelete(item: IEmployeeDto) {
    this.employee = item;
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(d => {
      // @ts-ignore
      this.toast.success('Xóa thành công!!!.', 'Xóa Nhân Viên', 600);
      if(this.checkSort){
        if(this.totalElement-1 == this.size*(this.totalPages-1)){
          this.getAllSearch(this.pageCurrent-1,this.searchName,this.searchPhone,this.searchAccount,this.sort);
        }else {
          this.getAllSearch(this.pageCurrent,this.searchName,this.searchPhone,this.searchAccount,this.sort);
        }
      }else {
        if(this.totalElement-1 == this.size*(this.totalPages-1)){
          this.getAllSearch(this.pageCurrent-1,this.searchName,this.searchPhone,this.searchAccount,'');
        }else {
          this.getAllSearch(this.pageCurrent,this.searchName,this.searchPhone,this.searchAccount,'');
        }
      }

    }, error => {
      if (error.status == 404) {
        // @ts-ignore
        this.toast.error('Xóa thất bại.', 'Xóa Nhân Viên', 600);
      }
    })
  }

  goPrevious() {
    let numberPage: number = this.pageCurrent;
    if (numberPage > 0 ) {
      numberPage--;
      if (!this.checkSort){
        this.getAllSearch(numberPage,this.searchName,this.searchPhone,this.searchAccount,'');
      }else {
        this.getAllSearch(numberPage,this.searchName,this.searchPhone,this.searchAccount,this.sort);
      }
    }
  }

  goNext() {
    let numberPage: number = this.pageCurrent;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      if (!this.checkSort){
        this.getAllSearch(numberPage,this.searchName,this.searchPhone,this.searchAccount,'');
      }else {
        this.getAllSearch(numberPage,this.searchName,this.searchPhone,this.searchAccount,this.sort);
      }
    }
  }

  goItem(i: number) {
    if (this.checkSort){
      this.getAllSearch(i,this.searchName,this.searchPhone,this.searchAccount,this.sort);
    }else {
      this.getAllSearch(i,this.searchName,this.searchPhone,this.searchAccount,'');
    }

  }


  sortByName() {
    this.checkSort= true;
    this.sort = 'name';
    this.getAllSearch(0,this.searchName,this.searchPhone,this.searchAccount,this.sort);
  }


  sortByAccount() {
    this.checkSort= true;
    this.sort = 'appUser';
    this.getAllSearch(0,this.searchName,this.searchPhone,this.searchAccount,this.sort);
  }
}
