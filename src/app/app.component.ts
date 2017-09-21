import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAaFOmGOculTR0JENVvmErXEbck4LDUkwo",
      authDomain: "ng-recipe-book-a4259.firebaseapp.com"
    });
  }

}
