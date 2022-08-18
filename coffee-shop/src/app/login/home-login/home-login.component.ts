import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "../service/cookie.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoginService} from "../service/login.service";
import {AuthService} from "../service/auth.service";
import {ForgotService} from "../service/forgot.service";
import {CommonService} from "../service/common.service";
import {Subscription} from "rxjs";
import { NotificationService } from 'src/app/order/service/notification.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {

  loginForm: FormGroup;
  forgotForm: FormGroup;
  messageReceived: any;
  private subscriptionName: Subscription;

  constructor(private cookieService: CookieService,
              private router: Router,
              private toastrService: ToastrService,
              private loginService: LoginService,
              private authService: AuthService,
              private forgotService: ForgotService,
              private commonService: CommonService,
              private title : Title,
              private notificationService: NotificationService) {
    this.title.setTitle("Đăng Nhập");
    this.subscriptionName = this.commonService.getUpdate().subscribe(message => {
      this.messageReceived = message;
    });
  }

  ngOnInit(): void {
      this.createLoginForm();
    this.createForgotForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      stayLogged: new FormControl()
    })
  }

  createForgotForm() {
    this.forgotForm = new FormGroup({
      username: new FormControl('', [Validators.required])
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const stayLogged = this.loginForm.value.stayLogged;
      if (this.loginForm.value.stayLogged) {
        this.cookieService.setCookie('stayLogged', 'true', 1);
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
        this.router.navigateByUrl('/home').then(() => {
          this.notificationService.requestPermission();
          this.toastrService.success("Đăng nhập thành công!")
        });
        setTimeout(()=> {
          this.router.navigateByUrl('/home').then(() => {
            this.toastrService.success("Đăng nhập thành công!")
            this.sendMessage();
          });
        }, 1000)
        this.router.navigateByUrl("/loading").then(() => {
        })
      });
    } else {
      this.toastrService.error("Thông tin bạn nhập không chính xác!");
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
        this.router.navigateByUrl("/login").then(() => {
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

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.commonService.sendUpdate('Đăng Nhập thành công!');
  }

  closeForgot() {
    this.forgotForm.reset();
  }
}
