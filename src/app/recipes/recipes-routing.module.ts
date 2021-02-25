import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth-guard.service";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "../recipe-resolver.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";


const routes : Routes =[
    { path : '',
      component:RecipesComponent,
      canActivate : [AuthGuardService],
      children:[
        {
            path : '',
            component: RecipeStartComponent
        },
        {
            path : 'new',
            component : RecipeEditComponent
        },
        {
            path : ':id/edit',
            component : RecipeEditComponent
        },
        {
            path : ":id",
            component : RecipeDetailComponent
        }
    ],resolve:{recipes:RecipeResolverService}},
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class RecipesRoutingModule{

}