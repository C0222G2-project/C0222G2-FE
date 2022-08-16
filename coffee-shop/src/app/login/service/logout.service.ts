import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private LOGOUT_URL = "http://localhost:8080/logoutSecurity";

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  onLogout(token: string): Observable<any> {
    const tokenHeader = 'Bearer ' + this.cookieService.getCookie('jwToken');
    const headers = new HttpHeaders({'authorization': tokenHeader});
    return this.httpClient.post<any>(this.LOGOUT_URL, {'token': token}, {headers: headers}).pipe();
  }
}
