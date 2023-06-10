import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private static storeAPI = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      ProductsService.storeAPI + '/products?limit=' + limit
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(
      ProductsService.storeAPI + '/products/categories'
    );
  }

  // CRUD START
  addNewProduct(productData: any): Observable<any> {
    return this.http.post<any>(
      ProductsService.storeAPI + '/products',
      productData
    );
  }

  getProductByID(id: number): Observable<Product> {
    return this.http.get<Product>(ProductsService.storeAPI + '/products/' + id);
  }

  getProductsByType(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(ProductsService.storeAPI + '/products/category/' + type);
  }

  updateProduct(id: number, productData: any): Observable<Product> {
    return this.http.put<Product>(
      ProductsService.storeAPI + '/products/' + id,
      productData
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(
      ProductsService.storeAPI + '/products/' + id
    );
  }
  // CRUD END
}
