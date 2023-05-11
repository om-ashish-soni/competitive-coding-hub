import { NavbarComponent } from './../navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private cookieService : CookieService) { 
    
  }

  ngOnInit(): void {
    
    if(!this.cookieService.get('username') || !this.cookieService.get('password')){
      this.router.navigate(['/auth/login'])
    }else{
      this.router.navigate(['/problems'])
    }
  }

}
