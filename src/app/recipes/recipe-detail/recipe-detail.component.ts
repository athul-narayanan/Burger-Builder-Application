import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute , Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../receipe.service';
import { Recipe } from '../recipe.model';
import * as shoppingListActions from './../../shopping-list/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id : number;
  constructor(
    private recipeService:RecipeService,
    private router:ActivatedRoute,
    private route:Router,
    private store:Store<{shoppingList : {ingradients : Ingredient[]}}>
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params:Params)=>{
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipeById(+params['id'])
    })
  }

  addToShoppingList(){
    this.store.dispatch(new shoppingListActions.AddIngradients(this.recipe.ingradients));
  }

  editRecipe(){
      this.route.navigate(['edit'],{relativeTo:this.router})
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.route.navigate(['/recipes'])
  }

}
