import { ProductTotalPrice } from './productTotalPrice.modal';

export interface Product extends ProductTotalPrice {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  categoryId: number;
  measurement: string;
  previousPrice: number;
  percentagePriceDiff: number;
  priceStatus: string;
}
