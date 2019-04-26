import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from './product.model';
import { environment } from 'src/environments/environment';

const productsUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();
  constructor(private _httpClient: HttpClient) {}

  getProducts() {
    if (this.products) {
      return of(this.products);
    }
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
  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;
    return this._httpClient
      .post<Product>(productsUrl, product, { headers: headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
