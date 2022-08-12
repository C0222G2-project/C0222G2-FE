import { Component, OnInit } from '@angular/core';
import {IEmployeeDto} from "../dto/i-employee-dto";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employeeList: IEmployeeDto[] = [];

  constructor() {}

  ngOnInit(): void {
  }

}
