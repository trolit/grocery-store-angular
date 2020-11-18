/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product/product.model';
import { ProductCartItem } from 'src/app/models/product/productCartItem';
import { ProductOrder } from 'src/app/models/product/productOrder.model';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared.service';
import { BaseDialog } from '../base-dialog';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent extends BaseDialog<ShoppingCartComponent> implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'price', 'totalPrice'];
  productsInCart: ProductCartItem[] = [];
  dataSource: MatTableDataSource<ProductCartItem>;
  orderPrice: string;
  orderBody: Array<string>;

  constructor(
    protected dialogRef: MatDialogRef<ShoppingCartComponent>,
    protected sharedService: SharedService,
    protected productService: ProductService,
  ) {
    super(dialogRef, sharedService);
  }

  ngOnInit(): void {
    this.tryToLoadProductsFromSessionStorage();
    this.dataSource = new MatTableDataSource(this.productsInCart);
    this.sharedService.onAddProductToCartRequest(this.addProductToCart.bind(this));
  }

  addProductToCart(product: Product, amount: number): void {
    const productCartItem = this.returnProductCartItem(product, amount);
    if (this.isProductAlreadyInTheCart(product.id) === false) {
      this.productsInCart.push(productCartItem);
      this.sharedService.increaseShoppingCartCurrentSizeValue();
    } else {
      this.updateProductCartItem(productCartItem, amount);
    }
    this.saveProductInSessionStorage(productCartItem);
    this.updateOrderPrice();
  }

  updateOrderPrice(): void {
    let orderPrice = 0;
    this.productsInCart.forEach((productInCart) => {
      orderPrice += Number(productInCart.totalPrice);
    });
    this.orderPrice = orderPrice.toFixed(2);
  }

  makeOrder(): void {
    const order = this.buildOrderBody();
    this.productService.placeOrder(order).subscribe(
      () => {
        console.log('order finished!');
        this.clearShoppingCartAndSessionStorage();
      },
      () => {
        console.log('error bruh :(');
      },
    );
  }

  buildOrderBody(): ProductOrder {
    const orderBodyArr: string[] = [];
    this.productsInCart.forEach((productInCart) => {
      orderBodyArr.push(productInCart.id.toString());
      orderBodyArr.push(productInCart.amount.toString());
    });
    const order: ProductOrder = {
      order: orderBodyArr,
    };
    return order;
  }

  clearShoppingCartAndSessionStorage() {
    this.productsInCart.forEach((productInCart) => {
      sessionStorage.removeItem(`p-#${productInCart.id}`);
    });
    this.productsInCart = [];
    sessionStorage.setItem('shoppingCartCounterVal', '0');
    this.dataSource.data = [];
    this.sharedService.resetShoppingCartCurrentSizeValue();
  }

  returnProductCartItem(product: Product, amount: number): ProductCartItem {
    const productCartItem: ProductCartItem = {
      id: product.id,
      name: product.name,
      amount: Number(amount.toFixed(2)),
      measurement: product.measurement,
      totalPrice: product.totalPrice,
      price: product.price,
      stock: product.stock,
    };
    return productCartItem;
  }

  isProductAlreadyInTheCart(productId: number): boolean {
    if (this.productsInCart !== null) {
      for (let i = 0; i < this.productsInCart.length; i += 1) {
        if (this.productsInCart[i].id === productId) {
          return true;
        }
      }
    }
    return false;
  }

  updateProductCartItem(product: ProductCartItem, amount: number): void {
    product.amount = Number(amount.toFixed(2));
    const newTotalPrice = product.price * product.amount;
    product.totalPrice = newTotalPrice.toFixed(2);
  }

  saveProductInSessionStorage(product: ProductCartItem): void {
    sessionStorage.setItem(`p-#${product.id}`, JSON.stringify(product));
  }

  tryToLoadProductsFromSessionStorage(): void {
    let counter = 0;
    this.products.forEach((product) => {
      const sessionStorageItem = sessionStorage.getItem(`p-#${product.id}`);
      if (sessionStorageItem !== null) {
        this.productsInCart.push(JSON.parse(sessionStorageItem) as ProductCartItem);
        counter += 1;
      }
    });
    sessionStorage.setItem('shoppingCartCounterVal', counter.toString());
    if (counter > 0) {
      this.updateOrderPrice();
    }
  }
}
