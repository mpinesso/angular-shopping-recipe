import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DbService{

  constructor(private http: Http, private recipeService: RecipeService, private slService: ShoppingListService, private authService: AuthService){}

  saveRecipes(){
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-a4259.firebaseio.com/recipes.json?auth=' + token,
     this.recipeService.getRecipes());
  }

  getStartRecipes(){
    return this.http.get('https://ng-recipe-book-a4259.firebaseio.com/recipes.json')
      .map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for(let recipe of recipes){
          if(!recipe['ingredients']){
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }

  getRecipes(){
    const token = this.authService.getToken();
    return this.http.get(
        'https://ng-recipe-book-a4259.firebaseio.com/recipes.json?auth=' + token)
      .map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for(let recipe of recipes){
          if(!recipe['ingredients']){
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
      // .map((response: Response) => {
      //   return response.json();
      // }).catch((error: Response) => {
      //   return Observable.throw('Error getting recipes');
      // });
  }

  saveShoppingListFromTaken(){
    return this.http.put('https://ng-recipe-book-a4259.firebaseio.com/shopping-list.json',
      this.slService.getIngredients());
  }

  saveShoppingList(){
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-a4259.firebaseio.com/shopping-list.json?auth=' + token,
      this.slService.getIngredients());
  }

  getStartShoppingList(){
    return this.http.get('https://ng-recipe-book-a4259.firebaseio.com/shopping-list.json')
      .map((response: Response) => {
        const ingredients: Ingredient[] = response.json();
        return ingredients;
      })
      .subscribe((ingredients: Ingredient[]) => {
        this.slService.addIngredients(ingredients);
      });
  }

  getShoppingList(){
    const token = this.authService.getToken();
    return this.http.get('https://ng-recipe-book-a4259.firebaseio.com/shopping-list.json?auth=' + token)
      .map((response: Response) => {
        const ingredients: Ingredient[] = response.json();
        return ingredients;
      })
      .subscribe((ingredients: Ingredient[]) => {
        this.slService.addIngredients(ingredients);
      });
  }

}
