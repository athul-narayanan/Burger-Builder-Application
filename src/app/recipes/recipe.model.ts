import { Ingredient } from "src/app/shared/ingredient.model";

export class Recipe{
    name : string;
    description : string;
    imagePath : string;
    ingradients : Ingredient[]

    constructor(name:string,description:string,imagePath:string,ingradients:Ingredient[]){
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingradients = ingradients
    }
}