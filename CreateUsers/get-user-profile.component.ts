import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from './Models/app.UserModel';
import { UserService } from './Services/app.UserRegistration.Service';

@Component({
  selector: 'app-get-user-profile',
  templateUrl: './get-user-profile.component.html',
  styleUrls: ['./get-user-profile.component.css'              
              ]
})
export class GetUserProfileComponent implements OnInit {

  UserModel: UserModel = new UserModel();
  private _userService;
  output: any;
  Id: any;
  errorMessage: any;
  data:any;
  userId:any;
  tokenData:any;


  constructor(
      
      private _Route: Router,
      private _routeParams: ActivatedRoute,
      private userService: UserService
  ) {
    this.tokenData = localStorage.getItem('currentUser');
      this._userService = userService;
      this.data = JSON.parse(this.tokenData);
      
      this.userId = this.data.userId;
  }

  ngOnInit(): void {
      // this.Id = this._routeParams.snapshot.params['UserId'];
      this.Id = this.userId;

      // GetRoleById
      this._userService.GetUserId(this.Id).subscribe(
          userModel => {
              this.UserModel = userModel;
          },
          error => this.errorMessage = <any>error);
  }  

}
