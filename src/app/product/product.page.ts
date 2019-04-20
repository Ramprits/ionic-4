import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss']
})
export class ProductPage implements OnInit {
  products: Product[];

  constructor(private _ps: ProductService) {}

  ngOnInit() {
    this._ps.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}
