import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {CookieService} from "../login/service/cookie.service";
import {LogoutService} from "../login/service/logout.service";
import {Router} from "@angular/router";
import {CommonService} from "../login/service/common.service";
import {Subscription} from "rxjs";
import { NotificationService } from '../order/service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  role: string = '';
  username: string = '';
  token: string = '';
  messageReceived: any;
  private subscriptionName: Subscription;

  constructor(private cookieService: CookieService,
              private toastrService: ToastrService,
              private logoutService: LogoutService,
              private router: Router,
              private commonService: CommonService,
              private notificationService: NotificationService) {
    this.role = this.readCookieService('role');
    this.username = this.readCookieService('username');
    this.token = this.readCookieService('jwToken');
    // subscribe to sender component messages
    this.subscriptionName = this.commonService.getUpdate().subscribe(message => {
      console.log(message)
      this.messageReceived = message;
      this.role = this.readCookieService('role');
      this.username = this.readCookieService('username');
      this.token = this.readCookieService('jwToken');
    });
  }

  ngOnInit(): void {
  }

  /**
   * @date 14/08/2022
   * @author PhuongTd
   * @param key
   */
  readCookieService(key: string): string {
    return this.cookieService.getCookie(key);
  }

  onLogout() {
    if (this.cookieService.getCookie('jwToken') != null) {
      this.logoutService.onLogout(this.cookieService.getCookie('jwToken')).subscribe(() => {
        this.cookieService.deleteCookie('role');
        this.cookieService.deleteCookie('jwToken');
        this.cookieService.deleteCookie('username');
      }, error => {
        console.log(error)
        switch (error.error) {
          case "isLogout":
            this.toastrService.warning("Bạn chưa đăng nhập!");
            break;
          case "LoginExpired":
            this.cookieService.deleteCookie('role');
            this.cookieService.deleteCookie('jwToken');
            this.cookieService.deleteCookie('username');
            this.router.navigateByUrl("/login").then(() => {
              this.toastrService.warning("Hết phiên đăng nhập vui lòng đăng nhập lại!");
              this.sendMessage();
            })
            break;
        }
      }, () => {
        this.router.navigateByUrl('/login').then(() => {
          this.toastrService.success("Đăng xuất thành công!");
          this.notificationService.removeToken();
          this.sendMessage();
        });
      });
    } else {
      this.toastrService.warning("Bạn chưa đăng nhập!");
    }
  }

  ngOnDestroy(): void {
    this.subscriptionName.unsubscribe();
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.commonService.sendUpdate('Đăng Xuất thành công!');
  }
}
