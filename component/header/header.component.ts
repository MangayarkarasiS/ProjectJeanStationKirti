import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Login/Services/app.LoginService';
import { CartService } from 'src/app/service/cart.service';
import {ContactService} from 'src/app/service/contact.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  public searchTerm !: string;
  tokendata:any;
  data:any;
  userLogin:boolean = false;
  isLoggedInUser = false;
  currentUser : any;
  currentUserName:any;

  constructor(private cartService : CartService,private loginservice: LoginService) { 
    this.tokendata = localStorage.getItem('currentUser')
        this.data = JSON.parse(this.tokendata);
        if (this.tokendata != null) {
            this.userLogin = true;
        }  

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
    this.cartService.getProducts()
    .subscribe((res:any)=>{
      this.totalItem = res.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
}
