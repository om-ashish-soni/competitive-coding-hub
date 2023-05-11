import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
type GetProblemsRequest={
  problemCriteria:Object
}
type ProblemsResponse={
  accepted:string,
  problemList:Problem[]
}
@Component({
  selector: 'app-difficulty-problems',
  templateUrl: './difficulty-problems.component.html',
  styleUrls: ['./difficulty-problems.component.css']
})
export class DifficultyProblemsComponent implements OnInit {
  difficulty:string="";
  isInValidDifficulty:boolean=false;
  
  API_PATH: string = environment.API_PATH;
  url: string = `${this.API_PATH}/problems/getProblems`;
  headers={ "Content-Type": "application/json" }
  
  isFetchingProblems:boolean=false;
  isErrorFetchingProblems:boolean=false;
  problemList:Problem[]=[];

  constructor(private route:ActivatedRoute,private router:Router,private http:HttpClient) { }
  
  refineList():void{
    this.problemList=this.problemList.filter((problem:Problem)=>{
      return problem.difficulty == this.difficulty;
    });

  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('difficulty')) {
      this.difficulty = String(this.route.snapshot.paramMap.get('difficulty'));
    } else {
      this.isInValidDifficulty = true;
      this.router.navigate(['/problems']);
    }
    this.isFetchingProblems=true;
    const getProblemsRequestBody:GetProblemsRequest={
      problemCriteria:{}
    }
    this.http.post<ProblemsResponse>(this.url,getProblemsRequestBody,{"headers":this.headers}).subscribe((response:ProblemsResponse)=>{
      console.log(response)
      if(response.accepted=='yes'){
        this.problemList=response.problemList;
        this.refineList();
      }else{
        this.isErrorFetchingProblems=true;
      }
      this.isFetchingProblems=false;
      
    })
  
  }

}
