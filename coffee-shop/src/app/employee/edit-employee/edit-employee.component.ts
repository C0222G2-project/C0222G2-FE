import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from "../../model/employee/employee";
import {AppUser} from "../../model/account/app-user";
import {EmployeeService} from "../service/employee.service";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Position} from "../../model/employee/position";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employee: Employee = {};
  appUser: AppUser[] = [];
  position: Position[] = [];

  constructor(private employeeService: EmployeeService, private router: Router,
              private activate: ActivatedRoute,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getParamId();
  }

  getParamId() {
    this.activate.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      // tslint:disable-next-line:radix
      this.employeeService.findByIdEdit(parseInt(id)).subscribe(data => {
        // @ts-ignore
        this.employee = data;
      });
    });
    this.getAllUser();
    this.getAllPosition();
    this.getEmployeeFormUpdate();
  }

  getAllPosition() {
    this.employeeService.getAllPosition().subscribe(data => {
      // @ts-ignore
      this.position = data;
    });
  }

  getAllUser() {
    this.employeeService.getAllUser().subscribe(data => {
      console.log(data)
      // @ts-ignore
      this.appUser = data;
    });
  }

  getEmployeeFormUpdate() {
    this.employeeForm = new FormGroup({
      id: new FormControl(this.employee.id),
      image: new FormControl(this.employee.image,[Validators.required]),
      username: new FormControl(this.employee.appUser,[Validators.required]),
      name: new FormControl('', [Validators.required,Validators.pattern("^([A-Z][^A-Z0-9\\s]+)(\\s[A-Z][^A-Z0-9\\s]+)*$")],),
      address: new FormControl(this.employee.address, [Validators.required]),
      gender: new FormControl(this.employee.gender),
      email: new FormControl(this.employee.email,[Validators.required,Validators.email]),
      phoneNumber: new FormControl(this.employee.phoneNumber, [Validators.required, Validators.pattern('^(09|\\(84\\)\\+9)[01]\\d{7}$')]),
      birthday: new FormControl('',[Validators.pattern("^(?:(?:31(/|-|.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(/|-|.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(/|-|.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(/|-|.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$")]),
      salary: new FormControl(this.employee.salary, [Validators.required, this.validateCustomSalary]),
      position: new FormControl(this.employee.position)
    });
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employeeForm.value).subscribe(data => {
      this.employee = data;
    }, error => {
    }, () => {

      this.router.navigateByUrl('/employee').then(value => this.toast.success('chỉnh sửa thành công'));
    });
  }

  compareUserName(c1: AppUser, c2: AppUser): boolean {
    if ((c1 && c2) != undefined) {
      return c1.id === c2.id;
    }
  }

  comparePosition(c1: Position, c2: Position): boolean {
    if ((c1 && c2) != undefined) {
      return c1.id === c2.id;
    }
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get image() {
    return this.employeeForm.get('image');
  }

  get address() {
    return this.employeeForm.get('address');
  }

  get phoneNumber() {
    return this.employeeForm.get('phoneNumber');
  }

  get birthday() {
    return this.employeeForm.get('birthday');
  }

  get salary() {
    return this.employeeForm.get('salary');
  }
  get email() {
    return this.employeeForm.get('email');
  }
  validateCustomSalary(salary: AbstractControl) {
    let value = salary.value;
    if(value % 100000 != 0 ) {
      return {'format': true}
    }
    return null;
  }



}
