import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../receipe.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService:RecipeService,private route:Router,private router:ActivatedRoute) { 
    this.recipes = this.recipeService.getRecipe();
    this.recipeService.recipesList.subscribe(recipeList=>{
      this.recipes = recipeList
    })
  }

  

  ngOnInit() {
  }

  addRecipe(){
     this.route.navigate(['new'],{relativeTo : this.router})
  }

}
