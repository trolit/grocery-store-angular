import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OfflineSnackbarComponent } from './components/custom-snackbars/offline-snackbar/offline-snackbar.component';
import { ChangeProductPriceComponent } from './components/dialogs/change-product-price/change-product-price.component';
import { CreateProductComponent } from './components/dialogs/create-product/create-product.component';
import { DeleteProductComponent } from './components/dialogs/delete-product/delete-product.component';
import { ShoppingCartComponent } from './components/dialogs/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    SidebarComponent,
    OfflineSnackbarComponent,
    ChangeProductPriceComponent,
    CreateProductComponent,
    DeleteProductComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatChipsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [HomeComponent],
})
export class AppModule {}
