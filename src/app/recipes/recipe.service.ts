import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import {Ingredient} from '../shared/Ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service'

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeChanged = new Subject<number>();

  private recipes: Recipe[] = [
    new Recipe(/*1,*/ 'A Test Recipe',
      'This is semply a test',
      'http://finedininglovers-it.cdn.crosscast-system.com/BlogPost/l_4211_mini-tacos-ricetta-.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(/*2,*/ 'Second Test Recipe',
      'This is the seccond test',
      'http://images.media-allrecipes.com/userphotos/250x250/00/92/70/927031.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 2)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService){}

  getRecipes(){
    // slice() crea un nuovo array (nuova istanza[?]) con gli stessi dati di recipes
    // così fuori da questa classe arriverà solo una copia
    return this.recipes.slice();
  }

  getRecipe(id: number){
    /*const recipe = this.recipes.find(
      (r) => {
        return r.id === id;
      }
    );
    return recipe;*/
    return this.recipes[id];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
