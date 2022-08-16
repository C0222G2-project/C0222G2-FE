import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { NotificationOfCoffeStore } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  registerToken = 'e4rMzxG6l7bdjopV4_PRrx:APA91bEcTFteJTi99y1o10llxxogKj5QwR9mK-vJq1cblmbLxJfVCGSQa3T3s4JVnp-cvcuX1rRdXh_xMPtezQJucjybrxs2ORsnqblNgg3b96KY304QKHoMkJW8EFt-hKBpB6Gt-JLu';
  notification: NotificationOfCoffeStore;
  currentMessage= new BehaviorSubject(null);
  constructor(private db: AngularFireDatabase, private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onBackgroundMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  sendNotification(titleContent: string, tableCoffe: string, requestConent: string){
    this.notification = {
      title: titleContent,
      body: tableCoffe + " yêu cầu " + requestConent,
      status: false
    }
    this.db.list("/notification/user").push(this.notification);
    this.sendNotificationToFirebase();
  }

  sendNotificationToFirebase(){
    const content = {
                  to: "foflfvQOl85oJDgx6Bbe61:APA91bHmaKr_6g0BWYDXD9IOzKStJDJtQNDSxcjoe0xNzO52VeFv6RpeSKasvrYR6_ZeyLAQ9JNe0cZiShy4IdhNbawqQOmyrpHUjLRmhnjdlRiOGOsMcNTQSotBqJYFPSsWE-cjxPo4",
                  notification: {
                      title: "Phương",
                      // this.notification.title,
                      body: "chào em bình đẹp gái nhoá",
                      // this.notification.body,
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
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
    (payload) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    })
  }
}

