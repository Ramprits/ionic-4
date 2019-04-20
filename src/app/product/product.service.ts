import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();
  constructor(private _httpClient: HttpClient) {}

  getProducts() {
    return this._httpClient
      .get<Product[]>(`http://localhost:1337/products`)
      .subscribe(product => {
        this.products = product;
        this.productsUpdated.next([...this.products]);
      });
  }

  getProduct(id: string): Observable<Product> {
    return this._httpClient.get<Product>(
      `http://localhost:1337/products/${id}`
    );
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }
  deleteProduct(id: string) {
    return this._httpClient
      .delete<Product>(`http://localhost:1337/products/${id}`)
      .subscribe(() => {
        const updatedProducted = this.products.filter(
          product => product._id !== id
        );
        this.products = updatedProducted;
        this.productsUpdated.next([...this.products]);
      });
  }
}
