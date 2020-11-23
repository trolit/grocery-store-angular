import { BaseProductModel } from './base.product.model';
import { ProductTotalPrice } from './productTotalPrice.modal';

export interface Product extends BaseProductModel, ProductTotalPrice {
  category: string;
  categoryId: number;
  measurement: string;
  previousPrice: number;
  percentagePriceDiff: number;
  priceStatus: string;
}
