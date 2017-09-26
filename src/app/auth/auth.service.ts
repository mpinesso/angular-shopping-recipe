import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable()
export class AuthService{
  token: string;
  username: string;

  constructor(private router: Router){}

  signupUser(email:string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => this.signinUser(email, password))
      .catch(error => console.log(error));
  }

  signinUser(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      response => {
        this.router.navigate(['/recipes']);
        firebase.auth().currentUser.getIdToken().then(
          (token:string) => {
            this.token = token;
            this.username = email.substring(0, email.indexOf('@'));
          }
        );
      }
    )
    .catch(error => console.log(error));
  }

  logout(){
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

  getToken(){
    firebase.auth().currentUser.getIdToken().then(
      (token:string) => this.token = token
    );
    return this.token;
  }

  getUsername(){
    return this.username;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
