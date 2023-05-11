import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as ace from "ace-builds";
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.prod';
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-textmate"; 
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-terminal";
// import "../../../node_modules/ace-builds/src-min";
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
type RunCodeRequest = {
  username: string,
  inp: string,
  lang: string,
  code: string,
  ACCESS_TOKEN: string
}
type SubmitCodeRequest = {
  problemcode: string,
  username: string,
  inp: string,
  lang: string,
  code: string,
  ACCESS_TOKEN: string
}
type RunCodeResponse = {
  result: {
    output: string,
    error: string,
    executionTime: number
  }
}
type SubmitCodeResponse = {
  result: {
    status: string,
    output: string,
    error: string,
    executionTime: number
  },
  problem: Problem
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {

  @Input() isProblem: boolean = false;
  @Input() problemcode: string = '';
  @Input() sampleinput: string = '';
  @Input() setProblem: any = null;
  
  status: string = '';

  @ViewChild("editor") private editor!: ElementRef<HTMLElement>;
  @ViewChild("inputBox") private inputBox!: ElementRef<HTMLTextAreaElement>;
  @ViewChild("outputBox") private outputBox!: ElementRef<HTMLTextAreaElement>;
  @ViewChild("statusComponent") private statusComponent!: ElementRef<HTMLTextAreaElement>;
  
  API_PATH: string = environment.API_PATH;
  runurl: string = `${this.API_PATH}/executor/run`;
  submiturl: string = `${this.API_PATH}/submit/judge`;
  headers = { "Content-Type": "application/json" }

  fontsizes: string[] = environment.fontsizes;
  fontsize: string = '20px';
  ACCESS_TOKEN: string = '';
  isSubmitting: boolean = false;
  isSubmitted: boolean = false;
  isRunning: boolean = false;
  isRan: boolean = false;
  username: string = '';
  lang: string = 'python';
  code: string = '';
  theme: string = 'monokai';
  inp: string = '';
  op: string = '';
  executionTime: number = 0;
  langs: string[] = environment.langs;
  themes: string[] = environment.themes;
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {
    if (this.cookieService.get('username') && this.cookieService.get('ACCESS_TOKEN')) {
      this.username = this.cookieService.get('username') ? this.cookieService.get('username') : '';
      this.ACCESS_TOKEN = this.cookieService.get('ACCESS_TOKEN') ? this.cookieService.get('ACCESS_TOKEN') : '';
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  changeFontSize(newFontSize: string): void {
    console.log("font-size: ", newFontSize);

  }
  scrollToOutput(): void {
    this.outputBox.nativeElement.scrollIntoView({behavior: "smooth"});
  }
  scrollToStatus():void{
    this.statusComponent.nativeElement.scrollIntoView({behavior: "smooth"});
  }
  getUserName(): string {
    return this.cookieService.get('username');
  }
  changeLang(newLang: string): void {

    console.log("newLang : ", newLang);
    this.lang = newLang;
    this.cookieService.set('lang', newLang);
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setMode(`ace/mode/${this.lang}`);
    this.restoreBackupCode();
    // aceEditor.setValue('');
  }
  changeTheme(newTheme: string): void {
    this.theme = newTheme;
    this.cookieService.set('theme', newTheme);
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.setTheme(`ace/theme/${this.theme}`);
  }
  setInput(newInput: string): void {
    this.inp = newInput;
  }
  getCode(): string {
    return ace.edit(this.editor.nativeElement).getValue();
    
  }
  setCode(newCode:string):void{
    ace.edit(this.editor.nativeElement).setValue(newCode);
  }
  getBufferKey():string{
    return this.lang+"_"+"template";
  }
  backupCodeWithoutAlert():void{
    this.cookieService.set(this.getBufferKey(),this.getCode(),360,undefined,undefined,true,'Strict');
  }
  backupCode():void{
    this.cookieService.set(this.getBufferKey(),this.getCode(),360,undefined,undefined,true,'Strict');
    alert('Your code is saved as backup');
  }
  getBackupCode():string{
    return this.cookieService.get(this.getBufferKey())?this.cookieService.get(this.getBufferKey()):'';
  }
  restoreBackupCode():void{
    this.setCode(this.getBackupCode());
  }
  runCode(): void {
    console.log("run code called : ", Date().toString())
    console.log("input is : ", this.inp);
    this.isRunning = true;
    this.isRan = false;
    this.op = '';
    const runRequestBody: RunCodeRequest = {
      username: this.getUserName(),
      lang: this.lang,
      inp: this.inp,
      code: this.getCode(),
      ACCESS_TOKEN: this.ACCESS_TOKEN
    }
    this.http.post<RunCodeResponse>(this.runurl, runRequestBody, { 'headers': this.headers }).subscribe((response: RunCodeResponse) => {
      if (response.result.error) this.op = response.result.error;
      else {
        this.op = response.result.output;
        this.executionTime = response.result.executionTime;
      }
      this.isRunning = false;
      this.isRan = true;
      this.scrollToOutput();
    }, (error) => {
      console.log("could not authenticate user", error)
      this.router.navigate(['/auth/login'])
    })
  }
  submitCode(): void {
    console.log("submit code called : ", Date().toString())
    this.isSubmitting = true;
    this.isSubmitted = false;
    this.isRan = false;
    this.op = ''
    const submitRequestBody: SubmitCodeRequest = {
      problemcode: this.problemcode,
      username: this.getUserName(),
      lang: this.lang,
      inp: '',
      code: this.getCode(),
      ACCESS_TOKEN: this.ACCESS_TOKEN
    }
    this.http.post<SubmitCodeResponse>(this.submiturl, submitRequestBody, { 'headers': this.headers }).subscribe((response: SubmitCodeResponse) => {
      if (response.result.error) this.op = response.result.error;
      this.executionTime = response.result.executionTime;
      this.status = response.result.status;
      this.isSubmitting = false;
      this.isSubmitted = true;
      this.isRan = true;
      const problem = response.problem;
      console.log('response', response)
      if (response.problem && this.setProblem) {
        this.setProblem(problem)
      }
      this.scrollToStatus();
    }, (error) => {
      console.log("could not authenticate user : ", error);
      this.router.navigate(['/auth/login']);
    })
  }

  ngAfterViewInit(): void {

    if (!this.cookieService.get('lang')) {
      this.cookieService.set('lang', this.lang);
    } else {
      this.lang = this.cookieService.get('lang');
    }
    if (!this.cookieService.get('theme')) {
      this.cookieService.set('theme', this.theme);
    } else {
      this.theme = this.cookieService.get('theme');
    }

    // ace.require("ace/ext/language_tools");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    // ace.config.set('basePath', '../../../node_modules/ace-builds/src-noconflict');
    // ace.config.set(
    //   "basePath",
    //   "https://unpkg.com/ace-builds@1.3.3/src-noconflict"
    // );
    

    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("");

    aceEditor.setTheme(`ace/theme/${this.theme}`);
    aceEditor.session.setMode(`ace/mode/${this.lang}`);
    aceEditor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true
    })
    this.setInput(this.sampleinput);
    this.restoreBackupCode();
  }


}
