import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() text:string='';
  @Input() isHidden:boolean=false;
  constructor() { }
  toggleHidden():void{
    this.isHidden=!this.isHidden;
  }
  ngOnInit(): void {
  }

}
