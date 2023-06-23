import { UserInterface } from 'interfaces/user';
import { ProductInterface } from 'interfaces/product';
import { GetQueryInterface } from 'interfaces';

export interface UserProductInterface {
  id?: string;
  user_id: string;
  product_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  product?: ProductInterface;
  _count?: {};
}

export interface UserProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  product_id?: string;
}
