import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from "../service/cookie.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private cookieService: CookieService,
              private router: Router,
              private toastrService: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.cookieService.getCookie("role") == "ROLE_ADMIN" || this.cookieService.getCookie("role") == "ROLE_STAFF" || this.cookieService.getCookie("role") == "ROLE_USER") {
      return true;
    }
    this.router.navigateByUrl("/login").then(() => {
      this.toastrService.error("Vui lòng đăng nhập để tiếp tục!")
    })
    return false;
  }

}
