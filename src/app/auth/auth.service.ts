import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { userModel } from "../shared/user.model";

export interface AuthResponse{
    idToken :	string,
    email :	string,
    refreshToken : string,
    expiresIn:string,
    localId	: string,
    registered ? : string;
}

@Injectable({
    providedIn : 'root'
})
export class AuthService{
    loading : boolean = false;
    user : BehaviorSubject<userModel> = new BehaviorSubject(null);
    constructor(private http:HttpClient,private route:Router){

    }

    autoLogin(){
        let userData = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }

        const {
            email,
            id,
            _token,
            _tokenExpiryDate
        } = userData
        
        let updatedUserData = new userModel(email,id,_token,new Date(_tokenExpiryDate))
        if(updatedUserData.token){
            this.user.next(updatedUserData)
            this.autoLogOut(new Date(_tokenExpiryDate).getTime() - new Date().getTime());
        }
    }

    autoLogOut(expirationDuration){
        setTimeout(()=>{
           this.logOut()
        },expirationDuration)
    }

    logOut(){
        this.user.next(null);
        this.route.navigate(["/"]);
    }

    throwError(errorRes){
        let errorMessage = 'An Error Occured';
            if(errorRes.error && errorRes.error.error){
                switch (errorRes.error.error.message) {
                    case "EMAIL_EXISTS":
                        errorMessage = 'Email Already exists'
                        break;
                    case "INVALID_PASSWORD" :
                        errorMessage = "Invalid Password";
                        break;
                    default:
                        errorMessage = 'An Error Occured';
                        break;

                }

                return throwError(errorMessage)
            }  
    }

    handleAuthentication(response){
        const expirationDate = new Date(new Date().getTime() + +response.expiresIn*1000)
        const user = new userModel(response.email,response.localId,response.idToken,expirationDate);
        localStorage.setItem('userData',JSON.stringify(user));
        this.user.next(user);
        this.autoLogOut(response.expiresIn*1000);
    }



    signUp(email:string,password:string){
        return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTfsZHD0tQvJxg9PiFIBoq29gSX4b3H3o`,
          {
            email : email,
            password : password,
            returnSecureToken : true
          }
        ).pipe(catchError(errorRes=>{
            return this.throwError(errorRes)
        }),tap(response=>{
            this.handleAuthentication(response);
        }))
    }

    logIn(email:string,password:string){
        return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTfsZHD0tQvJxg9PiFIBoq29gSX4b3H3o`,
        {
            email : email,
            password : password,
            returnSecureToken : true
        })  .pipe(catchError(errorRes=>{
            return this.throwError(errorRes)
        }),tap(response=>{
            this.handleAuthentication(response)
        }))
    }


}