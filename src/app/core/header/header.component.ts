import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { DbService } from '../../shared/db.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private db: DbService, public authService: AuthService){}

  saveData(){
    this.db.saveRecipes().subscribe(
      (response: Response) => console.log(response.json()),
      (error) => console.log(error)
    );
  }

  ngOnInit(){
    //this.fetchData();
  }

  fetchData(){
    this.db.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }

}
