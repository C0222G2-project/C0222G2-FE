import {Component, OnInit} from '@angular/core';
import {IEmployeeDto} from "../dto/i-employee-dto";
import {EmployeeService} from "../service/employee.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

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
  sort: string = '';
  totalElement: number;
  checkSort: boolean = false;
  formSearch: FormGroup;

  constructor(private employeeService: EmployeeService, private toast: ToastrService) {
  }

  /**
   * /**
   * Create by TuyenTN
   * Date: 13/8/2022
   */

  ngOnInit(): void {
    this.getAllSearch(0, '', '', '','');
    this.searchEmployeeForm();
  }

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * method use get info all employee flow property match conditional in form search
   * @param pageCurrent
   * @param searchName
   * @param searchPhone
   * @param searchAccount
   * @param sort
   */
  getAllSearch(pageCurrent: number, searchName: string, searchPhone: string, searchAccount: string,sort: string) {
    this.employeeService.getAllEmployee(pageCurrent, searchName, searchPhone, searchAccount,sort).subscribe(data => {
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
        // @ts-ignore
        this.totalElement = data.totalElements;
      } else {
        this.employeeList = [];
      }
    })
  }

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * method use create search form
   */
  searchEmployeeForm() {
    this.formSearch = new FormGroup({
      nameForm: new FormControl(''),
      phoneForm: new FormControl(''),
      accountForm: new FormControl('')
    });
  }

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * Method use
   */
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
    if (!this.checkSort){
      this.getAllSearch(0, this.searchName, this.searchPhone, this.searchAccount,'');
    }else {
      this.getAllSearch(0, this.searchName, this.searchPhone, this.searchAccount,this.sort);
    }

  }

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * method use transmission object to modal
   * @param item
   */
  modalDelete(item: IEmployeeDto) {
    this.employee = item;
  }

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * Method use delete employee
   * @param id
   */
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(d => {
      // @ts-ignore
      this.toast.success('Delete success.', 'Delete employee', 300);
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
        this.toast.error('Delete failure.', 'Delete employee', 300);
      }
    })
  }

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * Method use back page previous
   */

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

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * Method use next page previous
   */
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

  /**
   * /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * Method use come page i
   * @param i
   */
  goItem(i: number) {
    if (this.checkSort){
      this.getAllSearch(i,this.searchName,this.searchPhone,this.searchAccount,this.sort);
    }else {
      this.getAllSearch(i,this.searchName,this.searchPhone,this.searchAccount,'');
    }

  }

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * Method use sort by name
   */
  sortByName() {
      this.checkSort= true;
      this.sort = 'name';
      this.getAllSearch(0,this.searchName,this.searchPhone,this.searchAccount,this.sort);
  }
  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * Method use sort by account
   */
  sortByAccount() {
    this.checkSort= true;
    this.sort = 'appUser';
    this.getAllSearch(0,this.searchName,this.searchPhone,this.searchAccount,this.sort);
  }
}
