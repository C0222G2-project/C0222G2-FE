import { Component, OnInit } from '@angular/core';
import {IEmployeeDto} from "../dto/i-employee-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EmployeeService} from "../service/employee.service";

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit {
  employeeDetailDTO: IEmployeeDto ={};
  constructor(private employeeService:EmployeeService, private activatedRoute:ActivatedRoute,private toast: ToastrService,
              private router:Router) { }

  /**
   * Create by TuyenTN
   * Date: 13/8/2022
   *
   */
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
          const id = parseInt(paramMap.get('id'));
          this.employeeService.findById(id).subscribe(data=>{
            this.employeeDetailDTO = data;
          },error => {
              if (error.status == 404) {
                this.toast.error('Không tìm thấy nhân viên này','Thất bại!!!');
                this.router.navigateByUrl('employee');
              }
            },
            ()=>{})
      });
  }

}
