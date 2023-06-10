import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass'],
})
export class ProductsListComponent implements OnInit, OnChanges {
  allProducts: Product[] = [];
  products: Product[] = [];
  @Input() categoryType: string = '';
  constructor(private productService: ProductsService) {}

  page = 0;
  size = 8;

  getData(obj: any) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;
    this.products = this.allProducts.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['categoryType']?.currentValue !== 'all') {
      this.categoryType = changes?.['categoryType']?.currentValue;
      this.getProductsByCategory();
    } else {
      this.getAllProducts();
    }
  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      this.allProducts = res;
      let index = 0,
        startingIndex = this.page * this.size,
        endingIndex = startingIndex + this.size;

      this.products = this.allProducts.filter(() => {
        index++;
        return index > startingIndex && index <= endingIndex ? true : false;
      });
    });
  }

  getProductsByCategory() {
    this.productService
      .getProductsByType(this.categoryType)
      .subscribe((res) => {
        this.allProducts = res;
        let index = 0,
        startingIndex = this.page * this.size,
        endingIndex = startingIndex + this.size;

      this.products = this.allProducts.filter(() => {
        index++;
        return index > startingIndex && index <= endingIndex ? true : false;
      });
      });
  }
}
