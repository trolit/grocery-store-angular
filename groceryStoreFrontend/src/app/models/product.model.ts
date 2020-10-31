export interface Product {
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
