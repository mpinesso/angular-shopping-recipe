import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import {Ingredient} from '../shared/Ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service'

@Injectable()
export class RecipeService {

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

}
