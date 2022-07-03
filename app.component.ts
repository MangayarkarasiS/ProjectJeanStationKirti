import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JeanStation';
  tokendata:any;
  data:any;
  userToken:boolean = true;

  constructor(){
    this.tokendata = localStorage.getItem('currentUser')
        this.data = JSON.parse(this.tokendata);
        if (this.data != null) {
            this.userToken = false;
        }  
  }
}
