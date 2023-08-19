import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-rolling',
  templateUrl: './rolling.component.html',
  styleUrls: ['./rolling.component.css']
})
export class RollingComponent implements OnInit {

  @Input() text='Saraswati Online Judge';
  applicationName=environment.applicationName;

  constructor() { }

  ngOnInit(): void {
  }

}
