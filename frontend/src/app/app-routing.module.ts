import { DifficultyProblemsComponent } from './difficulty-problems/difficulty-problems.component';
import { TagProblemsComponent } from './tag-problems/tag-problems.component';
import { ProblemComponent } from './problem/problem.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { IdeComponent } from './ide/ide.component';
import { ProblemsComponent } from './problems/problems.component';
import { LogoutComponent } from './logout/logout.component';
import { SetProblemComponent } from './set-problem/set-problem.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children:[
      {
        path:'login',
        component:LoginComponent,
      },
      {
        path:'signin',
        component:SigninComponent
      },
      {
        path:'logout',
        component:LogoutComponent
      }
    ]
  },
  {
    path:'ide',
    component:IdeComponent
  },
  {
    path:'problems/difficulty/:difficulty',
    component:DifficultyProblemsComponent
  },
  {
    path:'problems/tags/:tag',
    component:TagProblemsComponent
  },
  {
    path:'problems',
    component:ProblemsComponent
  },
  {
    path:'problem/:problemcode',
    component:ProblemComponent
  },
  {
    path:'profile/:profileUserName',
    component:ProfileComponent
  },
  {
    path:'set-problem',
    component:SetProblemComponent
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/home"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
