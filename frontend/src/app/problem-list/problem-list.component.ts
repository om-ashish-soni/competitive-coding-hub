import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
type Problem = {
  problemcode: string,
  description: string,
  constraints: string,
  sampleinput: string,
  sampleoutput: string,
  difficulty: string,
  timelimit: number,
  memorylimit: number,
  setter: string,
  tester: string,
  correctSubmissions: number,
  totalSubmissions: number,
  tags: string[]
}
@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  @Input() problemList:Problem[]=[];
  @Input() difficulty:string='all';
  
  constructor(private http:HttpClient,private router:Router) { }

  difficulties:string[]=['all','easy','medium','hard'];
  
  tag:string='all';
  changeDifficulty(newDifficulty:string):void{
    if(newDifficulty=='all'){
      this.router.navigate(['/problems']);
    }else{
      this.router.navigate([`/problems/difficulty/${newDifficulty}`]);
    }
  }

  ngOnInit(): void {
    
  }

}
