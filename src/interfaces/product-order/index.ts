import { ProductInterface } from 'interfaces/product';
import { OrderInterface } from 'interfaces/order';
import { GetQueryInterface } from 'interfaces';

export interface ProductOrderInterface {
  id?: string;
  product_id: string;
  order_id: string;
  quantity: number;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  order?: OrderInterface;
  _count?: {};
}

export interface ProductOrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  order_id?: string;
}
