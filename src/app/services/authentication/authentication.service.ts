import { Injectable } from '@angular/core';
import { LoginUser, SignUpUser } from './authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {

  }

  login(): void {
    let currentTime = new Date();
    let dateJson = { date: currentTime.toJSON() };

    localStorage.setItem('login', JSON.stringify(dateJson));
  }

  checkUserData(loginUser: LoginUser) {
    let userInformation = localStorage.getItem('user');

    let user: SignUpUser = userInformation ? JSON.parse(userInformation) : null;


    if (user?.email === loginUser?.email && user?.password === loginUser?.password) {
      console.log('authenticated');
      return true;
    } else {
      console.log('Incorrect email or password');
      return false;
    }
  }

  signUp(signUpUser: SignUpUser): void {
    localStorage.setItem('user', JSON.stringify(signUpUser));
  }

  get lastLoginTime() {
    return new Date(JSON.parse(localStorage.getItem('login') ?? '')?.date);
  }
}
