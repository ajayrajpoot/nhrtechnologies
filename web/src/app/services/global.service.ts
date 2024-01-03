import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { BehaviorSubject } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  LoggedUserSrc: any = new BehaviorSubject(null);
  LoggedUser = this.LoggedUserSrc.asObservable();

  session: any = { token: '' };

  constructor(private router: Router,
    private notifier: NotifierService,
    private rest: RestService
  ) { }


  loadData() {
    try {
      var localData: any = localStorage.getItem('localData');

      if (localData !== null) {
        var u = JSON.parse(localData);

        this.setSession(u.token)

        this.LoggedUserSrc.next(JSON.parse(localData));
      } else {
        this.LoggedUserSrc.next(null);

      }
    } catch (e) { }
  }

  setSession(token: any) {

    this.session = {
      token: token
    }
    this.rest.session = this.session;

  }
  redirect(url: string, params = null) {
    if (params == null) {
      this.router.navigate([url]);
    } else {
      this.router.navigate([url, params]);
    }
  }

  public successNotification(message: string): void { this.notifier.notify('success', message); }
  public errorNotification(message: string): void { this.notifier.notify('error', message); }

}
