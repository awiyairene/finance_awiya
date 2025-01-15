import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {LoginTemplate} from "../models/LoginTemplate";
import {from, map, Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router,) {
  }

  login(data: LoginTemplate): Observable<any> {
    return from(this.fireAuth.signInWithEmailAndPassword(data.username, data.password)
      .then(userCredential => {
        return JSON.parse(JSON.stringify(userCredential));
      })
    );
  }

  logout() {
    this.fireAuth.signOut().then(value => this.router.navigate(['/login']));
  }

  getUser() {
    return this.fireAuth.authState;
  }

  isAuthenticated(): Observable<boolean> {
    return this.getUser().pipe(map(user => !!user));
  }

}
