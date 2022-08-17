import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ForgotService} from "../service/forgot.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forgot-password-login',
  templateUrl: './forgot-password-login.component.html',
  styleUrls: ['./forgot-password-login.component.css']
})
export class ForgotPasswordLoginComponent implements OnInit {
  changePasswordForm: FormGroup;
  token: string;

  constructor(private activatedRoute: ActivatedRoute,
              private forgotService: ForgotService,
              private toastrService: ToastrService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(value => {
      this.token = value.get("token");
    }, error => {
    }, () => {
      console.log(this.token)
    })
  }

  ngOnInit(): void {
    this.createChangePasswordForm(this.token);
  }

  createChangePasswordForm(token: string) {
    this.changePasswordForm = new FormGroup({
      token: new FormControl(token),
      pass: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]),
        confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')])
      }, this.checkConfirmPassword)
    })
  }

  checkConfirmPassword(pass: AbstractControl) {
    let value = pass.value;
    if (value.password != value.confirmPassword) {
      return {'confirm': true};
    }
    return null;
  }

  onChangePassword() {
    this.forgotService.onFindPassword(this.changePasswordForm.value).subscribe(value => {
      setTimeout(() => {
        this.router.navigateByUrl("/login").then(() => {
          this.toastrService.success("Đổi mật khẩu thành công!");
        })
      }, 1000)
      this.router.navigateByUrl("/loading").then(()=> {
      })
    }, error => {
      console.log(error)
      this.router.navigateByUrl("/login").then(value => {
        this.toastrService.warning("Có vẻ như liên kết của bạn đã hết hạn hãy thử lại sau ít phút!")
      })
    }, () => {

    });
  }
}
