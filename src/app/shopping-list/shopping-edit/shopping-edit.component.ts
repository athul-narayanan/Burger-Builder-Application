import { Component, OnInit, Output , EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import * as shoppingListActions from './../shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') inputName;
  @ViewChild('amountInput') inputAmount;
  @ViewChild('f') inputForm : NgForm
 
  
  index : any;
  constructor(
    private shoppingService:ShoppingService,
    private store:Store<shoppingListActions.AppState>
  ) { }

  ngOnInit() {
     this.shoppingService.selectIngradient.subscribe(selectedIndex=>{
       this.index = selectedIndex
       if(this.index !=null){
        let recipe = this.shoppingService.getRecipeById(this.index);
        this.inputForm.setValue({
          name:recipe.name,
          amount : recipe.amount
        })
       }
       
     })
  }

  addItem(form:NgForm){
    let item:Ingredient =  new Ingredient(form.value.name,form.value.amount);
    if(this.index !=null){
      this.store.dispatch(new shoppingListActions.UpdateIngradients({index : this.index , ingradient:item}))
    }else this.store.dispatch(new shoppingListActions.AddIngradient(item))
    this.index = null;
    form.reset()
  }

  clearItem(form:NgForm){
    form.reset()
  }

  deleteItem(form:NgForm){
    this.store.dispatch(new shoppingListActions.DeleteIngradients(this.index));
    form.reset()
  }

}
