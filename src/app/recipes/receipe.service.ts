import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = []; 

    recipesList:Subject<Recipe[]> = new Subject<Recipe[]>()

    constructor(private shoppingService:ShoppingService){
       
    }

    getRecipe(){
        return this.recipes.slice();
    }

    addRecipeToCart(ingradients:Ingredient[]){
       this.shoppingService.addIngradients(ingradients);
    }

    getRecipeById(id:number){
        return this.recipes.slice()[id]
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesList.next(this.recipes)
    }

    updateRecipe(index:any,recipe:Recipe){
        this.recipes[index] = recipe;
        this.recipesList.next(this.recipes);
    }

    deleteRecipe(index:any){
        this.recipes.splice(index,1);
        this.recipesList.next(this.recipes);
    }

    setRecipe(recipe:Recipe[]){
        this.recipes = recipe
        this.recipesList.next(this.recipes);
    }
}