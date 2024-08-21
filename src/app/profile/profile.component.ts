import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile!: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
        console.log(profile,"profile")
      });
  }
}

