import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { pipe } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 // private url:string='https://fakestoreapi.com/products';
 private url:string="http://localhost:49658/api/ProductsService";
 constructor(private http:HttpClient) {
   console.log("api is working");
  }

public getproduct(){
 
 // return this.http.get('https://fakestoreapi.com/products');
 return this.http.get(this.url);

  //  pipe(map((res:any)=>{
  //    return res;
  //  }))
 }
  
}