import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {formatDate} from "@angular/common";
import {Employee} from "../../model/employee/employee";
import {AppUser} from "../../model/account/app-user";
import {EmployeeService} from "../service/employee.service";
import {Position} from "../../model/employee/position";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employee: Employee = {};
  position: Position[] = [];

  private selectedImage: any = null;

  constructor(private employeeService: EmployeeService, private router: Router, private storage: AngularFireStorage,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllPosition();
  }

  getEmployeeForm() {
    // @ts-ignore
    this.employeeForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.pattern("^[A-Za-z][a-zA-Z0-9 ]{1,}$")]),
      image: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required,Validators.pattern("^([A-Z][^A-Z0-9\\s]+)(\\s[A-Z][^A-Z0-9\\s]+)*$")],),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(09|\\(84\\)\\+9)[01]\\d{7}$')]),
      birthday: new FormControl('',[Validators.pattern("^(?:(?:31(/|-|.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(/|-|.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(/|-|.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(/|-|.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$")]),
      salary: new FormControl('', [Validators.required, this.validateCustomSalary]),
      position: new FormControl('')
    });
  }

  getAllPosition() {
    this.employeeService.getAllPosition().subscribe(data => {
      // @ts-ignore
      this.position = data;
    }, error => {
    }, () => {
      this.getEmployeeForm();
    });
  }

  createEmployee() {
    console.log(this.employeeForm.value)
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRel = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRel.getDownloadURL().subscribe((url) => {
          this.employeeForm.patchValue({image: url});
          const appUser: AppUser = {
            userName: this.employeeForm.value.username
          }
          const employee: Employee = this.employeeForm.value;
          employee.appUser = appUser;
            this.employeeService.saveEmployee(employee).subscribe(() => {
              this.router.navigateByUrl('/employee').then(r => this.toast.success('thêm mới thành công'));
            });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyy-hh:mm:ss', 'en-US');
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get address() {
    return this.employeeForm.get('address');
  }

  get image() {
    return this.employeeForm.get('image');
  }

  get gender() {
    return this.employeeForm.get('gender');
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

  get username() {
    return this.employeeForm.get('username');
  }

  validateCustomSalary(salary: AbstractControl) {
    let value = salary.value;
    if (value % 100000 != 0) {
      return {'format': true}
    }
    return null;
  }

}
