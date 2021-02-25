import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from './receipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers : []
})
export class RecipesComponent implements OnInit {

  constructor(private recipeService:RecipeService,private route:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.route.data.subscribe(res=>{
      this.recipeService.setRecipe(res['recipes'])
    })
  }

  
}
