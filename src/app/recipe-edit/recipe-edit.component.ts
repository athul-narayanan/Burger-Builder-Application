import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipes/receipe.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route:ActivatedRoute,private recipeService:RecipeService,private router:Router) { }
  id : number;
  editable : boolean = false;
  recipeForm : FormGroup;
  selectedRecipe : Recipe
  ngOnInit(): void {
     this.route.params.subscribe((params:Params)=>{
          this.id = params['id'];
          this.editable = this.id !=null;
          if(this.editable){
            this.editableRecipe();
          }
          this.initForm();
     })
  }

  editableRecipe(){
    this.selectedRecipe = this.recipeService.getRecipeById(this.id);
  }

  private initForm(){
     let recipeName = '';
     let recipeImageUrl = '';
     let recipeDescription = '';
     let recipeIngradients = new FormArray([]);
     if(this.editable){
       recipeName = this.selectedRecipe.name;
       recipeImageUrl = this.selectedRecipe.imagePath;
       recipeDescription = this.selectedRecipe.description
       if(this.selectedRecipe['ingradients']){
         for(let ingradient of this.selectedRecipe['ingradients']){
           recipeIngradients.push(new FormGroup({
             name : new FormControl(ingradient.name,Validators.required),
             amount : new FormControl(ingradient.amount,Validators.required)
           }))
         }
       }
     }
     this.recipeForm = new FormGroup({
        name : new FormControl(recipeName,Validators.required),
        imagePath : new FormControl(recipeImageUrl,Validators.required),
        description : new FormControl(recipeDescription,Validators.required),
        ingradients : recipeIngradients
     })
  }

  addIngradient(){
    (<FormArray>this.recipeForm.get('ingradients')).push(new FormGroup({
      name : new FormControl('',Validators.required),
      amount : new FormControl('',Validators.required)
    }))
  }

  submitForm(){
    if(this.editable){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    }else  this.recipeService.addRecipe(this.recipeForm.value)
  }

  cancelEdit(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  deleteIngradients(index){
    (<FormArray>this.recipeForm.get('ingradients')).removeAt(index)
  }

}
