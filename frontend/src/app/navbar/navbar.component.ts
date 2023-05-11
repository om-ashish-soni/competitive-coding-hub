import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username=''
  constructor(private router : Router,private cookieService:CookieService) { }

  ngOnInit(): void {
    if(!this.cookieService.get('username') || !this.cookieService.get('password')){
      this.router.navigate(['/auth/login'])
    }
    this.username=this.cookieService.get('username')
  }

}
