import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-user-order-status',
  templateUrl: './user-order-status.component.html',
  styleUrls: ['./user-order-status.component.css']
})
export class UserOrderStatusComponent implements OnInit {

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
    this.orderService.getAllUserOrders()
    .subscribe((res: any)=>{
      this.userOrders = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  itemDelivered(order: any){    
    this.orderService.itemDelivered(order.Id)
    .subscribe((res: any)=>{
       if (res) {
        this.orderService.getAllUserOrders()
        .subscribe((res: any)=>{
          this.userOrders = res;
          this.grandTotal = this.cartService.getTotalPrice();
        });
        
        this.tostr.success("Product status changed")        
       }
      
    })
  } 

}
