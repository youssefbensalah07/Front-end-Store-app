import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './product';
import { environment } from '../environments/environment.development';

@Injectable({providedIn: 'root'})

export class ProductService {

private apiServerUrl=environment.apiBaseUrl;

constructor(private http:HttpClient) { }

  public getProducts():Observable<Product[]>{
    console.log("api url", `${this.apiServerUrl}/api/products`);
   return this.http.get<Product[]> (`${this.apiServerUrl}/api/products`)
   /* .pipe(
    map(products=>products.map(product=>({
      ...product,
      name:product.name.toUpperCase()
    })))
   ) */

   
}
public addProduct(product:Product):Observable<Product>{
  console.log("api add", `${this.apiServerUrl}/api/products`);
  return this.http.post<Product> (`${this.apiServerUrl}/api/products`,product);


}
public updateProduct(product:Product):Observable<Product>{
  console.log("api up", `${this.apiServerUrl}/api/products`);
 /*  let productId = product.id; */
  return this.http.put<Product> (`${this.apiServerUrl}/api/products/${product.id}`,product);


}
public deleteProduct(productId:number):Observable<void>{
  return this.http.delete<void> (`${this.apiServerUrl}/api/products/delete/${productId}`);


}

}
