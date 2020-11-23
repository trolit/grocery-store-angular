import { BaseModel } from '../base.model';

export interface BaseProductModel extends BaseModel {
  price: number;
  stock: number;
}
