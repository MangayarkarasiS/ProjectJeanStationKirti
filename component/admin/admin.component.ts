import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ProductadService} from 'src/app/service/productad.service'
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public product=[] as any;
  errorMessage:any;
  ProductForm =new FormGroup({
    
    Title: new FormControl('',[Validators.required]),
    Description: new FormControl('',[Validators.required]),
    Price:new FormControl('',[Validators.required]),
    Category:new FormControl('',[Validators.required]),
    Rating:new FormControl('',[Validators.required]),
    ImageLink:new FormControl('',[Validators.required])

  });

  constructor(private tostr: ToastrService,private _Route: Router,private productservice:ProductadService) { }

  ngOnInit(): void {
    
  }
  addproduct(data:any){
    // alert("success");
    console.log(data);
    // this.productservice.sendUser(data).subscribe(res=> this.product=data);
     this.productservice.addProduct(data).subscribe(data => this.product=data);
     if (this.product != null) {
      this.tostr.success("Product added");
      this.productservice.getUser().subscribe(data =>
        {
          this.product=data;
        },
        error => this.errorMessage = <any>error
        
        );       
        
        setTimeout(() => 
        {
          this._Route.navigate(['/view']);
        },
        500);
        // this._Route.navigate(['/view']);      
     }
  }
  get Id(){
    return this.ProductForm.get('Id');
  }
  get Title(){
    return this.ProductForm.get('Title');
  }
  get Description(){
    return this.ProductForm.get('Description');
  }
  get Price(){
    return this.ProductForm.get('Price');
  }
  get Category(){
    return this.ProductForm.get('Category');
  }
  get Rating(){
    return this.ProductForm.get('Rating')
  }
  get ImageLink(){
    return this.ProductForm.get('ImageLink')
  }
  
}


