import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { NavbarComponent } from '../navbar/navbar.component';
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
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {

  API_PATH: string = environment.API_PATH;
  url: string = `${this.API_PATH}/problems/getProblems`;
  headers={ "Content-Type": "application/json" }
  

  isFetchingProblems:boolean=false;
  isErrorFetchingProblems:boolean=false;
  problemList:Problem[]=[]

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.isFetchingProblems=true;
    const getProblemsRequestBody:GetProblemsRequest={
      problemCriteria:{}
    }
    this.http.post<ProblemsResponse>(this.url,getProblemsRequestBody,{"headers":this.headers}).subscribe((response:ProblemsResponse)=>{
      if(response.accepted=='yes'){
        this.problemList=response.problemList;
      }else{
        this.isErrorFetchingProblems=true;
      }
      this.isFetchingProblems=false;
    })
  }

}
