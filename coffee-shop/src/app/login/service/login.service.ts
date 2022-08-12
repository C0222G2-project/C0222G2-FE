import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private AUTHENTICATION_URL = "http://localhost:8080/authenticate";

  constructor(private httpClient: HttpClient) { }

  onLogin(username: string, password: string):Observable<any> {
    return this.httpClient.post<Observable<any>>(this.AUTHENTICATION_URL, {username: username, password: password});
  }
}
