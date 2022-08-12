import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "../service/cookie.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoginService} from "../service/login.service";
import {strict} from "assert";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private cookieService: CookieService,
              private router: Router,
              private toastrService: ToastrService,
              private loginService: LoginService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      password: new FormControl("", [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]),
      rememberMe: new FormControl()
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      if (this.loginForm.value.rememberMe) {
        this.cookieService.setCookie("username", username, 100);
        this.cookieService.setCookie("password", password, 100);
      }
      this.loginService.onLogin(username, password).subscribe(value => {
        this.authService.isLogin(value);
      }, error => {
        if (error.error === "PasswordExpired") {
          this.toastrService.warning("Mật khẩu bạn đã quá hạn vui lòng đổi mật khẩu mới!");
        }
      });
    } else {
      console.log(this.loginForm);
      this.toastrService.error("Thông tin bạn nhập không chính xác!");
    }
  }
}
