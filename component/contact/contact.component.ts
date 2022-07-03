
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ContactService } from 'src/app/service/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactUsComponent implements OnInit {
  public contact=[] as any;
  constructor(private tostr: ToastrService,private _Route: Router,private contactService:ContactService) { }
  ngOnInit(): void {
  }
  contactForm =new FormGroup({
    name: new FormControl('',[Validators.required]),
    
    gmail:new FormControl('',[Validators.email,Validators.required]),
    
    country: new FormControl('',[Validators.required]),
    subject:new FormControl('',[Validators.required])

  });
  get name() {
    return this.contactForm.get('name');
 } 
 get gmail() {
  return this.contactForm.get('gmail');
} 
get country() {
  return this.contactForm.get('country');
} 
get subject() {
  return this.contactForm.get('subject');
} 

  

  
  
  addData(data:any){
    this.contactService.sendData(data).subscribe((data:any)=>this.contact=data);
    this.tostr.success("Thanks for contacting. Our support team will get back to you shortly.");
    this._Route.navigate(['/products']);
  }

}
