import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from './Models/app.LoginModel';
import { LoginService } from './Services/app.LoginService';

@Component({
    templateUrl: './app.login.html',
    styleUrls: ['./LoginComponent.css'
       
    ]
})

export class LoginComponent implements OnInit
{
    
    ngOnInit(): void {
        localStorage.clear();
    }
    private _loginservice;
    output: any;

    actionButtonLabel: string = 'Retry';
    action: boolean = false;
    setAutoHide: boolean = true;
    autoHide: number = 2000;
    


    constructor(private tostr: ToastrService,private _Route: Router, loginservice: LoginService) 
    {
        this._loginservice = loginservice;
    }

    LoginModel: LoginModel = new LoginModel();

    onSubmit() 
    {
        this._loginservice.validateLoginUser(this.LoginModel).subscribe(
            (            response: { Token: null; Usertype: string; }) => 
            {     
                if (response.Token == null && response.Usertype == "0") 
                {
                    this.tostr.error("Invalid Username and Password");
                    this._Route.navigate(['Login']);
                }

                if (response.Usertype == "1") 
                {

                    this.tostr.success("Logged in Successfully");

                    this._Route.navigate(['/User/Orders']);
                }

                if (response.Token != null && response.Usertype != "0" && response.Usertype != "1") 
                {                   
                  
                    this.tostr.success("Logged in Successfully");
                    this._Route.navigate(['/products']);
                }
            });

    }
}