import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public userOrders : any = [];
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
    this.orderService.getUserOrders(this.customerId)
    .subscribe((res: any)=>{
      this.userOrders = res;
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
  


}
