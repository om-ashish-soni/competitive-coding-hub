import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router : Router,private cookieService : CookieService) { }

  ngOnInit(): void {
    this.cookieService.delete('username');
    this.cookieService.delete('password');
    this.cookieService.delete('ACCESS_TOKEN');
    // this.cookieService.delete('lang');
    // this.cookieService.delete('theme');
    this.router.navigate(['/auth/login'])
  }

}
