import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {Pay} from '../payment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseServerUrl='http://localhost:49658/api/';
  constructor(private http:HttpClient) { }
payment(payment:Array<string>, customerId:any){
  return this.http.post(this.baseServerUrl+'Payment/CreatePayment?customerId='+customerId,{
    Option:payment[0],
    ShippingAddress:payment[1],
  },
  {
    responseType:"text"
  }
  )}
shipping(){
  return this.http.get(this.baseServerUrl+'Shipping');
}
 
}
