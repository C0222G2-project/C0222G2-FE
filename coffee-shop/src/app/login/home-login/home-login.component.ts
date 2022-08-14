import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "../service/cookie.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoginService} from "../service/login.service";
import {AuthService} from "../service/auth.service";
import {LogoutService} from "../service/logout.service";
import {ForgotService} from "../service/forgot.service";

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {
  loginForm: FormGroup;
  forgotForm: FormGroup;

  constructor(private cookieService: CookieService,
              private router: Router,
              private toastrService: ToastrService,
              private loginService: LoginService,
              private authService: AuthService,
              private logoutService: LogoutService,
              private forgotService: ForgotService) {
  }

  ngOnInit(): void {
    const username = this.cookieService.getCookie("username");
    const password = this.cookieService.getCookie("password");
    if (username != '' && password != '') {
      this.createLoginForm(username, password);
    } else {
      this.createLoginForm("", "");
    }
    this.createForgotForm();
  }

  createLoginForm(username: string, password: string) {
    this.loginForm = new FormGroup({
      username: new FormControl(username, [Validators.required, Validators.maxLength(50)]),
      password: new FormControl(password, [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]),
      rememberMe: new FormControl()
    })
  }

  createForgotForm() {
    this.forgotForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(50)])
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
        switch (error.error) {
          case "isLogin":
            this.toastrService.warning("Bạn đã đăng nhập rồi!");
            break;
          case "PasswordExpired":
            this.toastrService.warning("Mật khẩu bạn đã quá hạn vui lòng đổi mật khẩu mới!");
            break;
          default:
            this.toastrService.warning("Tên đăng nhập hoặc mật khẩu không chính xác!")
            break;
        }
      }, () => {
        this.toastrService.success("Đăng nhập thành công!")
      });
    } else {
      this.toastrService.error("Thông tin bạn nhập không chính xác!");
    }
  }

  onLogout() {
    if (this.cookieService.getCookie('jwToken') != null) {
      this.logoutService.onLogout(this.cookieService.getCookie('jwToken')).subscribe((value) => {
        this.cookieService.deleteCookie('role');
        this.cookieService.deleteCookie('jwToken');
        this.router.navigateByUrl("/login").then(() => {
          this.toastrService.success("Đăng xuất thành công!");
        })
      }, error => {
        console.log(error)
        switch (error.error) {
          case "isLogout":
            this.toastrService.warning("Bạn chưa đăng nhập!");
            break;
        }
      }, () => {
      });
    } else {
      this.toastrService.warning("Bạn chưa đăng nhập!");
    }
  }

  onForgot() {
    if (this.forgotForm.valid) {
      this.router.navigateByUrl("/loading").then(() => {
        //@ts-ignore
        $("#staticBackdropForgot").modal('hide');
      })
      this.forgotService.onForgot(this.forgotForm.value.username).subscribe(value => {
      }, error => {
        //@ts-ignore
        $("#staticBackdropForgot").modal('hide');
        this.router.navigateByUrl("/login").then(()=>{
          this.toastrService.warning("Tên tài khoản không tồn tại!");
          //@ts-ignore
          $("#staticBackdropForgot").modal('show');
        })
      }, () => {
        this.router.navigateByUrl("/login").then(() => {
          //@ts-ignore
          $("#staticBackdropForgot").modal('hide');
          this.toastrService.success("Gửi yêu cầu thành công. Vui lòng kiểm tra email của bạn!")
          this.forgotForm.reset();
        })
      });
    } else {
      this.toastrService.warning("Thông tin bạn nhập chưa chính xác!")
    }

  }
}
