import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ProductadService {
  private url:string="http://localhost:49658/api/ProductsService";
  constructor(private http:HttpClient) { }
  public getUser(){
    return this.http.get(this.url);
   }
   public addProduct(requestdata:any){
    //return this.http.post('http://localhost:49658/api/ProductsService',data);
     return this.http.post(this.url,requestdata);
   }
   public updateuser(requestdata:any){
    return this.http.put(this.url,requestdata);
   }
   public deleteuser(requestdata:any){
    return this.http.delete(this.url+"/"+requestdata);
   }

}
