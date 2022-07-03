import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http'

// import { Observable,observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  public sendData(data:any){
    return this.http.post('http://localhost:49658/api/ContactsService',data,{responseType:"text"});
  }
}
