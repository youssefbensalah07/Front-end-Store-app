import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './product';
import { ProductService } from './product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{


  public products: Product[] | undefined ;
constructor(private productService:ProductService) { }

ngOnInit(): void {
  this.getProducts();
}

public getProducts():void{
  this.productService.getProducts().subscribe(
  (response:Product[])=>{
    this.products=response;
  },
  (error:HttpErrorResponse)=>{
    alert(error.message);
  }
  );
} 
//public getProducts():void{
 // this.productService.getProducts().subscribe(
  // {
   /// next:response=>console.log(response),
  //  error:error=>console.log(error)
  // }
  //);
 
///}
public onAddProduct(addForm: NgForm): void {
  const addProductFormButton = document.getElementById("add-product-form");
if (addProductFormButton) {
    addProductFormButton.click();
  this.productService.addProduct(addForm.value).subscribe({
    next : response=>{
      this.getProducts();
      addForm.reset();
    }
  }
    
    /* (response: Product) => {
      
      console.log(response);
      this.getProducts();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    } */
  );
}
}

public onUpdateProduct(product: Product): void {
  this.productService.updateProduct(product).subscribe(
    (response: Product) => {
      console.log(response);
      this.getProducts();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onDeleteProduct(productId: number): void {
  this.productService.deleteProduct(productId).subscribe(
    (response: void) => {
      console.log(response);
      this.getProducts();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onOpenModal(_product: Product| null, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addProductModal');
  }
  if (mode === 'edit') {
    
    button.setAttribute('data-target', '#updateProductModal');
  }
  if (mode === 'delete') {
    
    button.setAttribute('data-target', '#deleteProductModal');
  }
  if (container) {
      container.appendChild(button);
  button.click();

}
}
}


 

function next(value: Product): void {
  throw new Error('Function not implemented.');
}

