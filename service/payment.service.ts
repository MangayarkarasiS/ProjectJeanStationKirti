import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

function _window() : any {
  // return the global native browser window object
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url:string="http://localhost:49658/api";
  constructor(private http:HttpClient) { }
  public getOrders(id:any){
    return this.http.get(this.url+"/Order?customerId="+id);
   }
   public addOrders(requestdata:any,customerId :any){
     return this.http.post(this.url+"/Order?customerId="+customerId,requestdata);
   }
   public updateuser(requestdata:any){
    return this.http.put(this.url,requestdata);
   }
   public deleteuser(requestdata:any){
    return this.http.delete(this.url+"/"+requestdata);
   }
}
