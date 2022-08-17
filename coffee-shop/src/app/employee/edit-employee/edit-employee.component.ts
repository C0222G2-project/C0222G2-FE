import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from "../service/employee.service";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {Employee} from "../model/employee/employee";
import {AppUser} from "../model/account/app-user";
import {Position} from "../model/employee/position";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeFormEdit: FormGroup;
  employee: Employee = {};
  appUser: AppUser[] = [];
  position: Position[] = [];
  selectedImage: any = null;
  imgSrc: any;
  isLoading: Boolean = false;

  constructor(private employeeService: EmployeeService, private router: Router,private storage: AngularFireStorage,
              private activate: ActivatedRoute,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getParamId();
  }

  getParamId() {
    this.activate.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      // @ts-ignore
      this.employeeService.findByIdEdit(parseInt(id)).subscribe(data => {
        // @ts-ignore
        this.employee = data;
        if(data == null){
          this.toast.warning("Không có dữ liệu hoặc bạn đang nhập quá dữ liệu hiện có", "Thông Báo")
          this.router.navigateByUrl('/employee').then();
        }
        this.getAllUser();
        this.getAllPosition();
        this.getEmployeeFormUpdate();
      });
    });
  }

  getAllPosition() {
    this.employeeService.getAllPosition().subscribe(data => {
      // @ts-ignore
      this.position = data;
    });
  }

  getAllUser() {
    this.employeeService.getAllUser().subscribe(data => {
      // @ts-ignore
      this.appUser = data;
    });
  }

  getEmployeeFormUpdate() {
    this.employeeFormEdit = new FormGroup({
      id: new FormControl(this.employee.id),
      appUser: new FormControl(this.employee.appUser,[Validators.required]),
      name: new FormControl(this.employee.name, [Validators.required,Validators.minLength(6),Validators.maxLength(30),Validators.pattern("^([A-Z][^A-Z0-9\\s]+)(\\s[A-Z][^A-Z0-9\\s]+)*$")],),
      image: new FormControl(this.employee.image, [Validators.required,Validators.maxLength(255)]),
      birthday: new FormControl(this.employee.birthday,[this.checkInputBirthday,this.checkAge16,Validators.pattern("^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$")]),
      gender: new FormControl(this.employee.gender),
      phoneNumber: new FormControl(this.employee.phoneNumber, [Validators.required, Validators.pattern('^(09|\\(84\\)\\+9)[01]\\d{7}$')]),
      address: new FormControl(this.employee.address, [Validators.required,Validators.minLength(6),Validators.maxLength(255),]),
      email: new FormControl(this.employee.email, [Validators.required, Validators.email,Validators.minLength(6),,Validators.maxLength(50),]),
      salary: new FormControl(this.employee.salary, [Validators.required, this.validateCustomSalary,Validators.max(100000000)]),
      position: new FormControl(this.employee.position)
    });
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyy-hh:mm:ss', 'en-US');
  }

  updateEmployee() {
    this.toggleLoading();
    if (this.selectedImage == null) {
      let employee: Employee = this.employeeFormEdit.value;
      // @ts-ignore
      this.employeeService.updateEmployee(employee).subscribe((data) => {
          this.toast.success('Cập nhật thành công', 'Thông báo!!!')
          this.router.navigateByUrl('/employee').then();
        },
        error => {
          console.log(error);
        });
    } else {
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            let employee: Employee = this.employeeFormEdit.value;
            employee.image = url;
            this.employeeService.updateEmployee(employee).subscribe((data) => {
                this.toast.success('Cập nhật thành công', 'Thông báo!!!')
                this.router.navigateByUrl('/employee').then()
              },
              error => {
                console.log(error);
              });
          });
        })
      ).subscribe();
    }
  }

  toggleLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (o: any) => this.imgSrc = o.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      document.getElementById("image").style.display= "none"
      document.getElementById("img").style.display = "block"
    } else {
      this.imgSrc = "";
      this.selectedImage = null;
    }
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
    return this.employeeFormEdit.get('name');
  }

  get image() {
    return this.employeeFormEdit.get('image');
  }

  get address() {
    return this.employeeFormEdit.get('address');
  }

  get phoneNumber() {
    return this.employeeFormEdit.get('phoneNumber');
  }

  get birthday() {
    return this.employeeFormEdit.get('birthday');
  }

  get salary() {
    return this.employeeFormEdit.get('salary');
  }
  get email() {
    return this.employeeFormEdit.get('email');
  }
  validateCustomSalary(salary: AbstractControl) {
    let value = salary.value;
    if(value % 100000 != 0 ) {
      return {'format': true}
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
  checkAge16(birthday: AbstractControl) {
    const value = parseInt(birthday.value.substr(0,4));
    const curYear=new Date().getFullYear()
    if(curYear - value < 16 ){
      return {'not16': true}
    }
    return null;
  }

}
