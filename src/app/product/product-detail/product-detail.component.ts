import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  constructor(
    private _activateRoute: ActivatedRoute,
    private _ps: ProductService,
    private _route: Router,
    private _alert: AlertController
  ) {}

  ngOnInit() {
    this._activateRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('_id')) {
        return;
      }
      const id = paramMap.get('_id');
      this._ps.getProduct(id).subscribe(data => (this.product = data));
    });
  }

  onDelete(id) {
    this._alert
      .create({
        header: 'Confirmation',
        message: 'Are you sure want to delete?',
        buttons: [
          {
            text: 'Cance',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: () => {
              this._ps.deleteProduct(id);
              this._route.navigate(['/product']);
            }
          }
        ]
      })
      .then(alertElm => {
        alertElm.present();
      });
  }
}
