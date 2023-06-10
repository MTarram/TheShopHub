import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop/shop.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ProductsListComponent, ProductDetailsComponent, ShopComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    MatTabsModule,
    FormsModule,
    MatPaginatorModule,
    MatIconModule,
    RatingModule,
    PaginatorModule,
    MatDialogModule,
    ToastModule,
    TranslateModule,
  ],
})
export class ShopModule {}
