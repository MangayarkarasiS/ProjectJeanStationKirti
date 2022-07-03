import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public CartInitial = 0;
  public productCount = 0;
  public products : any = [];
  public grandTotal !: number;
  orders:any;
  tokendata:any;
  data:any;
  customerId:any;
  constructor(private tostr: ToastrService,private _Route: Router,private cartService : CartService,private orderService : OrderService) {
    this.tokendata = localStorage.getItem('currentUser')
        this.data = JSON.parse(this.tokendata);
        if (this.tokendata != null) {
          this.customerId = JSON.parse(localStorage.getItem('currentUser')!).userId;
            // this.userLogin = true;
        } 
   }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe((res: any)=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
    this.tostr.error("One product removed from the Cart");
  }
  emptycart(){
    this.cartService.removeAllCart();
    this.tostr.error("All product removed from the Cart");
  }
  addtoCart(){
    return this.productCount++;
  }
  removeCart(){
    return this.productCount--;
  }
  
  

  

  addOrder(){
    this.orderService.addOrders(this.products,this.customerId).subscribe((data:any) =>
    {
      if(data){
        this.cartService.removeAllCart();
        //this.tostr.success("Order added");      
        this._Route.navigate(['/payment']);

      }
      else{
        this.tostr.error("Error in adding Orders "); 

      }
    })

    
    //  if (this.orders != null) {
    //   this.tostr.success("Order added");
      
    //   this._Route.navigate(['/payment']);      
    //  }
  }

}
