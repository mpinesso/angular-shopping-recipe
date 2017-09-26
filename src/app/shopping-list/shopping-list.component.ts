import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { AuthService } from '../auth/auth.service';
import { DbService } from '../shared/db.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService, public authService: AuthService, private db: DbService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription =  this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }
  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClear(){
    this.slService.clearShoppingList();
  }

  onTaken(index: number){
    this.slService.toggleTaken(index);
    this.db.saveShoppingListFromTaken().subscribe(
      (error) => console.log(error)
    );
  }

}
