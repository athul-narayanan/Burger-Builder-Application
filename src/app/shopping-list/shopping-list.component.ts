import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import * as shoppingListActions from './shopping-list.actions';




@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  
  ingradients : Observable<{ingradients : Ingredient[]}>
  isubScription : Subscription
  constructor(
    private shoppingService:ShoppingService, 
    private store:Store<shoppingListActions.AppState>
  ) { }
  
  addItem(item:Ingredient){
    this.store.dispatch(new shoppingListActions.AddIngradient(item))
  }
  

  ngOnInit() {
    this.ingradients = this.store.select('shoppingList')
  }


  selectIngradient(index){
     this.shoppingService.selectIngradient.next(index);
  }

}
