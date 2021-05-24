import { Injectable } from '@angular/core';
// import { from } from 'rxjs';
import { User } from '../app/user.service';
import { Repository } from '../app/repository.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GitService {
  user: User;
  userRep: Repository;

  constructor(private http: HttpClient) {
    this.user = new User('', '', '', 0, 0, 0, 0, '', '', '');
    this.userRep = new Repository('', '', '', '');
  }
  userRequest(search_term: any) {
    interface ApiResponse {
      avatar_url: any;
      login: string;
      bio: string;
      public_repos: number;
      public_gists: number;
      followers: number;
      following: number;
      url: string;
      location: string;
      email: string;

    }
    let headers = new HttpHeaders({ 'Authorization': 'token ' + environment.apiKey })
    let options = { headers: headers }
    let final_url = environment.apiUrl + search_term;
    let promise = new Promise<void>((resolve, reject) => {
      this.http.get<ApiResponse>(final_url, options).toPromise().then((response) => {
        this.user = response;

        resolve();
        // console.log(this.user)
      },
        (error) => {
          reject();
          // console.log(error)
        }
      );
    });
    return promise;
  }

  displayRepos(user: any) {
    interface apiResponse {
      html_url: string,
      name: string,
      description: string,
      language: string

    }


    let url = environment.apiKey + user + '/repos' + '?access_token=' + environment.apiUrl;
    let promise = new Promise<void>((resolve, reject) => {
      this.http.get<apiResponse>(url).toPromise().then(response => {
        this.userRep = response;
        resolve()

      }, error => {
        reject();
        // console.log(error)
      })

    });
    return promise
  }


}