import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  allProducts: Product[] = [];
  isLoading = false;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getAllProducts(6).subscribe((res) => {
      this.allProducts = res;
      this.isLoading = false;
    });
  }
}
