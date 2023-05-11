import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rolling',
  templateUrl: './rolling.component.html',
  styleUrls: ['./rolling.component.css']
})
export class RollingComponent implements OnInit {

  @Input() text='Saraswati Online Judge';
  constructor() { }

  ngOnInit(): void {
  }

}
