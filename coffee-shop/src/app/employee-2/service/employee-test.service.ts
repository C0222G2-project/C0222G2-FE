import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEmployeeDto} from '../../employee/model/employee/i-employee-dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTestService {
  private URL_EMPLOYEE = "http://localhost:8080/employee/test";
  constructor(private httpClient: HttpClient) { }

  getAllEmployee(page: number, searchName: string, searchPhone: string, searchAccount: string, sortName: string): Observable<IEmployeeDto[]> {
    return this.httpClient.get<IEmployeeDto[]>
    (this.URL_EMPLOYEE + '/page?page=' + page + '&searchName=' + searchName + '&searchPhone=' +
      searchPhone + '&searchAccount=' + searchAccount + '&sort=' + sortName);
  }

  deleteEmployee(id: number): Observable<string> {
    return this.httpClient.delete<string>(this.URL_EMPLOYEE + '/employee/delete/' + id);
  }
}
