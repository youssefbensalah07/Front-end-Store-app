import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { environment } from '../environments/environment.development';

@Injectable({providedIn: 'root'})

export class ProductService {

private apiServerUrl=environment.apiBaseUrl;

constructor(private http:HttpClient) { }

  public getProducts():Observable<Product[]>{
    console.log("api url", `${this.apiServerUrl}/api/products/all`);
   return this.http.get<Product[]> (`${this.apiServerUrl}/api/products/all`);

   
}
public addProduct(product:Product):Observable<Product>{
  return this.http.post<Product> (`${this.apiServerUrl}/api/products/add`,product);


}
public updateProduct(product:Product):Observable<Product>{
  return this.http.put<Product> (`${this.apiServerUrl}/api/products/update`,product);


}
public deleteProduct(productId:number):Observable<void>{
  return this.http.delete<void> (`${this.apiServerUrl}/api/products/delete/${productId}`);


}

}
