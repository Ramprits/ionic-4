import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`http://localhost:1337/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this._httpClient.get<Product>(
      `http://localhost:1337/products/${id}`
    );
  }

  deleteProduct(id: string): Observable<Product> {
    return this._httpClient.delete<Product>(
      `http://localhost:1337/products/${id}`
    );
  }
}
