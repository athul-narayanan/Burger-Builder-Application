import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http'
import { RecipeService } from "./receipe.service";
import { Recipe } from "./recipe.model";
import { pipe} from 'rxjs';
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn : 'root'
})
export class DataStorageService {
   constructor(
       private http: HttpClient,
       private recipeService:RecipeService,
       private authService : AuthService
    ){

   }

   storeData(){
       const recipes = this.recipeService.getRecipe();
       return this.http.put('https://recipe-book-81605-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(data=>{
           console.log(data);
       })
   }

   fetchData(){
        return this.http.get<Recipe[]>('https://recipe-book-81605-default-rtdb.firebaseio.com/recipes.json').pipe(
            map(res=>{
                return res.map(resItem=>{
                   return {
                       ...resItem,ingradients : resItem.ingradients ? resItem.ingradients : []
                   }
                })
        }))
   }
    
}