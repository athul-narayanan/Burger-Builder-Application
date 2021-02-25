import { Ingredient } from '../shared/ingredient.model';
import { Component, OnInit, Output , EventEmitter, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';


export class ShoppingService{
    getAllIngradients : Subject<Ingredient[]> = new Subject();
    selectIngradient : Subject<number> = new Subject();
    ingredients : Ingredient[];
    constructor(){
        
    }

    getIngradients(){
        return this.ingredients.slice()
    }

    getRecipeById(index:any){
        return this.ingredients.slice()[index]
    }
}