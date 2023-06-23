import { ProductOrderInterface } from 'interfaces/product-order';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  customer_name: string;
  customer_email: string;
  status: string;
  sales_representative_id: string;
  created_at?: any;
  updated_at?: any;
  product_order?: ProductOrderInterface[];
  user?: UserInterface;
  _count?: {
    product_order?: number;
  };
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_name?: string;
  customer_email?: string;
  status?: string;
  sales_representative_id?: string;
}
