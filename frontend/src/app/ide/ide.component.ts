import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EditorComponent } from '../editor/editor.component';
@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IdeComponent implements OnInit {

  

  constructor(private cookieService : CookieService) { }

  
  ngOnInit(): void {
    
  }

}
