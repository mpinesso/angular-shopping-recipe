import {Ingredient} from '../shared/Ingredient.model';

export class Recipe{
  // public id: number;
  public name: string;
  public description: string;
  public imagePath: string; // utilizzero immagini da internet quindi basta un url
  public ingredients: Ingredient[];

  constructor (/*id: number,*/ name: string, desc: string, imagePath: string, ingredients: Ingredient[]){
    //this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
