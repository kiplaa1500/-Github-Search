import { Component, OnInit } from '@angular/core';
import { GitService } from '../git.service';
import { HttpClient } from '@angular/common/http'
import { User } from '../user.service'
import { Repository } from '../repository.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  userRep: any;
  repos : any

  constructor(private gitService: GitService) {
    this.userRep = new Repository('', '', '', '');
  }
  performSearch(searchTerm: any) {
    this.gitService.userRequest(searchTerm).then((_success) => {
      this.user = this.gitService.user
    })

    this.gitService.displayRepos(searchTerm).then((_success) => {
      this.userRep = this.gitService.userRep
      console.log(this.userRep)
    },
      (error) => {
        console.log(error)
      }
    )
  }
  ngOnInit(){
    this.performSearch('kiplaa1500')
  }
}