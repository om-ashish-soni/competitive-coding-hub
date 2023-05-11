import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.prod';
import { NavbarComponent } from '../navbar/navbar.component';
type ProfileRequest = {
  username: string
}
type Profile = {
  username: String,
  fullname: String,
  country: String,
  state: String,
  city: String,
  profession: String,
  institute: String
}
type ProfileResponse = {
  accepted: string,
  profileData: Profile
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  API_PATH: string = environment.API_PATH;
  url: string = `${this.API_PATH}/user/getProfile`;
  headers = { "Content-Type": "application/json" }

  profilename: string = '';
  isRootUser: boolean = false;
  isInValidProfile: boolean = false;
  isFetchingProfile: boolean = false;
  profile: Profile = {
    username: '',
    fullname: '',
    country: '',
    state: '',
    city: '',
    profession: '',
    institute: ''
  }
  constructor(private route: ActivatedRoute,private router:Router, private http: HttpClient, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.isFetchingProfile = true;
    let paramProfileName: string | null = '';
    let username: string = '';
    if (this.cookieService.get('username')) {
      username = this.cookieService.get('username')
    }
    if (this.route.snapshot.paramMap.get('profileUserName')) {
      paramProfileName = this.route.snapshot.paramMap.get('profileUserName');
    }
    if (!username && !paramProfileName) {
      this.isInValidProfile = true;
    } else {
      if (paramProfileName) {
        this.profilename = paramProfileName
      } else {
        this.profilename = username;
      }

    }

    const profileRequestBody: ProfileRequest = {
      username: this.profilename
    }
    this.http.post<ProfileResponse>(this.url, profileRequestBody, { 'headers': this.headers }).subscribe((profileResponse: ProfileResponse) => {
      if (profileResponse.accepted == 'yes') {
        this.profile = profileResponse.profileData;
      } else {
        this.isInValidProfile = true;
      }
      this.isFetchingProfile = false;
    }, (error) => {
      console.log("auth expired")
      this.router.navigate(['/auth/login']);
    })

  }

}
