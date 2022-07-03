import { Component, OnInit } from '@angular/core';
import { ProductadService} from 'src/app/service/productad.service'
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  // public product=[] as any;
  product:any;
  errorMessage:any;
  constructor(private tostr: ToastrService,private productservice:ProductadService) { }

  ngOnInit(): void {
    this.productservice.getUser().subscribe(data =>
      {
        this.product=data;
      },
      error => this.errorMessage = <any>error
      
      );
    console.log(this.product)
    // this.getAllBooks()
  }

  // getAllBooks()
  //   {
  //     this.productservice.getUser()
  //     .subscribe(res=>{
  //       this.product=res;
  //       console.log(res);
  //     })
  //   }

deleteProduct(row:any){
  this.productservice.deleteuser(row.Id).subscribe(res=>{

    this.productservice.getUser().subscribe(data =>
      {
        this.product=data;
      },
      error => this.errorMessage = <any>error
      
      );

    this.tostr.error(row.Title + "  has been deleted.");
    
    
  })
}
onEdit(row:any){

}

editProduct(id:number){
  console.log(JSON.stringify(this.product));
  for(let i=0;i<=this.product.length;i++){
if(this.product[i].id == id){
  alert(this.product[i].title);
break;
}
  }
}


}
