import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordModel } from './Models/ResetPasswordModel';
import { ResetPasswordService } from './Services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  ngOnInit(): void {
    localStorage.clear();
    
}
private _resetPasswordService;
output: any;

actionButtonLabel: string = 'Retry';
action: boolean = false;
setAutoHide: boolean = true;
autoHide: number = 2000;

errorMessage: any;
contactNo : string = '';
userExists = false;
isOtpSend = false;
isPasswordMatched = false;
// config = new MatSnackBarConfig();
                    


constructor(private tostr: ToastrService,private _Route: Router, resetPasswordService: ResetPasswordService) 
{
    this._resetPasswordService = resetPasswordService;
}

ResetPasswordModel: ResetPasswordModel = new ResetPasswordModel();

// ngDoCheck(){
//     if (!(this.ResetPasswordModel.Password = this.ResetPasswordModel.Password)) {
//         this.snackBar.open("Password and Confirm Password doesn't matched", this.action ? this.actionButtonLabel : undefined, this.config);
        
//     }
// }

onSubmit() 
{
    if (!this.isOtpSend) {
        
        this.contactNo = this.ResetPasswordModel.Password;        
        this._resetPasswordService.IsUserPhoneExists(this.contactNo).subscribe(
            allUsers => {
                this.userExists = allUsers;                
                if (this.userExists) {
                    this.tostr.success("OTP has been sent to your number");
                    this.isOtpSend = true;
                    this.ResetPasswordModel.Password = ''
                    
                } else {
                    this.tostr.error("Please enter your correct number");
                    this.ResetPasswordModel.Password = ''                    
                }               
                
            },
            error => this.errorMessage = <any>error

            
        );
    }

    if (this.isOtpSend) {        
        if (!(this.ResetPasswordModel.Password == this.ResetPasswordModel.ConfirmPassword)) {
            this.tostr.error("Password and Confirm Password doesn't matched");
                               
        }
        
        if ((this.ResetPasswordModel.Password == this.ResetPasswordModel.ConfirmPassword)) {

            this.ResetPasswordModel.ContactNumber = this.contactNo;
            this._resetPasswordService.changePassword(this.ResetPasswordModel).subscribe(
                response => {

                    if (response) {
                        this.tostr.success("Password has been changed");
                        this._Route.navigate(['/Login']);                        
                        
                    } else {
                        this.tostr.error("Please enter correct OTP");
                                            
                    }               
                    
                },
                error => this.errorMessage = <any>error

            );                
            
        }
        
    }
   
   

}

}
