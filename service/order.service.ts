import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private url:string="http://localhost:49658/api";
  constructor(private http:HttpClient) { }
  public getUserOrders(id:any){
    return this.http.get(this.url+"/Order?customerId="+id);
   }
   public addOrders(requestdata:any,customerId :any){
     return this.http.post(this.url+"/Order?customerId="+customerId,requestdata);
   }

   public getAllUserOrders(){
    return this.http.get(this.url+"/Order/GetAllUserOrders");
   }
 
   public updateuser(requestdata:any){
    return this.http.put(this.url,requestdata);
   }
   public deleteuser(requestdata:any){
    return this.http.delete(this.url+"/"+requestdata);
   }

   public itemDelivered(orderId :any){
    return this.http.get(this.url+"/Order/OrderDelivered?orderId="+orderId);
  }
}
