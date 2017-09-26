import { Component } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { DbService } from '../../shared/db.service';
import { AuthService } from '../../auth/auth.service';
import { AuthInterceptor } from '../../shared/auth.interceptor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class HeaderComponent {

  constructor(private db: DbService, public authService: AuthService){}

  saveData(){
    this.db.saveRecipes().subscribe(
      (error) => console.log(error)
    );

    this.db.saveShoppingList().subscribe(
      (error) => console.log(error)
    );
  }

  fetchData(){
    this.db.getRecipes();
    this.db.getShoppingList();
  }

  onLogout(){
    this.authService.logout();
  }

}
