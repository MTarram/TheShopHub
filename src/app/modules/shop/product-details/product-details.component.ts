import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass'],
})
export class ProductDetailsComponent implements OnInit {
  productID: number = 0;
  currentProduct!: Product;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productID = params['id'];
      this.productService
        .getProductByID(this.productID)
        .subscribe((product) => {
          this.currentProduct = product;
        });
    });
  }
}
