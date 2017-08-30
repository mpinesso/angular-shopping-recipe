import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is semply a test', 'http://images.media-allrecipes.com/userphotos/250x250/2160152.jpg'),
    new Recipe('Second Test Recipe', 'This is the seccond test', 'http://images.media-allrecipes.com/userphotos/250x250/00/92/70/927031.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
