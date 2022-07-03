import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/Login/Services/app.LoginService';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  userLogin:boolean = false;
  isLoggedInUser = false;
  currentUser : any;
  currentUserName:any;
  constructor(private tostr: ToastrService,private api : ApiService, 
    private cartService : CartService,private _Route: Router,private loginservice: LoginService) {
    if(localStorage.getItem('currentUser') != undefined && localStorage.getItem('currentUser') != null){
      this.isLoggedInUser = true;
      let currentUser = JSON.parse(localStorage.getItem('currentUser')!).username;
      this.currentUserName = currentUser;
      this.loginservice.setUser( currentUser);

    }else{
      this.isLoggedInUser = false;
    }
    this.loginservice.getUser().subscribe((data:any) =>
      {
        this.currentUser = data ? data : '';
      })
   }

  ngOnInit(): void {
    this.api.getproduct()
    .subscribe((res: any)=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addtocart(item: any){
    if (this.isLoggedInUser) {
      this.cartService.addtoCart(item);
      this.tostr.success("Product added to Cart");      
    }
    else{
      this.tostr.success("Please login to add product in your cart");
      this._Route.navigate(['/Login']);
    }
    

  }
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

}

