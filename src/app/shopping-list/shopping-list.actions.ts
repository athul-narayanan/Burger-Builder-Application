import { Action } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";

export const ADD_INGRADIENT = 'ADD_INGRADIENT';
export const ADD_INGRADIENTS = 'ADD_INGRADIENTS';
export const UPDATE_INGRADIENTS = 'UPDATE_INGRADIENTS';
export const DELETE_INGRADIENTS = 'DELETE_INGRADIENTS';

export class AppState{
    shoppingList : State
}

export interface State{
    ingradients: Ingredient[],
    editedIndex : number,
    editedItem : Ingredient
}

export class AddIngradient implements Action{
    readonly type = ADD_INGRADIENT;
    constructor(public payload : Ingredient){
        this.payload = payload
    }
}

export class AddIngradients implements Action{
    readonly type = ADD_INGRADIENTS;
    constructor(public payload : Ingredient[]){
        this.payload = payload
    }
}

export class UpdateIngradients implements Action{
    readonly type = UPDATE_INGRADIENTS;
    constructor(public payload : {index : number , ingradient:Ingredient}){
        this.payload = payload
    }
}

export class DeleteIngradients implements Action{
    readonly type = DELETE_INGRADIENTS;
    constructor(public payload : number){
        this.payload = payload
    }
}