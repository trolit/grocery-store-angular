import { BaseModel } from '../base.model';
import { ProductTotalPrice } from './productTotalPrice.modal';

export interface Product extends BaseModel, ProductTotalPrice {
  price: number;
  stock: number;
  category: string;
  categoryId: number;
  measurement: string;
  previousPrice: number;
  percentagePriceDiff: number;
  priceStatus: string;
}
