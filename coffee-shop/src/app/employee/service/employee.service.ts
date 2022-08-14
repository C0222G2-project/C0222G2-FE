import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmployeeDto} from "../../model/employee/i-employee-dto";
import {Employee} from "../../model/employee/employee";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URL_EMPLOYEE = "http://localhost:8080/rest";
  constructor(private httpClient:HttpClient) { }

  /**
   * /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * Method use connect find by id on API
   * @param id
   */
  findById(id: number): Observable<IEmployeeDto>{
    return this.httpClient.get<IEmployeeDto>(this.URL_EMPLOYEE+'/employee/find/'+ id);
  }

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * Method use connect get list info flow condition on API
   * @param page
   * @param searchName
   * @param searchPhone
   * @param searchAccount
   * @param sortName
   */
  getAllEmployee(page:number,searchName:string,searchPhone:string,searchAccount:string,sortName: string): Observable<IEmployeeDto[]>{
    return this.httpClient.get<IEmployeeDto[]>
    (this.URL_EMPLOYEE+'/employee/page?page='+page+'&searchName='+searchName+'&searchPhone='+
      searchPhone+'&searchAccount='+searchAccount+'&sort='+sortName);
  }

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   * Method use connect delete employee by id on API
   * @param id
   */
  deleteEmployee(id:number): Observable<string>{
    return this.httpClient.delete<string>(this.URL_EMPLOYEE+'/employee/delete/'+id);
  }

  saveEmployee(employee) {
    return this.httpClient.post(this.URL_EMPLOYEE + '/employee/create', employee);
  }

  findByIdEdit(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(this.URL_EMPLOYEE + '/employee/findId/' + id);
  }

  updateEmployee(employee) {
    return this.httpClient.patch(this.URL_EMPLOYEE + '/employee/edit', employee);
  }

  getAllPosition() {
    return this.httpClient.get(this.URL_EMPLOYEE + '/position');
  }

  getAllUser() {
    return this.httpClient.get(this.URL_EMPLOYEE + '/user');
  }

}
