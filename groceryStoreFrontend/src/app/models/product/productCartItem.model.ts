import { BaseProductModel } from './base.product.model';
import { ProductMeasurement } from './productMeasurement.model';
import { ProductTotalPrice } from './productTotalPrice.modal';

export interface ProductCartItem extends BaseProductModel, ProductTotalPrice, ProductMeasurement {
  amount: number;
}
