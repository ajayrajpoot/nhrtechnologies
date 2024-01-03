import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor() { }

  isAuthenticated() {

    const localData: any = localStorage.getItem('localData');
    const localDataJSON = JSON.parse(localData);
    

    return localDataJSON?.Result || false;
     
  }
}
