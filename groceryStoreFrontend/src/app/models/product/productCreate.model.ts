import { ProductMeasurement } from './productMeasurement.model';

export interface ProductCreate extends ProductMeasurement {
  categoryId: number;
  name: string;
  price: number;
  stock: number;
}
