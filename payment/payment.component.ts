import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
// import { AuthService } from '../services/auth.service';
// import {Pay} from '../payment';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private tostr: ToastrService,private _Route: Router,private authService:AuthService) { 
    this.tokendata = localStorage.getItem('currentUser')
    this.data = JSON.parse(this.tokendata);
    if (this.tokendata != null) {
      this.customerId = JSON.parse(localStorage.getItem('currentUser')!).userId;
        // this.userLogin = true;
    } 
  }
  isAccountCreated:boolean=false;
  displayMsg="";
  condition:string="";
  option : any;
  shippin:any;
  tokendata:any;
  data:any;
  customerId:any;
  getpayment(payment:any){
    console.log(payment);
    this.selectedPayment=payment.target.value;
  }
  selectedPayment:string="";

  ngOnInit(): void {
  }
  paymentForm=new FormGroup({
    
    paymentoption:new FormControl("",[Validators.required]),
    shippingaddress:new FormControl("",[Validators.required]),
    netbankingId:new FormControl("",[Validators.required,Validators.pattern('0-9')]),
    netbankingpassword:new FormControl("",[Validators.required]),
    upiid:new FormControl("",[Validators.required,Validators.email,]),
    debitholdername:new FormControl("",[Validators.required,Validators.pattern('A-Za-z')]),
    debitcardnumber:new FormControl("",[Validators.required,Validators.pattern('[0-9]'),Validators.max(12)]),
    debitcardpassword:new FormControl("",[Validators.required]),
    creditholdername:new FormControl("",[Validators.required,Validators.pattern('A-Za-z')]),
    creditcardnumber:new FormControl("",[Validators.required,Validators.pattern('[0-9]'),Validators.max(12)]),
    creditcardpassword:new FormControl("",[Validators.required]),
  });

get PaymentOption(){
  return this.paymentForm.get('paymentoption') as FormControl;
}
get ShippingAddress(){
  return this.paymentForm.get('shippingaddress') as FormControl; 
}
get NetBankingID(){
  return this.paymentForm.get('netbankingId') as FormControl;
}
get NetBankingPassword(){
  return this.paymentForm.get('netbankingpassword') as FormControl;
}
get UPI(){
  return this.paymentForm.get('upiid') as FormControl;
}
get DebitHolderName(){
  return this.paymentForm.get('debitholdername') as FormControl;
}
get DebitCardNumber(){
  return this.paymentForm.get('debitcardnumber') as FormControl;
}
get DebitCardPassword(){
  return this.paymentForm.get("debitcardpassword") as FormControl;
}
get CreditHolderName(){
  return this.paymentForm.get('creditholdername') as FormControl;
}
get CreditCardNumber(){
  return this.paymentForm.get('creditcardnumber') as FormControl;
}
get CreditCardPassword(){
  return this.paymentForm.get("creditcardpassword") as FormControl;
}


id:number=1;
paymentSubmit(){
  
    if(this.paymentForm){
      
      console.log(this.paymentForm.value);
      this.option=this.paymentForm.value.paymentoption;
      this.shippin=this.paymentForm.value.shippingaddress;
      if(this.option=='' || this.shippin=='')
      {
        this.displayMsg="Please Fill All Value";
        this.isAccountCreated=false;
      }
      else
      {
      this.authService.payment([this.option,this.shippin],this.customerId).subscribe((res: string)=>{

          if(res=="Success")
          {
            this.displayMsg="Payment is completed";
            this.isAccountCreated=true;
            this.tostr.success("Order Placed Successfully");
            this._Route.navigate(['/user/orders']);
           
          }
          else
          {
            this.displayMsg="Some server Problem is occured";
            this.isAccountCreated=false;
            this.tostr.success("Some error occured");
            console.log(res);
          }
        
        
       
     
      });}
      
    }
}

}


