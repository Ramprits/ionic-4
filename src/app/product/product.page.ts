import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss']
})
export class ProductPage implements OnInit, OnDestroy {
  products: Product[] = [];
  private productSub: Subscription;

  constructor(private _ps: ProductService) {}

  ngOnInit() {
    this._ps.getProducts();
    this.productSub = this._ps
      .getProductUpdateListener()
      .subscribe((product: Product[]) => {
        this.products = product;
        console.log('products=>>>', this.products);
      });
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }
}
