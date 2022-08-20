import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "./cookie.service";
import {environment} from "../../../environments/environment";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class LogoutService {
  private LOGOUT_URL = API_URL + "/logoutSecurity";


  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  onLogout(token: string): Observable<any> {
  const header = 'Bearer ' + this.cookieService.getCookie('jwToken');
    return this.httpClient.get<any>(this.LOGOUT_URL + "/" + token, {headers: new HttpHeaders({'authorization': header})}).pipe();
  }
}
