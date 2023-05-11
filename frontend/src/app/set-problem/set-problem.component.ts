import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
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

type SetProblemRequest = {
  username: string,
  problemcode:string,
  problem: Problem,
  ACCESS_TOKEN:string
}
type SetProblemResponse = {
  accepted: string,
  msg: string
}
@Component({
  selector: 'app-set-problem',
  templateUrl: './set-problem.component.html',
  styleUrls: ['./set-problem.component.css']
})
export class SetProblemComponent implements OnInit {

  API_PATH: string = environment.API_PATH;
  url: string = `${this.API_PATH}/problemManagement/setProblem`;
  headers = { "Content-Type": "application/json" }

  username: string = '';
  ACCESS_TOKEN='';
  isInvalidProblemCode: boolean = false;
  isInValidForm: boolean = false;
  difficulty: string = 'easy';
  problemtags: string[] = environment.problemtags;
  msg: string = 'please fill all fields properly.';

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    if(this.cookieService.get('username') && this.cookieService.get('ACCESS_TOKEN')){
      this.username = this.cookieService.get('username')?this.cookieService.get('username'):'';
      this.ACCESS_TOKEN = this.cookieService.get('ACCESS_TOKEN')?this.cookieService.get('ACCESS_TOKEN'):'';
    }else{
      this.router.navigate(['/auth/login']);
    }
    
  }
  onSubmitProblem(f: NgForm): void {

    this.isInValidForm = false;
    if (f.valid) {
      f.value.tags = f.value.tags ? f.value.tags.toString().split(' ').join('').split(',') : ['general'];

      const setProblemReqeustBody: SetProblemRequest = {
        username: this.username,
        problemcode:f.value.problemcode,
        problem: f.value,
        ACCESS_TOKEN:this.ACCESS_TOKEN
      }
      console.log(setProblemReqeustBody)
      this.http.post<SetProblemResponse>(this.url, setProblemReqeustBody, { 'headers': this.headers }).subscribe((responseProblem: SetProblemResponse) => {
        console.log("response of setting Problem : ", responseProblem);
        if (responseProblem.accepted == 'yes') {
          const pathToNewProblem: string = 'problem/' + setProblemReqeustBody.problemcode;
          console.log("path to problem : ", pathToNewProblem);
          this.router.navigate([pathToNewProblem]);
        } else {
          this.msg = responseProblem.msg;
          this.isInValidForm = true;
        }
      },(error)=>{
        console.log("could not authenticate user",error)
        this.router.navigate(['/auth/login'])
      })
    } else {
      this.isInValidForm = true;
    }
    console.log(f.value);
  }

}
