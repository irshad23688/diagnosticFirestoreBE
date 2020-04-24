import {Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class LoginService {

  constructor(public af: AngularFireAuth) {
  }


  isAuthenticated() {
    var user = localStorage.getItem('uid') != null;
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}

