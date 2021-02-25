import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../recipes/data-storage.service';
import { RecipeService } from '../recipes/receipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy,OnInit {
  userSubscription: Subscription;
  isAuthenticated : boolean = false
  constructor(
    private dataStorageService:DataStorageService,
    private recipeService:RecipeService,
    private authService : AuthService,
    private route : Router
  ){

  }

  ngOnInit(){
    this.userSubscription = this.authService.user.subscribe(loggedInUser=>{
      this.isAuthenticated = !!loggedInUser
    })
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
  saveData(){
    this.dataStorageService.storeData()
  }

  fetchData(){
    this.dataStorageService.fetchData().subscribe(data=>{
      this.recipeService.setRecipe(data);
    })
  }

  onLogout(){
    this.authService.logOut()
  }
}
