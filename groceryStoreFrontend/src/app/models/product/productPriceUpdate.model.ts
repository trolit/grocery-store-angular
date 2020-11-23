export interface ProductPriceUpdate {
  id: number;
  price: number;
  previousPrice: number;
  percentagePriceDiff: number;
  priceStatus: string;
}
