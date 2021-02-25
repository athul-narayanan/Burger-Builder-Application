import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { RecipeService } from '../../receipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: any;
  @Input() index : any;

  constructor(private recipeService:RecipeService) { }

  selectRecipe(recipe){
    
  }
  
  ngOnInit() {
  }

}
