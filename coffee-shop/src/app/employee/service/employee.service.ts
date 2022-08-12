import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IEmployeeDto} from "../dto/i-employee-dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URL_EMPLOYEE = "http://localhost:8080/rest";
  constructor(private httpClient:HttpClient) { }

  findById(id: number): Observable<IEmployeeDto>{
    return this.httpClient.get<IEmployeeDto>(this.URL_EMPLOYEE+'/employee/find/'+ id);
  }
}
