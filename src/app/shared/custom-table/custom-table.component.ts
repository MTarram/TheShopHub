import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.sass'],
  providers: [ConfirmationService, MessageService],
})
export class CustomTableComponent implements OnInit {
  isLoading = true;
  allProducts: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  selectedRow = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Product>(this.allProducts);

  constructor(
    private productService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tableInit();
  }

  onViewData(id: number) {
    this.router.navigate(['/shop/details/' + id]);
  }

  onEditData(el: any) {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '600px',
      data: {
        title: el.title,
        price: el.price,
        description: el.description,
        image: el.image,
        category: el.category,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.productService.updateProduct(el.id, result).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Confirmed',
              detail: 'Product updated successfully!',
            });
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error updating product',
            });
          }
        );
      }
    });
  }

  onDeleteData(product: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete ' + product.title + '?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: 'Product deleted successfully!',
          });
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  tableInit(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.isLoading = false;
        this.allProducts = data;
        this.paginator.pageIndex = 0;
        this.dataSource = new MatTableDataSource<Product>(this.allProducts);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.isLoading = false;
        alert('Error Loading Data!');
      }
    );
  }
}
