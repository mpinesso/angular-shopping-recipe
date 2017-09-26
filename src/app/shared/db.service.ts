import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DbService{

  constructor(private httpClient: HttpClient,
      private recipeService: RecipeService,
      private slService: ShoppingListService,
      private authService: AuthService){}

  saveRecipes(){
    //const token = this.authService.getToken();
    return this.httpClient.put('https://ng-recipe-book-a4259.firebaseio.com/recipes.json',
     this.recipeService.getRecipes(), {
       //params: new HttpParams().set('auth', token)
     });
  }

  getRecipes(){
    //const token = this.authService.getToken();
    return this.httpClient.get<Recipe[]>(
        'https://ng-recipe-book-a4259.firebaseio.com/recipes.json')//?auth=' + token)
      .map((recipes) => {
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
    return this.httpClient.put('https://ng-recipe-book-a4259.firebaseio.com/shopping-list.json',
      this.slService.getIngredients());
  }

  saveShoppingList(){
    //const token = this.authService.getToken();
    return this.httpClient.put('https://ng-recipe-book-a4259.firebaseio.com/shopping-list.json',//?auth=' + token,
      this.slService.getIngredients());
  }

  getShoppingList(){
    //const token = this.authService.getToken();
    return this.httpClient.get<Ingredient[]>('https://ng-recipe-book-a4259.firebaseio.com/shopping-list.json')//?auth=' + token)
      .map((ingredients) => {
        return ingredients;
      })
      .subscribe((ingredients: Ingredient[]) => {
        this.slService.addIngredients(ingredients);
      });
  }


  getStartRecipes(){
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-a4259.firebaseio.com/recipes.json')
      //.map((response: Response) => { OLD behavior
      .map((recipes) => {
        // const recipes: Recipe[] = response.json(); OLD behavior
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

    this.httpClient.get<Ingredient[]>('https://ng-recipe-book-a4259.firebaseio.com/shopping-list.json')
      .map((ingredients) => {
        return ingredients;
      })
      .subscribe((ingredients: Ingredient[]) => {
        this.slService.addIngredients(ingredients);
      });
  }
}
