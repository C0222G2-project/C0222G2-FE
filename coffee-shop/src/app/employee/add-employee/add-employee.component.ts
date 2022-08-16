import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {formatDate} from "@angular/common";
import {EmployeeService} from "../service/employee.service";
import {Employee} from "../model/employee/employee";
import {AppUser} from "../model/account/app-user";
import {Position} from "../model/employee/position";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeFormCreate: FormGroup;
  employee: Employee = {};
  position: Position[] = [];
  imgSrc: any;
  isLoading: Boolean = false;

  private selectedImage: any = null;

  constructor(private employeeService: EmployeeService, private router: Router, private storage: AngularFireStorage,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllPosition();
  }

  getEmployeeForm() {
    // @ts-ignore
    this.employeeFormCreate = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6),,Validators.maxLength(30),
        Validators.pattern("^[A-Za-z][a-zA-Z0-9 @]{1,}$")]),
      image: new FormControl('', [Validators.required,Validators.maxLength(255)]),
      name: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(30),Validators.pattern("^([A-Z][^A-Z0-9\\s]+)(\\s[A-Z][^A-Z0-9\\s]+)*$")],),
      email: new FormControl('', [Validators.required, Validators.email,Validators.minLength(6),,Validators.maxLength(50),]),
      address: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(255),]),
      gender: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(09|\\(84\\)\\+9)[01]\\d{7}$')]),
      birthday: new FormControl('',[this.checkInputBirthday,this.checkAge16,Validators.pattern("^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$")]),
      salary: new FormControl('', [Validators.required, this.validateCustomSalary,Validators.max(100000000)]),
      position: new FormControl('')
    });
  }

  getAllPosition() {
    this.employeeService.getAllPosition().subscribe(data => {
      // @ts-ignore
      this.position = data;
      this.getEmployeeForm();
    });
  }

  createEmployee() {
    this.toggleLoading();
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRel = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRel.getDownloadURL().subscribe((url) => {
          this.employeeFormCreate.patchValue({image: url});
          const appUser: AppUser = {
            userName: this.employeeFormCreate.value.username
          }
          this.employeeFormCreate.value.username.trim();
          this.employeeFormCreate.value.address.trim();
          this.employeeFormCreate.value.salary.trim();
          const employee: Employee = this.employeeFormCreate.value;
          employee.appUser = appUser;
          if (this.employeeFormCreate.valid) {
            this.employeeService.saveEmployee(employee).subscribe(value => {
              this.router.navigateByUrl('/employee').then(() => {
                this.toast.success('thêm mới thành công', 'Thông báo');
              })
            }, err => {
              console.log(err)
              if (err.error.field == "appUser") {
                if (err.error.defaultMessage == "userNameExists") {
                  this.employeeFormCreate.controls.username.setErrors({'userNameExists': true});
                }
              }
              if (err.error.field == "phoneNumber") {
                if (err.error.defaultMessage == "phoneNumberExists") {
                  this.employeeFormCreate.controls.phoneNumber.setErrors({'phoneNumberExists': true});
                }
              }
            })
          }else {
            this.toast.warning(' Dữ liệu bạn nhập đang bị lỗi hoặc bạn chưa nhập đủ dữ liệu!', 'Thông báo!!!');
          }

        })
      })
    ).subscribe();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (o: any) => this.imgSrc = o.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      document.getElementById('img').style.display = 'block';
    } else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }
  toggleLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyy-hh:mm:ss', 'en-US');
  }

  get username() {
    return this.employeeFormCreate.get('username');
  }

  get name() {
    return this.employeeFormCreate.get('name');
  }

  get email() {
    return this.employeeFormCreate.get('email');
  }

  get address() {
    return this.employeeFormCreate.get('address');
  }

  get image() {
    return this.employeeFormCreate.get('image');
  }

  get phoneNumber() {
    return this.employeeFormCreate.get('phoneNumber');
  }

  get birthday() {
    return this.employeeFormCreate.get('birthday');
  }

  get salary() {
    return this.employeeFormCreate.get('salary');
  }

  checkAge16(birthday: AbstractControl) {
    const value = birthday.value.substr(0,4);
    const curYear = new Date().getFullYear()
    if(curYear - value < 16 ){
      return {'age16': true}
    }
    return null;
  }

  checkInputBirthday(birthday: AbstractControl) {
    const value = birthday.value
    const curDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    if(value >= curDate) {
      return {'checkDate': true}
    }
    return null;
  }

  validateCustomSalary(salary: AbstractControl) {
    let value = salary.value;
    if (value % 100000 != 0) {
      return {'format': true}
    }
    return null;
  }

}
