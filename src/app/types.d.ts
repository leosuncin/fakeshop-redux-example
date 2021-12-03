declare const entity: unique symbol;

export type Opaque<IdType, EntityName> = IdType & {
  readonly [entity]: EntityName;
};

export type ProductId = Opaque<number, 'Product'>;

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: ProductId;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: Rating;
}
