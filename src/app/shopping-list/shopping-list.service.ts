//import {EventEmitter} from '@angular/core'
import {Subject} from 'rxjs/Subject';

import {Ingredient} from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];

  // private ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomato', 10)
  // ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIndredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]){
    for(let newIngredient of ingredients){
      let notInList = true;
      for(let ingredient of this.ingredients){
        if(ingredient.name === newIngredient.name){
          ingredient.amount += newIngredient.amount;
          notInList = false;
        }
      }
      if(notInList){
        this.ingredients.push(newIngredient);
      }
    }
    //this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }

  updateIngredient(index: number, newIngretient: Ingredient){
    this.ingredients[index] = newIngretient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteingredient(index){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  clearShoppingList(){
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  toggleTaken(index: number){
    this.ingredients[index].taken = !this.ingredients[index].taken;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
