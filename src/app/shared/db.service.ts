import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DbService{

  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService){}

  saveRecipes(){
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-a4259.firebaseio.com/recipes.json?auth=' + token,
     this.recipeService.getRecipes());
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

  saveShoppingList(recipes: Recipe[]){
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-a4259.firebaseio.com/shopping-list.json?auth=' + token, recipes);
  }

  getShoppingList(){
    const token = this.authService.getToken();
    return this.http.get('https://ng-recipe-book-a4259.firebaseio.com/shopping-list.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      }).catch((error: Response) => {
        return Observable.throw('Error getting shopping list');
      });
  }

}
