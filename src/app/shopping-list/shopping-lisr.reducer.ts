import { Action } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";
import * as shoppingListActions from './shopping-list.actions';

const initialState = {
    ingradients:  [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIndex : -1,
    editedItem : null
}

export function shoppingListReducer(state=initialState,action){
       switch (action.type) {
           case  shoppingListActions.ADD_INGRADIENT:
               return {
                   ...state,ingradients:[...state.ingradients,action.payload]
               }
            case shoppingListActions.ADD_INGRADIENTS:
                return {
                    ...state,ingradients:[...state.ingradients,...action.payload]
                }
            case shoppingListActions.UPDATE_INGRADIENTS :
                let ingradient = state.ingradients[action.payload.index];
                let ingradientToUpdate = {...ingradient,...action.payload.ingradient}
                let updatedIngradients = [...state.ingradients];
                updatedIngradients[action.payload.index] = ingradientToUpdate;
                return {
                    ...state.ingradients,ingradients: updatedIngradients
                }
            case shoppingListActions.DELETE_INGRADIENTS :
                return {
                    ...state,ingradients:state.ingradients.filter((stat,ind)=>{
                        return ind !== action.payload
                    })
                }
           default:
               return state
       }
}