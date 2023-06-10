import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModalComponent } from 'src/app/shared/product-modal/product-modal.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass'],
  providers: [MessageService],
})
export class ShopComponent implements OnInit {
  categoryList: string[] = [];
  selectedCat: string = 'all';
  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}

  userName: string = '';
  categoryType: string = 'all';

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    this.userName = user.username;
    this.productsService.getAllCategories().subscribe((data) => {
      this.categoryList = data;
    });
  }

  onAddProduct(): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '600px',
      data: { title: '', price: '', description: '', image: '', category: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.productsService.addNewProduct(result).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Confirmed',
              detail: 'Product added successfully!',
            });
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error adding product',
            });
          }
        );
      }
    });
  }

  onSelect(e: any) {
    this.categoryType = e;
  }
}
