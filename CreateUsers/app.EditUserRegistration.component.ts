import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from './Models/app.UserModel';
import { UserService } from './Services/app.UserRegistration.Service';
import { ToastrService } from 'ngx-toastr';
// import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
    templateUrl: './app.EditUserRegistration.html',
    styleUrls: ['./app.EditUserRegistration.css'
        
    ]
})


export class EditUserRegistrationComponent implements OnInit {
    UserModel: UserModel = new UserModel();
    private _userService;
    output: any;
    Id: any;
    errorMessage: any;
    data:any;
    userId:any;
    actionButtonLabel: string = 'Retry';
    action: boolean = false;
    setAutoHide: boolean = true;
    autoHide: number = 2000;   
    tokenData:any;


    constructor(
        private tostr: ToastrService,
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
                this.UserModel = userModel

            },
            error => this.errorMessage = <any>error);
    }



    onSubmit() {       
        
        this.UserModel.UserId = this.Id;
        this._userService.UpdateUser(this.UserModel).subscribe(
            response => {
                this.output = response
                if (this.output.StatusCode == "409") {
                    // alert('User Already Exists');
                    this.tostr.error('User Already Exists');
                }
                else if (this.output.StatusCode == "200") {
                    // alert('User Details Updated Successfully');
                    this.tostr.success('User Details Updated Successfully')
                    this._Route.navigate(['/User/Profile']);
                }
                else {
                    alert('Something Went Wrong');
                }
            });
    }
}