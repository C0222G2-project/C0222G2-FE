import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from "../../model/employee/employee";
import {AppUser} from "../../model/account/app-user";
import {EmployeeService} from "../service/employee.service";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Position} from "../../model/employee/position";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";

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
      this.employeeService.findByIdEdit(parseInt(id)).subscribe(data => {
        // @ts-ignore
        this.employee = data;
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
      name: new FormControl(this.employee.name, [Validators.required,Validators.pattern("^([A-Z][^A-Z0-9\\s]+)(\\s[A-Z][^A-Z0-9\\s]+)*$")],),
      image: new FormControl(this.employee.image,[Validators.required]),
      birthday: new FormControl(this.employee.birthday,[Validators.pattern("^(?:(?:31(/|-|.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(/|-|.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(/|-|.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(/|-|.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$")]),
      gender: new FormControl(this.employee.gender),
      phoneNumber: new FormControl(this.employee.phoneNumber, [Validators.required, Validators.pattern('^(09|\\(84\\)\\+9)[01]\\d{7}$')]),
      address: new FormControl(this.employee.address, [Validators.required]),
      email: new FormControl(this.employee.email,[Validators.required,Validators.email]),
      salary: new FormControl(this.employee.salary, [Validators.required, this.validateCustomSalary]),
      position: new FormControl(this.employee.position)
    });
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyy-hh:mm:ss', 'en-US');
  }

  updateEmployee() {
    if (this.selectedImage == null) {
      let employee: Employee = this.employeeFormEdit.value;
      this.employeeService.updateEmployee(employee).subscribe((data) => {
          this.toast.success('cập nhật thành công')
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
                this.toast.success('cập nhật thành công')
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



}
