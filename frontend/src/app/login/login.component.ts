import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
type LoginResponse={
  accepted:string,
  userdirpath:string,
  ACCESS_TOKEN:string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  API_PATH: string = environment.API_PATH;
  url: string = `${this.API_PATH}/auth/login`;
  headers={ "Content-Type": "application/json" }
  body={}

  isInvalidCred:boolean=false;
  isLoggingIn:boolean=false;
  errorMessage:string="";
  constructor(private http : HttpClient,private router:Router,private cookieService : CookieService) {

  }

  ngOnInit(): void {
    this.cookieService.delete('username');
    this.cookieService.delete('password');
    this.cookieService.delete('ACCESS_TOKEN');
    // this.cookieService.delete('lang');
    // this.cookieService.delete('theme');
  }

  onLogin(f: NgForm) {
    if(f.valid){
      this.isLoggingIn=true;
      let { username, password }: { username: string, password: string } = f.value;
      this.body=f.value;
      this.http.post<LoginResponse>(this.url,this.body,{'headers':this.headers}).subscribe((response)=>{
        let status:string=response.accepted;
        let userdirpath:string=response.userdirpath;
        if(status=='yes'){
          this.isInvalidCred=false;
          this.cookieService.set('username',username,10,undefined,undefined,true,'Strict');
          this.cookieService.set('password',password,10,undefined,undefined,true,'Strict');
          const ACCESS_TOKEN=response.ACCESS_TOKEN;
          // console.log("ACCESS_TOKEN",ACCESS_TOKEN);
          this.cookieService.set('ACCESS_TOKEN',ACCESS_TOKEN,10,undefined,undefined,true,'Strict');
          this.router.navigate(['home'])
        }else{
          this.isInvalidCred=true;
          // alert('please enter valid data')
        }
        this.isLoggingIn=false;
      },(error)=>{
        this.isInvalidCred=true;
        console.log("could not authenticate , try again");
        console.log("could not authenticate , try again")
        console.log("error.msg: ",error.error.msg)
        this.errorMessage=error.error.msg;
        this.isLoggingIn=false;
      })
    }else{
      this.isInvalidCred=true;
    }
    
  }
}
