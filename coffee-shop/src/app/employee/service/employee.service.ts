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


  constructor(private httpClient: HttpClient) {
  }

  findById(id: number): Observable<IEmployeeDto>{
    return this.httpClient.get<IEmployeeDto>(this.URL_EMPLOYEE+'/employee/find/'+ id);
  }
  getAllEmployee(page:number,searchName:string,searchPhone:string,searchAccount:string): Observable<IEmployeeDto[]>{
    return this.httpClient.get<IEmployeeDto[]>
    (this.URL_EMPLOYEE+'/employee/list?page='+page+'&searchName='+searchName+'&searchPhone='+searchPhone+'&searchAccount='+searchAccount);
  }
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
