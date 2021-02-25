import { isPlatformBrowser } from '@angular/common';
import { Component, Output,Inject , PLATFORM_ID, Injectable} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  loadedItem = 'recipe';
  userSubscription : Subscription;
  isAuthenticated : boolean = false;
  constructor(
    public authService:AuthService,
    @Inject(PLATFORM_ID) private platformId
    ){
     if(isPlatformBrowser(this.platformId)){
      this.authService.autoLogin();
     }
  }

  
  selectItem(feature:string){
    this.loadedItem = feature;
  }
}
