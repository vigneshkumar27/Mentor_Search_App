import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http"
const base_url = "http://localhost:3001/"
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';
import { catchError, Subject, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  isauthenticated = false;
  user: any;
  private authstatuslistener = new Subject<boolean>()
  constructor(private http: HttpClient, private router: Router) { this.autoAuthUser() }
  login(data: any) {
    return this.http.post(base_url + "login", data)

  }
  register(data: any) {
    return this.http.post(base_url + "register", data)
  }
  afterlogin(res: any) {
    this.token = res.returnedToken
    this.user = res.currentuser
    //console.log(this.user)
    this.isauthenticated = true
    //console.log("Logged in")
    localStorage.setItem("bearer", this.token)
    this.router.navigate(['/mentors'])
  }
  afterregister() {
    this.router.navigate(["/login"])
  }
  gettoken() {
    return this.token
  }
  logout() {
    console.log('logout service called');

    this.isauthenticated = false;
    this.router.navigate(['/']);
  }
  getisauthenticated() {
    return this.isauthenticated
  }
  getuser() {
    return this.user
  }getauthstatuslistener() {
    return this.authstatuslistener.asObservable()
  }
  autoAuthUser() {
    setInterval(() => {
      this.authstatuslistener.next(this.getisauthenticated());
    }, 100);
  }


}
