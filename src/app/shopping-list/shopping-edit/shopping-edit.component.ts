import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/Ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIndredient(index);
        this.slForm.setValue(this.editedItem);
      });
  }

  // onAddIngredient(){
  //   const name = this.nameInputRef.nativeElement.value;
  //   const amount = this.amountInputRef.nativeElement.value;
  //   const ingredient = new Ingredient(name, amount);
  //   this.shoppingListService.addIngredient(ingredient);
  // }

  onSubmit(f: NgForm){
    //console.log(this.shoppingListForm);
    const name = f.value.name;
    const amount = f.value.amount;
    const ingredient = new Ingredient(name, amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, ingredient);
    }else{
      this.slService.addIngredient(ingredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.onClear();
    this.slService.deleteingredient(this.editedItemIndex);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
