import { DataStorageService } from "./recipes/data-storage.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router'
import { Injectable } from "@angular/core";
@Injectable({
    providedIn : 'root'
})
export class RecipeResolverService implements Resolve<any>{
    constructor(private dataStorageService:DataStorageService){

    }

    resolve( route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
       return this.dataStorageService.fetchData();
    }
}