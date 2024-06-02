import { Component,OnInit } from '@angular/core';
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
  gh=true
 /*  addForm = {
    id: 0,
    name: '',
    brand: '',
    description: '',
    price: '',
    category: '',
    imageUrl: ''
  }; */
 

  editProduct: Product | any;
  products: Product[] | any ;
  deleteProduct:Product| any
  regArray:any={}
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
  console.table(this.products)
} 


public onAddProduct(addForm: NgForm): void {
  if (addForm.valid) {
    this.productService.addProduct(addForm.value).subscribe({
      next: response => {
        this.getProducts();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}
public onUpdateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe({
      next: (response: Product) => {
        console.log(response);
        this.getProducts();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
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

public onOpenModal(product: Product| null, mode: string): void {
  console.log("mode", mode)
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addProductModal');
  }
  if (mode === 'edit') {
    this.editProduct =product;
    console.log("product", product)
    button.setAttribute('data-target', '#updateProductModal');
  }
  if (mode === 'delete') {
    this.deleteProduct=product
    button.setAttribute('data-target', '#deleteProductModal');
  }
  if (container) {
      container.appendChild(button);
  button.click();

}
}
}


 



