import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  public StoreCapacity = 100;
  public Products = 30;

  constructor() { }

  ngOnInit(): void {
  }
  addproduct():boolean{
    let productadded =  false;
    if(this.Products <= this.StoreCapacity){
      this.Products++;
      productadded = true;
    }
    return productadded;
  }

}
