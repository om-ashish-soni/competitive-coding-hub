import { EditorComponent } from './../editor/editor.component';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
type ProblemDisplay = {
  problemcode: string[],
  description: string[],
  constraints: string[],
  sampleinput: string[],
  sampleoutput: string[],
  input: string[],
  output: string[],
  difficulty: string[],
  timelimit: number,
  memorylimit: number,
  setter: string,
  tester: string,
  correctSubmissions: number,
  totalSubmissions: number,
  tags: string[]
}
type GetProblemRequest = {
  problemcode: string
}
type ProblemResponse = {
  accepted: string,
  problem: Problem | undefined,
}
@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit, AfterViewInit {

  @ViewChild("editorComponent") private editorComponent!: ElementRef<HTMLElement>;
  @ViewChild("sampleOutput") private sampleOutput!: ElementRef<HTMLElement>;
  @ViewChild("correctSubmissions") private correctSubmissions!: ElementRef<HTMLElement>;
  @ViewChild("totalSubmissions") private totalSubmissions!: ElementRef<HTMLElement>;
  
  API_PATH: string = environment.API_PATH;
  url: string = `${this.API_PATH}/problems/getProblem`;
  headers = { "Content-Type": "application/json" }

  problemcode: string | null = '';
  isInValidProblemCode: boolean = false;
  isFetchingProblem = false;
  isSubmissionsUpdated:boolean=true;

  problem: Problem = {
    problemcode: '',
    description: '',
    constraints: '',
    sampleinput: '',
    sampleoutput: '',
    difficulty: '',
    timelimit: 5,
    memorylimit: 500,
    setter: '',
    tester: '',
    correctSubmissions: 0,
    totalSubmissions: 0,
    tags: []
  };
  problemDisplay: ProblemDisplay = {
    problemcode: [''],
    description: [''],
    constraints: [''],
    sampleinput: [''],
    sampleoutput: [''],
    input: [''],
    output: [''],
    difficulty: [''],
    timelimit: 0,
    memorylimit: 0,
    setter: '',
    tester: '',
    correctSubmissions: 0,
    totalSubmissions: 0,
    tags: []
  };

  constructor(private route: ActivatedRoute,private router:Router,private http: HttpClient) { }

  setProblem(newProblem:Problem){
    console.log("in setProblem")
    this.problem=newProblem;
    this.correctSubmissions.nativeElement.innerText=newProblem.correctSubmissions.toString();
    this.totalSubmissions.nativeElement.innerText=newProblem.totalSubmissions.toString();

  }
  refineProblem(): void {
    // let prop: keyof Problem;
    // for (prop in this.problem) {
    //   if(typeof(this.problem[prop])=='string'){
    //     this.problemDisplay[prop] = this.problem[prop].toString().split(/\r?\n/)
    //   }
    // }
    if(this.problem.description) this.problemDisplay.description=this.problem.description.toString().split(/\r?\n/)
    if(this.problem.constraints) this.problemDisplay.constraints=this.problem.constraints.toString().split(/\r?\n/)
    if(this.problem.sampleinput) this.problemDisplay.sampleinput=this.problem.sampleinput.toString().split(/\r?\n/)
    if(this.problem.sampleoutput) this.problemDisplay.sampleoutput=this.problem.sampleoutput.toString().split(/\r?\n/)

    this.isFetchingProblem = false;

  }
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('problemcode')) {
      this.problemcode = this.route.snapshot.paramMap.get('problemcode');
    } else {
      this.isInValidProblemCode = true;
    }

    const getProblemRequestBody: GetProblemRequest = {
      problemcode: this.problemcode ? this.problemcode : ''
    }

    this.isFetchingProblem = true;

    this.http.post<ProblemResponse>(this.url, getProblemRequestBody, { 'headers': this.headers }).subscribe((problemResponse: ProblemResponse) => {
      console.log(problemResponse)
      if (problemResponse.accepted == 'yes') {
        this.problem = problemResponse.problem?problemResponse.problem:this.problem;
        this.isInValidProblemCode = false;
        this.refineProblem();
      } else {
        this.isInValidProblemCode = true;
      }
      this.isFetchingProblem = false;
    },(error)=>{
      console.log("auth expired");
      this.router.navigate(['/auth/login']);
    })


  }

  ngAfterViewInit(): void {

  }

}
