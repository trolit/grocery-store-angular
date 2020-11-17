import { BaseModel } from '../base.model';
import { ProductTotalPrice } from './productTotalPrice.modal';

export interface ProductCartItem extends BaseModel, ProductTotalPrice {
  price: number;
  stock: number;
  amount: number;
  measurement: string;
}
