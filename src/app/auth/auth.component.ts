import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode : boolean = true;
  error : string;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  

  swithLoginMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  submitForm(loginForm:NgForm){
    if(!loginForm.valid){
      return
    }

    let email = loginForm.value.email;
    let password = loginForm.value.password;
    let authenticate : Observable<AuthResponse>
    if(this.isLoginMode){
      authenticate = this.authService.logIn(email,password)
    }else{

      authenticate = this.authService.signUp(email,password)
    }

    authenticate.subscribe(data=>{
      this.authService.loading = false;
      console.log(data);
      loginForm.resetForm();
      this.router.navigate(['/recipes']);
    },error=>{
      this.authService.loading = false;
      this.error = error;
      console.log(error);
    })
  }

}
