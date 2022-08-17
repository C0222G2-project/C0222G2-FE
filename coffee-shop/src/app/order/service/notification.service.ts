import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CookieService } from 'src/app/login/service/cookie.service';
import { NotificationOfCoffeStore } from '../model/notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  keyArray = [];
  containerMessengeUnread = [];
  registerTokenArray = [];
  registerToken= '';
  role: string = '';
  username: string ='';
  messagedUnread: Observable<any[]>;
  tokenFCM: Observable<any[]>;
  notification: NotificationOfCoffeStore;
  currentMessage= new BehaviorSubject(null);
  date = new Date();
  temp;

  constructor(private db: AngularFireDatabase, private angularFireMessaging: AngularFireMessaging,
    private cookieService: CookieService) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onBackgroundMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
    this.writeMessage();
    this.getTokenFromFcm();
  }

  sendNotification(titleContent: string, tableCoffe: string, requestConent: string){
    this.notification = {
      title: titleContent,
      body: tableCoffe + " yêu cầu " + requestConent,
      role: this.role,
      date: this.date.toJSON(),
      status: 'true'
    }
    this.db.list("/notification").push(this.notification);
    this.sendNotificationToFirebase();
  }

  sendNotificationToFirebase(){
    const content = {
                  to: this.registerToken,
                  notification: {
                      title: this.notification.title,
                      body: this.notification.body,
                      status: false
                  }
              }
    let option = {
      method: "POST",
      headers: new Headers({
        Authorization: "key=AAAAKtuxL6A:APA91bEWvskL2HJGlxNoQzS8WzamaGshY1_hGxWmfdDPBdcm4iTxTPi86KCbnJ5Jp0trqsJhQXirr8Sq173OrwZlRMFAkGwwixFnVQ9o8zCDZsPrXdrI7cdAgVP5-ysfOEi28WD4O9lb",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(content)
    }
    fetch("https://fcm.googleapis.com/fcm/send", option).then(res => {
      console.log(res);
    }).catch(e => {
      console.log("Error");
    });
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        let user = this.cookieService.getCookie('username')
        this.sendTokenToFcm(user, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  setPermitGetNotification(){
    if(this.cookieService.getCookie('role') == 'ROLE_ADMIN'){
      this.role = this.cookieService.getCookie('role');
      this.username = this.cookieService.getCookie('username');
    }
  }

  writeMessage(){
    this.messagedUnread = this.db.list("/notification", ref => ref.orderByChild('status').equalTo('true')).snapshotChanges();
    this.messagedUnread.subscribe((actions) => {
        actions.forEach(action => {
          this.notification = {
            title: action.payload.val().title,
            body: action.payload.val().body,
            role: action.payload.val().role,
            date: action.payload.val().date,
            status: action.payload.val().status
          }
          this.keyArray.push(this.notification);
        });
    });
  }

  sendTokenToFcm(user: string, token: string){
    this.registerToken = token;
    const content = {
      user: user,
      token: token,
      status: "new"
    }
    this.db.list("/token").push(content);
  }

  getTokenFromFcm(){
    this.tokenFCM = this.db.list('/token', ref => ref.orderByChild('user').equalTo('manager')).snapshotChanges();
    this.tokenFCM.subscribe(
      actions => {
        actions.forEach(
          action => {
            this.temp = action.payload.val().token;
            this.registerTokenArray.push(this.temp);
          }
        );
      }
    );
    this.registerTokenArray.forEach(items => {
      this.registerToken = items.replace('""', '');
    });
    console.log(this.registerToken);
  }

  removeToken(){
    this.db.list('/token', ref => ref.orderByChild('status').equalTo('new')).update('status', {text: 'old'});
  }
}

