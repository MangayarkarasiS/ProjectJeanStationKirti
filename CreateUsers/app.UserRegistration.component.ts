import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { DatePipe } from '@angular/common';
import { UserModel } from './Models/app.UserModel';
import { UserService } from './Services/app.UserRegistration.Service';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './app.UserRegistration.html',
    styleUrls: [ './app.UserRegistration.css'
       
    ]
})


export class UserRegistrationComponent implements OnInit {
    UserModel: UserModel = new UserModel();
    private _userService;
    output: any;
    actionButtonLabel: string = 'Retry';
    action: boolean = false;
    setAutoHide: boolean = true;
    autoHide: number = 2000;    
    ngOnInit(): void {


    }

    constructor(
        private tostr: ToastrService,
        // private datePipe: DatePipe,
        private _Route: Router,
        private userService: UserService
    ) {
        this._userService = userService;
    }
    onSubmit() 
    {
      

        this._userService.SaveUser(this.UserModel).subscribe(
            response => {                    
            
            this.output = response
            if (this.output.StatusCode == "409") {
                this.tostr.error("User Already Exists");
            }
            else if (this.output.StatusCode == "200") {
                this.tostr.success("User Created Successfully");
                this._Route.navigate(['/User/All']);
            }
            else {
                this.tostr.error("Something Went Wrong");
            }
        });
    }
   
    
}