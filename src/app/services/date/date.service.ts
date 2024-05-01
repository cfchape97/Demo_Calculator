import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { LoginComponent } from '../../components/login/login.component';

const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private service: AuthenticationService) { }

  sessionValid() {

    try {
      let twentyFourHoursLater = new Date(this.service.lastLoginTime?.getTime() + DAY_MILLISECONDS);

      if ((new Date())?.getTime() < twentyFourHoursLater?.getTime()) {
        return true;
      } else {
        localStorage.removeItem('login');
        return false;
      }
    } catch {
      return false;
    }
  }
}
